"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CodeIcon,
  DownloadIcon,
  ExternalLinkIcon,
  MoreHorizontalIcon,
  RefreshIcon,
  SearchIcon,
  SlidersHorizontalIcon,
} from "@/components/dashboard/icons";
import {
  cohortCounts,
  cohortTotal,
  mentorSubmissions,
  type SubmissionStatus,
  type SubmissionTone,
} from "@/components/mentor/data";
import { mentorCohort } from "@/components/mentor/profile";
import { StatusBadge, toneStyles } from "@/components/mentor/submission-ui";
import { buildPageItems, csvCell } from "@/components/mentor/utils";

const statusFilterLabels: Record<"All" | SubmissionStatus, string> = {
  All: "All Reviews",
  Pending: "Pending Review",
  Approved: "Approved",
  Rejected: "Rejected",
};

const projectTileStyles: Record<SubmissionTone, string> = {
  indigo: "bg-indigo-600 text-white",
  blue: "bg-blue-100 text-slate-900",
  rose: "bg-rose-100 text-red-800",
  emerald: "bg-emerald-100 text-emerald-800",
  amber: "bg-amber-100 text-amber-800",
  violet: "bg-violet-100 text-violet-800",
};

const velocityBars = [46, 72, 38, 84, 58, 92, 100, 66];

function reviewStatusLabel(status: SubmissionStatus) {
  return status === "Pending" ? "Pending Review" : status;
}

