"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ComponentType } from "react";
import {
  ActivityIcon,
  AlertTriangleIcon,
  ArrowRightIcon,
  CalendarIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardCheckIcon,
  ClockIcon,
  DownloadIcon,
  FolderIcon,
  LayersIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  XCircleIcon,
  type IconProps,
} from "@/components/dashboard/icons";
import {
  cohortCounts,
  cohortTotal,
  formatPercent,
  mentorSubmissions,
  reviewPipeline,
  reviewTabs,
  statusCount,
  type Submission,
  type SubmissionStatus,
} from "@/components/mentor/data";
import {
  mentorCohort,
  mentorDateLabel,
} from "@/components/mentor/profile";
import {
  projectIcons,
  StatusBadge,
  SubmissionDialog,
  toneStyles,
} from "@/components/mentor/submission-ui";
import { buildPageItems, csvCell } from "@/components/mentor/utils";

const PAGE_SIZE = 5;

export function MentorDashboard() {
  const [activeTab, setActiveTab] = useState<"All" | SubmissionStatus>("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);
  const [columns, setColumns] = useState({
    student: true,
    submittedDate: true,
    status: true,
  });

  const filteredSubmissions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return mentorSubmissions.filter((submission) => {
      const matchesStatus =
        activeTab === "All" || submission.status === activeTab;
      const matchesSearch =
        query.length === 0 ||
        [
          submission.project,
          submission.student.name,
          submission.student.email,
          submission.stack,
        ].some((value) => value.toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    });
  }, [activeTab, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSubmissions.length / PAGE_SIZE),
  );
  const currentPage = Math.min(page, totalPages);
  const visibleSubmissions = filteredSubmissions.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const startResult =
    filteredSubmissions.length === 0
      ? 0
      : (currentPage - 1) * PAGE_SIZE + 1;
  const endResult = Math.min(
    currentPage * PAGE_SIZE,
    filteredSubmissions.length,
  );
  const pageItems = buildPageItems(currentPage, totalPages);

  const selectTab = (tab: "All" | SubmissionStatus) => {
    setActiveTab(tab);
    setPage(1);
  };

  const resetFilters = () => {
    setActiveTab("All");
    setSearch("");
    setPage(1);
  };

  const exportCsv = () => {
    const rows = [
      [
        "Project",
        "Student",
        "Email",
        "Stack",
        "Submitted",
        "Status",
        "Repository",
      ],
      ...filteredSubmissions.map((submission) => [
        submission.project,
        submission.student.name,
        submission.student.email,
        submission.stack,
        submission.submittedDate,
        submission.status,
        submission.repo,
      ]),
    ];
    const csv = rows
      .map((row) => row.map((value) => csvCell(value)).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "submitflow-recent-submissions.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const stats: {
    label: string;
    value: number;
    unit: string;
    meta: string;
    metaValue?: string;
    icon: ComponentType<IconProps>;
    tone: string;
    iconTone: string;
    metaIcon: ComponentType<IconProps>;
    metaTone: string;
  }[] = [
    {
      label: "Total Submissions",
      value: cohortTotal,
      unit: "items",
      meta: "All cohort milestones",
      icon: FolderIcon,
      tone: "text-gray-700",
      iconTone: "bg-indigo-100 text-indigo-700",
      metaIcon: LayersIcon,
      metaTone: "text-indigo-600",
    },
    {
      label: "Pending Review",
      value: cohortCounts.Pending,
      unit: "Awaiting action",
      meta: "Avg queue:",
      metaValue: "2.8 hrs",
      icon: ClockIcon,
      tone: "text-red-700",
      iconTone: "bg-blue-100 text-slate-900",
      metaIcon: ClockIcon,
      metaTone: "text-gray-700",
    },
    {
      label: "Approved",
      value: cohortCounts.Approved,
      unit: formatPercent(cohortCounts.Approved),
      meta: `${formatPercent(cohortCounts.Approved)} pass rate`,
      icon: CheckCircleIcon,
      tone: "text-indigo-700",
      iconTone: "bg-blue-100 text-indigo-700",
      metaIcon: ClipboardCheckIcon,
      metaTone: "text-indigo-600",
    },
    {
      label: "Rejected",
      value: cohortCounts.Rejected,
      unit: formatPercent(cohortCounts.Rejected),
      meta: "Needs revision flag",
      icon: XCircleIcon,
      tone: "text-red-700",
      iconTone: "bg-rose-200 text-red-800",
      metaIcon: AlertTriangleIcon,
      metaTone: "text-red-700",
    },
  ];

  return (
    <>
      <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-6 lg:gap-8">
        <section className="flex flex-col gap-5 pb-0.5 xl:flex-row xl:items-end xl:justify-between">
          <div className="flex max-w-3xl flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold uppercase leading-4 tracking-wide text-indigo-700">
                {mentorCohort}
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full bg-slate-300"
                aria-hidden="true"
              />
              <span className="text-xs font-medium leading-4 tracking-tight text-gray-700">
                SLA Monitor Active
              </span>
            </div>

            <h1 className="pt-1 text-3xl font-semibold leading-10 text-slate-900">
              Review Dashboard
            </h1>
            <p className="max-w-2xl text-base font-normal leading-6 text-gray-700">
              Manage submissions and track project review progress across active
              academic milestones.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 xl:justify-end">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-medium leading-4 text-slate-900 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
              <CalendarIcon className="h-3.5 w-3.5 text-gray-700" />
              {mentorDateLabel}
            </span>
            <Link
              href="#recent-submissions"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium leading-5 text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
            >
              Review Projects
              <ArrowRightIcon className="h-3 w-3" />
            </Link>
          </div>
        </section>

        <section
          aria-label="Submission summary"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            const MetaIcon = stat.metaIcon;

            return (
              <article
                key={stat.label}
                className="flex flex-col justify-between rounded-xl bg-white p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium leading-4 text-gray-700">
                      {stat.label}
                    </p>
                    <div className="flex flex-wrap items-baseline gap-1 pt-1">
                      <span className="text-3xl font-semibold leading-10 text-slate-900">
                        {stat.value}
                      </span>
                      <span
                        className={`text-xs font-medium leading-4 tracking-tight ${stat.tone}`}
                      >
                        {stat.unit}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.iconTone}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <div className="flex items-center gap-1 pt-5 text-xs font-medium leading-4 tracking-tight text-gray-700">
                  <MetaIcon className={`h-3.5 w-3.5 ${stat.metaTone}`} />
                  <span>{stat.meta}</span>
                  {stat.metaValue && (
                    <span className="font-semibold text-slate-900">
                      {stat.metaValue}
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </section>

        <section
          aria-labelledby="review-pipeline-heading"
          className="flex flex-col gap-3 rounded-xl bg-white p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] sm:p-6 lg:p-8"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2
                id="review-pipeline-heading"
                className="text-base font-semibold leading-6 text-slate-900"
              >
                Review Pipeline Overview
              </h2>
              <p className="text-xs font-normal leading-4 text-gray-700">
                Current cohort submission distribution across review stages
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {reviewPipeline.map((stage) => (
                <span
                  key={stage.label}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium leading-4 ${stage.pill}`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${stage.dot}`}
                    aria-hidden="true"
                  />
                  <span>{stage.label}:</span>
                  <span className="font-semibold">{stage.value}</span>
                  <span className="font-semibold text-gray-700">
                    ({formatPercent(stage.value)})
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1 pt-1">
            <div className="flex h-3.5 items-stretch gap-0.5 overflow-hidden rounded-full bg-sky-100 p-0.5">
              {reviewPipeline.map((stage) => (
                <div
                  key={stage.label}
                  className={`${stage.color} h-full`}
                  style={{ width: `${(stage.value / cohortTotal) * 100}%` }}
                  title={`${stage.label}: ${stage.value}`}
                />
              ))}
            </div>

            <div className="flex flex-col justify-between gap-2 pt-1 text-xs leading-4 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-1.5 font-semibold tracking-tight">
                <ActivityIcon className="h-3.5 w-3.5 text-indigo-600" />
                <span className="text-slate-900">{cohortTotal}</span>
                <span className="font-medium text-gray-700">
                  total items processed
                </span>
                <span className="text-slate-300" aria-hidden="true">
                  •
                </span>
                <span className="font-medium text-gray-700">
                  Target turnaround &lt; 24h
                </span>
              </div>
              <div className="flex items-center gap-1 text-indigo-700">
                <CheckCircleIcon className="h-3.5 w-3.5" />
                <span className="font-medium">98.2% on-time SLA</span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="recent-submissions"
          aria-labelledby="recent-submissions-heading"
          className="scroll-mt-24 overflow-hidden rounded-xl bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
        >
          <div className="flex flex-col gap-5 p-5 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2
                  id="recent-submissions-heading"
                  className="text-base font-semibold leading-6 text-slate-900"
                >
                  Recent Submissions
                </h2>
                <p className="text-xs font-normal leading-4 text-gray-700">
                  Latest student submissions awaiting or recently completed
                  reviews
                </p>
              </div>

              <div
                role="tablist"
                aria-label="Filter submissions by status"
                className="grid max-w-full grid-cols-2 gap-1 rounded-lg bg-blue-50 p-1 sm:flex sm:items-center"
              >
                {reviewTabs.map((tab) => {
                  const isActive = activeTab === tab.value;

                  return (
                    <button
                      key={tab.value}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => selectTab(tab.value)}
                      className={`shrink-0 rounded-md px-3 py-1.5 text-xs leading-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
                        isActive
                          ? "bg-white font-semibold text-slate-900 shadow-sm"
                          : "font-medium text-gray-700 hover:bg-white/60 hover:text-slate-900"
                      }`}
                    >
                      {tab.label} ({statusCount(tab.value)})
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <label className="relative block w-full max-w-md">
                <span className="sr-only">Search submissions</span>
                <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search student, project, or stack..."
                  className="h-10 w-full rounded-lg border border-transparent bg-blue-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-gray-500 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/20"
                />
              </label>

              <div className="flex flex-wrap items-center gap-2">
                <details className="group relative">
                  <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-lg bg-blue-50 px-3.5 py-2 text-xs font-medium leading-4 text-slate-900 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 [&::-webkit-details-marker]:hidden">
                    <SlidersHorizontalIcon className="h-3.5 w-3.5" />
                    Filter Columns
                    <ChevronDownIcon className="h-3 w-3 text-gray-500 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="absolute right-0 z-20 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                    <p className="pb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Visible columns
                    </p>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <input
                          type="checkbox"
                          checked={columns.student}
                          onChange={(event) =>
                            setColumns((current) => ({
                              ...current,
                              student: event.target.checked,
                            }))
                          }
                          className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        Student
                      </label>
                      <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <input
                          type="checkbox"
                          checked={columns.submittedDate}
                          onChange={(event) =>
                            setColumns((current) => ({
                              ...current,
                              submittedDate: event.target.checked,
                            }))
                          }
                          className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        Submitted date
                      </label>
                      <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <input
                          type="checkbox"
                          checked={columns.status}
                          onChange={(event) =>
                            setColumns((current) => ({
                              ...current,
                              status: event.target.checked,
                            }))
                          }
                          className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        Status
                      </label>
                    </div>
                  </div>
                </details>

                <button
                  type="button"
                  onClick={exportCsv}
                  className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3.5 py-2 text-xs font-medium leading-4 text-slate-900 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                >
                  <DownloadIcon className="h-3.5 w-3.5" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[840px] border-collapse">
              <thead>
                <tr className="border-y border-slate-100 bg-blue-50/60 text-left">
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-semibold uppercase leading-4 tracking-wide text-gray-700 lg:px-8"
                  >
                    Project Name
                  </th>
                  {columns.student && (
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase leading-4 tracking-wide text-gray-700"
                    >
                      Student
                    </th>
                  )}
                  {columns.submittedDate && (
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase leading-4 tracking-wide text-gray-700"
                    >
                      Submitted Date
                    </th>
                  )}
                  {columns.status && (
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase leading-4 tracking-wide text-gray-700"
                    >
                      Status
                    </th>
                  )}
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-semibold uppercase leading-4 tracking-wide text-gray-700 lg:px-8"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visibleSubmissions.map((submission) => {
                  const ProjectIcon = projectIcons[submission.icon];
                  const tone = toneStyles[submission.tone];
                  const avatarTone = toneStyles[submission.avatarTone];

                  return (
                    <tr
                      key={submission.id}
                      className="transition-colors hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-4 lg:px-8">
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tone.project}`}
                          >
                            <ProjectIcon className="h-4 w-4" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold leading-5 text-slate-900">
                              {submission.project}
                            </p>
                            <a
                              href={`https://${submission.repo}`}
                              target="_blank"
                              rel="noreferrer"
                              className="block max-w-[240px] truncate rounded-sm text-xs leading-4 text-gray-700 underline-offset-2 hover:text-indigo-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                            >
                              {submission.repo}
                            </a>
                          </div>
                        </div>
                      </td>
                      {columns.student && (
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold leading-4 ${avatarTone.avatar}`}
                            >
                              {submission.student.initials}
                            </span>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium leading-5 text-slate-900">
                                {submission.student.name}
                              </p>
                              <p className="max-w-[180px] truncate text-xs leading-4 text-gray-700">
                                {submission.student.email}
                              </p>
                            </div>
                          </div>
                        </td>
                      )}
                      {columns.submittedDate && (
                        <td className="px-4 py-4">
                          <p className="whitespace-nowrap text-sm leading-5 text-slate-900">
                            {submission.submittedDate}
                          </p>
                          <p className="text-xs leading-4 text-gray-700">
                            {submission.relativeDate}
                          </p>
                        </td>
                      )}
                      {columns.status && (
                        <td className="px-4 py-4">
                          <StatusBadge status={submission.status} />
                        </td>
                      )}
                      <td className="px-6 py-4 text-right lg:px-8">
                        <button
                          type="button"
                          onClick={() => setSelectedSubmission(submission)}
                          className={`inline-flex whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium leading-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
                            submission.status === "Pending"
                              ? "bg-indigo-600 text-white hover:bg-indigo-700"
                              : "text-indigo-700 hover:bg-indigo-50"
                          }`}
                        >
                          {submission.status === "Pending"
                            ? "Review Project"
                            : "View Details"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-slate-100 md:hidden">
            {visibleSubmissions.map((submission) => {
              const ProjectIcon = projectIcons[submission.icon];
              const tone = toneStyles[submission.tone];
              const avatarTone = toneStyles[submission.avatarTone];

              return (
                <article key={submission.id} className="flex flex-col gap-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tone.project}`}
                      >
                        <ProjectIcon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold leading-5 text-slate-900">
                          {submission.project}
                        </p>
                        <a
                          href={`https://${submission.repo}`}
                          target="_blank"
                          rel="noreferrer"
                          className="block truncate rounded-sm text-xs leading-4 text-gray-700 hover:text-indigo-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                        >
                          {submission.repo}
                        </a>
                      </div>
                    </div>
                    {columns.status && <StatusBadge status={submission.status} />}
                  </div>

                  <div className="grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3">
                    {columns.student && (
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                          Student
                        </p>
                        <div className="flex items-center gap-2 pt-1.5">
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold ${avatarTone.avatar}`}
                          >
                            {submission.student.initials}
                          </span>
                          <p className="truncate text-xs font-medium text-slate-900">
                            {submission.student.name}
                          </p>
                        </div>
                      </div>
                    )}
                    {columns.submittedDate && (
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                          Submitted
                        </p>
                        <p className="pt-1.5 text-xs font-medium text-slate-900">
                          {submission.submittedDate}
                        </p>
                        <p className="text-[11px] text-gray-700">
                          {submission.relativeDate}
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedSubmission(submission)}
                    className={`inline-flex w-full items-center justify-center rounded-lg px-3 py-2.5 text-xs font-medium leading-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
                      submission.status === "Pending"
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                    }`}
                  >
                    {submission.status === "Pending"
                      ? "Review Project"
                      : "View Details"}
                  </button>
                </article>
              );
            })}
          </div>

          {visibleSubmissions.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-2 px-5 py-12 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-indigo-700">
                <SearchIcon className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold text-slate-900">
                No submissions found
              </p>
              <p className="max-w-sm text-xs leading-5 text-gray-700">
                Try a different search term or status filter to find the project
                you are looking for.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-1 rounded-lg px-3 py-2 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              >
                Clear filters
              </button>
            </div>
          )}

          <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2 text-xs leading-4 text-gray-700">
              <span>
                Showing{" "}
                <span className="font-semibold text-slate-900">
                  {startResult}–{endResult}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-900">
                  {filteredSubmissions.length}
                </span>{" "}
                submissions
              </span>
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-sm font-semibold text-indigo-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              >
                View All Submissions
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>

              {pageItems.map((item, index) =>
                item === "ellipsis" ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="flex h-8 w-6 items-center justify-center text-xs text-gray-500"
                    aria-hidden="true"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPage(item)}
                    aria-current={item === currentPage ? "page" : undefined}
                    aria-label={`Page ${item}`}
                    className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
                      item === currentPage
                        ? "bg-indigo-600 text-white"
                        : "text-gray-700 hover:bg-slate-100"
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}

              <button
                type="button"
                onClick={() =>
                  setPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {selectedSubmission && (
        <SubmissionDialog
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </>
  );
}