export function ProjectReviews() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | SubmissionStatus
  >("All");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [columns, setColumns] = useState({
    student: true,
    repository: true,
    submitted: true,
    status: true,
  });
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key !== "/" ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;

      if (isTyping) return;

      event.preventDefault();
      searchRef.current?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredSubmissions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return mentorSubmissions.filter((submission) => {
      const matchesStatus =
        statusFilter === "All" || submission.status === statusFilter;
      const matchesSearch =
        query.length === 0 ||
        [
          submission.project,
          submission.code,
          submission.version,
          submission.ticket,
          submission.branch,
          submission.commit,
          submission.summary,
          submission.repo,
          submission.liveUrl,
          submission.student.name,
          submission.student.email,
          submission.stack,
        ].some((value) => value.toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSubmissions.length / rowsPerPage),
  );
  const currentPage = Math.min(page, totalPages);
  const visibleSubmissions = filteredSubmissions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );
  const startResult =
    filteredSubmissions.length === 0
      ? 0
      : (currentPage - 1) * rowsPerPage + 1;
  const endResult = Math.min(
    currentPage * rowsPerPage,
    filteredSubmissions.length,
  );
  const pageItems = buildPageItems(currentPage, totalPages);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setRowsPerPage(10);
    setPage(1);
  };

  const exportCsv = () => {
    const rows = [
      [
        "Project",
        "Version",
        "Ticket",
        "Student",
        "Email",
        "Repository",
        "Preview",
        "Branch",
        "Commit",
        "Submitted",
        "Status",
      ],
      ...filteredSubmissions.map((submission) => [
        submission.project,
        submission.version,
        submission.ticket,
        submission.student.name,
        submission.student.email,
        submission.repo,
        submission.liveUrl,
        submission.branch,
        submission.commit,
        `${submission.submittedDate} ${submission.submittedTime}`,
        reviewStatusLabel(submission.status),
      ]),
    ];
    const csv = rows
      .map((row) => row.map((value) => csvCell(value)).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "submitflow-project-reviews.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const summary = [
    {
      label: "Total",
      value: cohortTotal,
      pill: "bg-blue-50",
      valueClass: "text-slate-900",
      dot: "",
    },
    {
      label: "Pending",
      value: cohortCounts.Pending,
      pill: "bg-sky-100",
      valueClass: "text-violet-700",
      dot: "bg-violet-500",
    },
    {
      label: "Approved",
      value: cohortCounts.Approved,
      pill: "bg-blue-50",
      valueClass: "text-indigo-700",
      dot: "bg-indigo-600",
    },
    {
      label: "Rejected",
      value: cohortCounts.Rejected,
      pill: "bg-sky-100",
      valueClass: "text-red-700",
      dot: "bg-red-700",
    },
  ];

  return (
    <>
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-5">
        <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold leading-8 text-slate-900">
                Project Reviews
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium leading-4 tracking-tight text-gray-700">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-indigo-600"
                  aria-hidden="true"
                />
                Sync v2.4 Active
              </span>
            </div>
            <p className="max-w-2xl text-sm font-normal leading-5 text-gray-700">
              Review, verify source integrity, test builds, and issue formal
              milestone decisions.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-1.5 rounded-xl bg-white p-1.5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] sm:max-w-sm">
            {summary.map((item) => (
              <div
                key={item.label}
                className={`flex items-center justify-between gap-2 rounded-lg px-3 py-1 ${item.pill}`}
              >
                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase leading-4 tracking-wide text-gray-700">
                  {item.dot && (
                    <span
                      className={`h-2 w-2 rounded-full ${item.dot}`}
                      aria-hidden="true"
                    />
                  )}
                  {item.label}
                </span>
                <span
                  className={`text-sm font-semibold leading-5 ${item.valueClass}`}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-label="Review queue filters"
          className="flex flex-col gap-3 rounded-xl bg-white p-3 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] lg:flex-row lg:items-center"
        >
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <label className="relative block w-full">
              <span className="sr-only">Search project review queue</span>
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                ref={searchRef}
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search projects, students, or commits (Press / to focus)"
                className="h-9 w-full rounded-lg border border-transparent bg-blue-50 pl-9 pr-12 text-sm text-slate-900 outline-none transition-colors placeholder:text-gray-500 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/20"
              />
              <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-blue-100 bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-700">
                /
              </kbd>
            </label>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex w-fit items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium leading-4 text-gray-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            >
              <RefreshIcon className="h-3 w-3" />
              Reset
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="relative block">
              <span className="sr-only">Filter by review status</span>
              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(
                    event.target.value as "All" | SubmissionStatus,
                  );
                  setPage(1);
                }}
                className="h-9 appearance-none rounded-lg border border-transparent bg-blue-50 pl-3 pr-8 text-xs font-medium text-slate-900 outline-none transition-colors hover:bg-blue-100 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
              >
                {(
                  ["All", "Pending", "Approved", "Rejected"] as const
                ).map((status) => (
                  <option key={status} value={status}>
                    {statusFilterLabels[status]} (
                    {status === "All"
                      ? cohortTotal
                      : cohortCounts[status]}
                    )
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-500" />
            </label>

            <label className="relative block">
              <span className="sr-only">Select cohort</span>
              <select
                defaultValue={mentorCohort}
                className="h-9 appearance-none rounded-lg border border-transparent bg-blue-50 pl-3 pr-8 text-xs font-medium text-slate-900 outline-none transition-colors hover:bg-blue-100 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
              >
                <option value={mentorCohort}>{mentorCohort}</option>
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-500" />
            </label>
          </div>

          <div className="flex items-center gap-2 border-t border-slate-100 pt-3 text-xs font-semibold leading-4 tracking-tight text-gray-700 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
            <span
              className="h-1.5 w-1.5 rounded-full bg-indigo-600"
              aria-hidden="true"
            />
            Auto-sync connected
            <span className="font-normal text-gray-400" aria-hidden="true">
              ·
            </span>
            <span className="font-normal">240ms</span>
          </div>
        </section>

        <div className="flex flex-col gap-3">
          <section
            aria-labelledby="active-queue-heading"
            className="overflow-hidden rounded-xl bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-blue-50/60 px-5 py-2.5">
              <div className="flex items-center gap-3">
                <h2
                  id="active-queue-heading"
                  className="text-xs font-semibold uppercase leading-4 tracking-wide text-gray-700"
                >
                  Active Queue
                </h2>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium leading-4 text-slate-900">
                  Batch #04
                </span>
              </div>

              <div className="flex items-center gap-1">
                <details className="group relative">
                  <summary
                    aria-label="Manage visible columns"
                    className="flex h-8 w-8 cursor-pointer list-none items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-white hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 [&::-webkit-details-marker]:hidden"
                  >
                    <SlidersHorizontalIcon className="h-3.5 w-3.5" />
                  </summary>
                  <div className="absolute right-0 z-30 mt-1 w-48 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                    <p className="pb-2 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                      Visible columns
                    </p>
                    {(
                      [
                        ["student", "Student"],
                        ["repository", "Repository & Live"],
                        ["submitted", "Submitted"],
                        ["status", "Status"],
                      ] as const
                    ).map(([key, label]) => (
                      <label
                        key={key}
                        className="flex items-center gap-2 py-1 text-xs font-medium text-slate-700"
                      >
                        <input
                          type="checkbox"
                          checked={columns[key]}
                          onChange={(event) =>
                            setColumns((current) => ({
                              ...current,
                              [key]: event.target.checked,
                            }))
                          }
                          className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </details>

                <button
                  type="button"
                  onClick={exportCsv}
                  aria-label="Export project reviews as CSV"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-white hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                >
                  <DownloadIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[1088px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-left">
                    <th
                      scope="col"
                      className="w-72 px-5 py-3 text-xs font-bold uppercase leading-4 tracking-wide text-gray-700"
                    >
                      Project
                    </th>
                    {columns.student && (
                      <th
                        scope="col"
                        className="w-44 px-3 py-3 text-xs font-bold uppercase leading-4 tracking-wide text-gray-700"
                      >
                        Student
                      </th>
                    )}
                    {columns.repository && (
                      <th
                        scope="col"
                        className="w-48 px-3 py-3 text-xs font-bold uppercase leading-4 tracking-wide text-gray-700"
                      >
                        Repository &amp; Live
                      </th>
                    )}
                    {columns.submitted && (
                      <th
                        scope="col"
                        className="w-28 px-3 py-3 text-xs font-bold uppercase leading-4 tracking-wide text-gray-700"
                      >
                        Submitted
                      </th>
                    )}
                    {columns.status && (
                      <th
                        scope="col"
                        className="w-28 px-3 py-3 text-xs font-bold uppercase leading-4 tracking-wide text-gray-700"
                      >
                        Status
                      </th>
                    )}
                    <th
                      scope="col"
                      className="w-48 py-3 pl-2 pr-8 text-right text-xs font-bold uppercase leading-4 tracking-wide text-gray-700"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visibleSubmissions.map((submission) => {
                    const avatarTone = toneStyles[submission.avatarTone];

                    return (
                      <tr
                        key={submission.id}
                        className="transition-colors hover:bg-slate-50/70"
                      >
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold leading-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] ${projectTileStyles[submission.tone]}`}
                            >
                              {submission.code}
                            </span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="truncate text-sm font-semibold leading-5 text-slate-900">
                                  {submission.project}
                                </p>
                                <span className="rounded-sm bg-blue-100 px-2 py-0.5 text-[10px] font-medium leading-5 text-gray-700">
                                  {submission.version}
                                </span>
                                <span className="text-xs font-normal leading-4 text-gray-500">
                                  {submission.ticket}
                                </span>
                              </div>
                              <p className="max-w-[320px] truncate text-xs font-normal leading-4 text-gray-700">
                                {submission.branch} {submission.commit} ·{" "}
                                {submission.summary}
                              </p>
                            </div>
                          </div>
                        </td>

                        {columns.student && (
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold leading-5 ${avatarTone.avatar}`}
                              >
                                {submission.student.initials}
                              </span>
                              <div className="min-w-0">
                                <p className="truncate text-xs font-medium leading-4 text-slate-900">
                                  {submission.student.name}
                                </p>
                                <p className="max-w-[150px] truncate text-xs font-normal leading-5 text-gray-700">
                                  {submission.student.email}
                                </p>
                              </div>
                            </div>
                          </td>
                        )}

                        {columns.repository && (
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-2">
                              <a
                                href={`https://${submission.repo}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-normal leading-4 text-slate-900 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                              >
                                <CodeIcon className="h-3 w-3" />
                                Repo
                              </a>
                              <a
                                href={`https://${submission.liveUrl}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-normal leading-4 text-slate-900 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                              >
                                <ExternalLinkIcon className="h-3 w-3" />
                                Preview
                              </a>
                            </div>
                          </td>
                        )}

                        {columns.submitted && (
                          <td className="px-3 py-3">
                            <p className="text-xs font-normal leading-4 text-gray-700">
                              {submission.submittedDate}
                            </p>
                            <p className="text-xs font-normal leading-4 text-gray-500">
                              {submission.relativeDate} ({submission.submittedTime})
                            </p>
                          </td>
                        )}

                        {columns.status && (
                          <td className="px-3 py-3">
                            <StatusBadge
                              status={submission.status}
                              label={reviewStatusLabel(submission.status)}
                              appearance="queue"
                            />
                          </td>
                        )}

                        <td className="px-5 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/mentor/reviews/${submission.id}`}
                              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium leading-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
                                submission.status === "Pending"
                                  ? "bg-indigo-700 text-white hover:bg-indigo-800"
                                  : "bg-blue-50 text-slate-900 hover:bg-blue-100"
                              }`}
                            >
                              {submission.status === "Pending"
                                ? "Review Project"
                                : "View Details"}
                            </Link>
                            <Link
                              href={`/mentor/reviews/${submission.id}`}
                              aria-label={`More actions for ${submission.project}`}
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                            >
                              <MoreHorizontalIcon className="h-4 w-4" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-slate-100 md:hidden">
              {visibleSubmissions.map((submission) => {
                const avatarTone = toneStyles[submission.avatarTone];

                return (
                  <article
                    key={submission.id}
                    className="flex flex-col gap-3 p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold leading-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] ${projectTileStyles[submission.tone]}`}
                        >
                          {submission.code}
                        </span>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <p className="truncate text-sm font-semibold leading-5 text-slate-900">
                              {submission.project}
                            </p>
                            <span className="rounded-sm bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium leading-4 text-gray-700">
                              {submission.version}
                            </span>
                            <span className="text-[10px] text-gray-500">
                              {submission.ticket}
                            </span>
                          </div>
                          <p className="truncate text-xs leading-4 text-gray-700">
                            {submission.branch} {submission.commit}
                          </p>
                        </div>
                      </div>
                      <StatusBadge
                        status={submission.status}
                        label={reviewStatusLabel(submission.status)}
                        appearance="queue"
                      />
                    </div>

                    <p className="text-xs text-gray-700">
                      {submission.summary}
                    </p>

                    <div className="grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3">
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
                          <div className="min-w-0">
                            <p className="truncate text-xs font-medium text-slate-900">
                              {submission.student.name}
                            </p>
                            <p className="truncate text-[11px] text-gray-700">
                              {submission.student.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                          Submitted
                        </p>
                        <p className="pt-1.5 text-xs font-medium text-slate-900">
                          {submission.submittedDate}
                        </p>
                        <p className="text-[11px] text-gray-700">
                          {submission.relativeDate} ({submission.submittedTime})
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={`https://${submission.repo}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-normal leading-4 text-slate-900 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                      >
                        <CodeIcon className="h-3 w-3" />
                        Repo
                      </a>
                      <a
                        href={`https://${submission.liveUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-normal leading-4 text-slate-900 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                      >
                        <ExternalLinkIcon className="h-3 w-3" />
                        Preview
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/mentor/reviews/${submission.id}`}
                        className={`flex-1 rounded-lg px-3 py-2.5 text-center text-xs font-medium leading-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
                          submission.status === "Pending"
                            ? "bg-indigo-700 text-white hover:bg-indigo-800"
                            : "bg-blue-50 text-slate-900 hover:bg-blue-100"
                        }`}
                      >
                        {submission.status === "Pending"
                          ? "Review Project"
                          : "View Details"}
                      </Link>
                      <Link
                        href={`/mentor/reviews/${submission.id}`}
                        aria-label={`More actions for ${submission.project}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                      >
                        <MoreHorizontalIcon className="h-4 w-4" />
                      </Link>
                    </div>
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
                  No projects found
                </p>
                <p className="max-w-sm text-xs leading-5 text-gray-700">
                  Try a different project, student, commit, or status filter.
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

            <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-normal leading-4 text-gray-700">
                  Showing{" "}
                  <span className="text-slate-900">
                    {startResult}–{endResult}
                  </span>{" "}
                  of{" "}
                  <span className="text-slate-900">
                    {filteredSubmissions.length}
                  </span>{" "}
                  projects
                </p>
                <label className="flex items-center gap-1.5 text-xs text-gray-700">
                  Rows:
                  <span className="relative block">
                    <select
                      value={rowsPerPage}
                      onChange={(event) => {
                        setRowsPerPage(Number(event.target.value));
                        setPage(1);
                      }}
                      className="h-7 appearance-none rounded-sm border border-transparent bg-blue-50 pl-3 pr-7 text-xs font-normal text-slate-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-500" />
                  </span>
                </label>
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
                      className="flex h-8 w-6 items-center justify-center text-xs text-gray-700"
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
                  onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="review-velocity-heading"
            className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-indigo-700">
                <ActivityIcon className="h-5 w-5" />
              </span>
              <div>
                <h2
                  id="review-velocity-heading"
                  className="text-base font-semibold leading-6 text-slate-900"
                >
                  Review Velocity
                </h2>
                <p className="text-xs font-normal leading-4 text-gray-700">
                  Average turnaround time: 3.4 hrs (42% faster this milestone)
                </p>
              </div>
            </div>

            <div
              className="flex h-9 items-end gap-1.5"
              aria-hidden="true"
              title="Review velocity trend"
            >
              {velocityBars.map((height, index) => (
                <span
                  key={index}
                  className={`w-3 rounded-t-sm ${
                    index === velocityBars.length - 1
                      ? "bg-indigo-600 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
                      : index >= velocityBars.length - 3
                        ? "bg-indigo-600/60"
                        : "bg-indigo-600/20"
                  }`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </section>
        </div>
      </div>

    </>
  );
}
