"use client";

import { Fragment, useState } from "react";
import {
  ArrowRightIcon,
  ChartIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  CodeIcon,
  CommitIcon,
  FileTextIcon,
  GlobeIcon,
  GraduationCapIcon,
  InfoIcon,
  LayersIcon,
  PencilIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  XCircleIcon,
} from "@/components/dashboard/icons";
import type { Submission } from "@/components/mentor/data";
import {
  projectDetailAdvisor,
  type ProjectDetail,
  type RubricCriterion,
  type TopologyNode,
} from "@/components/mentor/project-detail-data";

type ReviewState =
  | "Under Review"
  | "Approved"
  | "Pending Info"
  | "Request Revision";

const statusOptions: ReviewState[] = [
  "Under Review",
  "Approved",
  "Pending Info",
  "Request Revision",
];

const statusStyles: Record<ReviewState, string> = {
  "Under Review": "bg-amber-50 text-amber-600 ring-amber-200",
  Approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Pending Info": "bg-blue-50 text-indigo-700 ring-indigo-200",
  "Request Revision": "bg-rose-50 text-red-700 ring-rose-200",
};

const statusDotStyles: Record<ReviewState, string> = {
  "Under Review": "bg-amber-500",
  Approved: "bg-emerald-500",
  "Pending Info": "bg-indigo-500",
  "Request Revision": "bg-red-600",
};

const topologyStyles: Record<TopologyNode["tone"], string> = {
  neutral: "border-slate-300 bg-white text-slate-900",
  active: "border-indigo-600 bg-indigo-100 text-indigo-700",
  success: "border-emerald-500 bg-emerald-50 text-emerald-600",
};

const gradeFor = (percentage: number) => {
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  if (percentage >= 60) return "D";
  return "F";
};

const reviewTextFor = (review: ProjectDetail["review"]) =>
  [review.intro, review.commendations, review.recommendation].join("\n\n");

const initialStatusFor = (submission: Submission): ReviewState => {
  if (submission.status === "Approved") return "Approved";
  if (submission.status === "Rejected") return "Request Revision";
  return "Under Review";
};

const initialVerdictFor = (submission: Submission): ReviewState => {
  if (submission.status === "Rejected") return "Request Revision";
  if (submission.status === "Approved") return "Approved";
  return "Approved";
};

export function MentorProjectDetails({
  submission,
  detail,
}: {
  submission: Submission;
  detail: ProjectDetail;
}) {
  const [reviewStatus, setReviewStatus] = useState<ReviewState>(
    initialStatusFor(submission),
  );
  const [verdict, setVerdict] = useState<ReviewState>(
    initialVerdictFor(submission),
  );
  const [scores, setScores] = useState<RubricCriterion[]>(detail.rubric);
  const [reviewText, setReviewText] = useState(reviewTextFor(detail.review));
  const [syncGradebook, setSyncGradebook] = useState(true);
  const [draftSaved, setDraftSaved] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalScore = scores.reduce((total, criterion) => total + criterion.score, 0);
  const maxScore = scores.reduce((total, criterion) => total + criterion.max, 0);
  const percentage = Math.round((totalScore / maxScore) * 100);
  const grade = gradeFor(percentage);

  const updateScore = (index: number, value: number) => {
    setScores((current) =>
      current.map((criterion, criterionIndex) =>
        criterionIndex === index
          ? {
              ...criterion,
              score: Math.min(criterion.max, Math.max(0, value || 0)),
            }
          : criterion,
      ),
    );
    setDraftSaved(false);
    setSubmitted(false);
  };

  const finalizeVerdict = () => {
    setReviewStatus(verdict);
    setSubmitted(true);
    setDraftSaved(false);
  };

  const verdictOptions = [
    {
      value: "Under Review" as const,
      title: "Under Review",
      description: "Active investigation",
      icon: ClockIcon,
      selected: "bg-white ring-1 ring-slate-400",
      iconStyle: "border-slate-300 bg-white text-slate-700",
      titleStyle: "text-slate-900",
    },
    {
      value: "Approved" as const,
      title: "Approved",
      description: "Issue milestone badge",
      icon: CheckCircleIcon,
      selected: "bg-emerald-50 ring-1 ring-emerald-500",
      iconStyle: "border-emerald-500 bg-white text-emerald-600",
      titleStyle: "text-slate-900",
    },
    {
      value: "Pending Info" as const,
      title: "Pending Info",
      description: "Awaiting student query",
      icon: InfoIcon,
      selected: "bg-blue-50 ring-1 ring-indigo-500",
      iconStyle: "border-indigo-300 bg-white text-indigo-700",
      titleStyle: "text-slate-900",
    },
    {
      value: "Request Revision" as const,
      title: "Request Revision",
      description: "Rework required",
      icon: RefreshIcon,
      selected: "bg-rose-50 ring-1 ring-rose-500",
      iconStyle: "border-rose-300 bg-white text-red-600",
      titleStyle: "text-slate-900",
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
      <section className="overflow-hidden rounded-xl bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col gap-5 p-5 sm:p-6 xl:p-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs leading-4">
                <span className="rounded-sm bg-blue-100 px-2 py-0.5 font-semibold uppercase tracking-wide text-indigo-700">
                  Milestone Evaluation
                </span>
                <span className="text-gray-500" aria-hidden="true">
                  /
                </span>
                <span className="inline-flex items-center gap-1 font-semibold tracking-tight text-gray-700">
                  <ClockIcon className="h-3 w-3 text-indigo-700" />
                  Submitted {detail.submittedLabel}
                </span>
                <span
                  className="h-1 w-1 rounded-full bg-slate-300"
                  aria-hidden="true"
                />
                <span className="font-normal text-gray-700">{detail.batch}</span>
              </div>

              <h1 className="max-w-3xl text-2xl font-semibold leading-8 text-slate-900 sm:text-3xl sm:leading-9">
                {submission.project} — Milestone #{detail.milestoneNumber}:{" "}
                {detail.milestoneTitle}
              </h1>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 pt-1 text-xs leading-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold tracking-tight text-indigo-700">
                  {submission.student.initials}
                </span>
                <span className="font-semibold text-slate-900">
                  {submission.student.name}
                </span>
                <span className="font-normal text-gray-700">
                  ({submission.student.email})
                </span>
                <span
                  className="h-1 w-1 rounded-full bg-slate-300"
                  aria-hidden="true"
                />
                <span className="rounded-sm bg-blue-50 px-2 py-0.5 font-normal text-gray-700">
                  ID: {submission.ticket}
                </span>
                <span
                  className="h-1 w-1 rounded-full bg-slate-300"
                  aria-hidden="true"
                />
                <span className="inline-flex items-center gap-1 font-semibold tracking-tight text-gray-700">
                  <GraduationCapIcon className="h-3.5 w-3.5 text-indigo-700" />
                  Advisee of {projectDetailAdvisor}
                </span>
              </div>
            </div>

            <div className="flex w-full flex-col gap-2 xl:w-96 xl:shrink-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="relative block">
                  <span className="sr-only">Evaluation status</span>
                  <span
                    className={`inline-flex h-9 items-center gap-2 rounded-full pl-3 pr-8 text-xs font-semibold leading-4 tracking-tight ring-1 ring-inset transition-colors ${statusStyles[reviewStatus]}`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${statusDotStyles[reviewStatus]}`}
                      aria-hidden="true"
                    />
                    {reviewStatus}
                  </span>
                  <select
                    value={reviewStatus}
                    onChange={(event) => {
                      setReviewStatus(event.target.value as ReviewState);
                      setSubmitted(false);
                    }}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-current" />
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setDraftSaved(true);
                    setSubmitted(false);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium leading-5 text-slate-900 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                >
                  <FileTextIcon className="h-3.5 w-3.5" />
                  {draftSaved ? "Draft Saved" : "Save Draft Evaluation"}
                </button>
              </div>

              <a
                href="#final-verdict"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2.5 text-sm font-medium leading-5 text-white shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10)] transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
              >
                <ShieldCheckIcon className="h-4 w-4" />
                Finalize &amp; Submit Verdict
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2 xl:grid-cols-4">
            <article className="flex items-center justify-between gap-2 rounded-xl bg-blue-50 px-3 py-5">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-900">
                  <CodeIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase leading-4 tracking-wide text-gray-700">
                    GitHub Repository
                  </p>
                  <p className="truncate text-xs font-semibold leading-4 text-slate-900">
                    {detail.repositoryLabel}
                  </p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-sm bg-white px-2 py-0.5 font-mono text-xs font-normal leading-5 text-gray-700">
                <CheckCircleIcon className="h-2.5 w-2.5 text-emerald-600" />
                {detail.commitLabel}
              </span>
            </article>

            <article className="flex items-center justify-between gap-2 rounded-xl bg-blue-50 px-3 py-5">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-700">
                  <GlobeIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase leading-4 tracking-wide text-gray-700">
                    Staging Preview
                  </p>
                  <p className="truncate text-xs font-semibold leading-4 text-slate-900">
                    {detail.previewLabel}
                  </p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-sm bg-emerald-50 px-2 py-0.5 text-xs font-semibold leading-4 tracking-tight text-emerald-600">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  aria-hidden="true"
                />
                {detail.previewStatus}
              </span>
            </article>

            <article className="flex items-center justify-between gap-2 rounded-xl bg-blue-50 px-3 py-5">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <ShieldCheckIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase leading-4 tracking-wide text-gray-700">
                    Pre-flight CI/CD
                  </p>
                  <p className="text-xs font-semibold leading-4 text-slate-900">
                    {detail.tests}
                  </p>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs font-semibold leading-4 text-emerald-600">
                  {detail.coverage}
                </p>
                <p className="text-xs font-semibold leading-4 tracking-tight text-gray-700">
                  {detail.vulnerabilities}
                </p>
              </div>
            </article>

            <article className="flex items-center justify-between gap-2 rounded-xl bg-blue-50 px-3 py-5">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-700">
                  <LayersIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase leading-4 tracking-wide text-gray-700">
                    Stack Footprint
                  </p>
                  <p className="text-xs font-semibold leading-4 text-slate-900">
                    {detail.services}
                  </p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-sm bg-white px-2 py-0.5 text-xs font-normal leading-4 text-gray-700">
                <ArrowRightIcon className="h-3 w-3 text-indigo-700" />
                {detail.bundle}
              </span>
            </article>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold leading-4 tracking-tight text-gray-700">
              Configured Stack:
            </span>
            {detail.stack.map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium leading-4 text-slate-900"
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${item.dot}`}
                  aria-hidden="true"
                />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-start">
        <div className="flex min-w-0 flex-col gap-6">
          <section
            aria-labelledby="submission-abstract-heading"
            className="rounded-xl bg-white p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-2">
                <FileTextIcon className="h-5 w-5 shrink-0 text-indigo-600" />
                <h2
                  id="submission-abstract-heading"
                  className="text-lg font-semibold leading-6 text-slate-900"
                >
                  Submission Abstract &amp; Architecture Log
                </h2>
              </div>
              <span className="w-fit rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold leading-4 tracking-tight text-gray-700">
                {detail.releaseLabel}
              </span>
            </div>

            <p className="whitespace-pre-line pt-4 text-sm font-normal leading-6 text-gray-700">
              {detail.abstract}
            </p>

            <div className="mt-4 rounded-xl bg-blue-50 p-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-semibold uppercase leading-4 tracking-wide text-gray-700">
                  Topology &amp; Request Flow Trace
                </p>
                <p className="text-xs font-normal leading-4 text-indigo-700">
                  {detail.latency}
                </p>
              </div>

              <div className="flex flex-col items-stretch gap-2 py-3 md:flex-row md:items-center">
                {detail.topology.map((node, index) => (
                  <Fragment key={node.label}>
                    <div
                      className={`flex min-w-0 flex-1 items-center gap-2 rounded-lg border px-3 py-2.5 ${topologyStyles[node.tone]}`}
                    >
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${
                          node.tone === "success"
                            ? "bg-emerald-500"
                            : node.tone === "active"
                              ? "bg-indigo-600"
                              : "bg-slate-300"
                        }`}
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold leading-4">
                          {node.label}
                        </p>
                        <p className="truncate text-[10px] font-normal leading-4 opacity-80">
                          {node.caption}
                        </p>
                      </div>
                    </div>
                    {index < detail.topology.length - 1 && (
                      <span className="flex shrink-0 items-center justify-center text-indigo-600">
                        <ChevronDownIcon className="h-4 w-4 md:hidden" />
                        <ArrowRightIcon className="hidden h-4 w-4 md:block" />
                      </span>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          </section>

          <section
            aria-labelledby="deliverables-heading"
            className="rounded-xl bg-white p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5 shrink-0 text-indigo-600" />
                <h2
                  id="deliverables-heading"
                  className="text-lg font-semibold leading-6 text-slate-900"
                >
                  Milestone Deliverables Verification
                </h2>
              </div>
              <span className="w-fit rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold leading-4 tracking-tight text-emerald-600">
                3 / 3 Requirements Met
              </span>
            </div>

            <div className="flex flex-col gap-2 pt-4">
              {detail.deliverables.map((deliverable, index) => (
                <article
                  key={deliverable.title}
                  className="flex items-start gap-3 rounded-xl bg-blue-50 p-3"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-emerald-50 text-emerald-600">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                      <h3 className="text-sm font-semibold leading-5 text-slate-900">
                        {index + 1}. {deliverable.title}
                      </h3>
                      <span className="w-fit max-w-full break-all rounded-sm bg-white px-2 py-0.5 font-mono text-xs font-normal leading-4 text-gray-700">
                        {deliverable.path}
                      </span>
                    </div>
                    <p className="pt-0.5 text-xs font-normal leading-5 text-gray-700">
                      {deliverable.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="commit-snapshot-heading"
            className="rounded-xl bg-white p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <CodeIcon className="h-5 w-5 shrink-0 text-indigo-600" />
                <h2
                  id="commit-snapshot-heading"
                  className="text-lg font-semibold leading-6 text-slate-900"
                >
                  Commit Snapshot &amp; Diff Preview
                </h2>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold leading-4">
                <span className="text-emerald-600">
                  +{detail.diff.additions} lines
                </span>
                <span className="font-normal text-gray-700">/</span>
                <span className="text-red-700">
                  -{detail.diff.removals} lines
                </span>
              </div>
            </div>

            <div className="mt-3 rounded-xl bg-white p-3 shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]">
              <div className="flex flex-col gap-2 border-b border-blue-100 pb-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-1.5">
                  <CommitIcon className="h-3.5 w-3.5 shrink-0 text-gray-700" />
                  <p className="break-all font-mono text-xs font-bold leading-5 text-gray-700">
                    {detail.diff.file}
                  </p>
                </div>
                <span className="w-fit shrink-0 rounded-sm bg-blue-50 px-2 py-0.5 font-mono text-xs font-semibold leading-4 tracking-tight text-gray-700">
                  commit {detail.commitLabel.replace(/^#/, "")}
                </span>
              </div>

              <div className="overflow-x-auto pt-1">
                <div className="min-w-[540px] font-mono text-xs leading-5">
                  <p className="py-0.5 font-normal text-gray-700 opacity-70">
                    {detail.diff.hunk}
                  </p>
                  {detail.diff.lines.map((line, index) => (
                    <p
                      key={`${line.kind}-${index}`}
                      className={`whitespace-pre px-1 ${
                        line.kind === "add"
                          ? "rounded-sm bg-emerald-50 text-emerald-600"
                          : line.kind === "remove"
                            ? "rounded-sm bg-rose-200/20 text-red-700"
                            : "text-gray-700 opacity-75"
                      }`}
                    >
                      {line.text}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-3 rounded-xl bg-blue-50 p-3">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs font-semibold uppercase leading-4 tracking-wide text-gray-700">
                    README.MD Excerpt — Testing Instructions
                  </p>
                  <span className="text-xs font-medium leading-4 text-indigo-700">
                    Auto-extracted
                  </span>
                </div>
                <p className="pt-1 text-xs font-normal leading-6 text-gray-700">
                  <code className="rounded-sm bg-white px-1.5 py-0.5 font-mono text-[11px] text-indigo-700">
                    {detail.testing.dockerCommand}
                  </code>{" "}
                  {detail.testing.description.split(" Run the stress command")[0]}
                  Run{" "}
                  <code className="rounded-sm bg-white px-1.5 py-0.5 font-mono text-[11px] text-indigo-700">
                    {detail.testing.stressCommand}
                  </code>{" "}
                  to trigger the k6 load generator.
                </p>
              </div>
            </div>
          </section>
        </div>

        <aside className="flex min-w-0 flex-col gap-6">
          <section
            aria-labelledby="rubric-heading"
            className="rounded-xl bg-white p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontalIcon className="h-5 w-5 shrink-0 text-indigo-600" />
                <h2
                  id="rubric-heading"
                  className="text-lg font-semibold leading-6 text-slate-900"
                >
                  Evaluation Rubric
                </h2>
              </div>
              <span className="w-fit rounded-sm bg-blue-100 px-2 py-0.5 text-xs font-semibold leading-4 text-gray-700">
                Standard MS4 Spec
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-indigo-100 p-3">
              <div>
                <p className="text-xs font-bold uppercase leading-4 tracking-wide text-indigo-700">
                  Cumulative Score
                </p>
                <p className="flex items-baseline gap-1">
                  <span className="text-2xl font-semibold leading-8 text-violet-950">
                    {totalScore}
                  </span>
                  <span className="text-base font-medium leading-6 text-indigo-700">
                    / {maxScore} pts
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium leading-4 tracking-tight text-indigo-700">
                  Grade Equivalent
                </p>
                <p className="text-lg font-bold leading-6 text-violet-950">
                  {grade} ({percentage}%)
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-3">
              {scores.map((criterion, index) => (
                <article
                  key={criterion.title}
                  className="rounded-xl bg-blue-50 p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold leading-5 text-slate-900">
                        {criterion.title}
                      </h3>
                      <p className="text-xs font-normal leading-4 text-gray-700">
                        {criterion.hint}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <input
                        type="number"
                        min={0}
                        max={criterion.max}
                        value={criterion.score}
                        onChange={(event) =>
                          updateScore(index, Number(event.target.value))
                        }
                        aria-label={`${criterion.title} score`}
                        className="h-9 w-14 rounded-lg bg-white text-center text-base font-bold text-indigo-700 outline-none focus:ring-2 focus:ring-indigo-600/30"
                      />
                      <span className="text-xs font-medium leading-4 text-gray-700">
                        / {criterion.max}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 rounded-lg bg-white px-3 py-1.5 text-xs font-normal leading-5 text-slate-900">
                    {criterion.note}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="mentor-review-heading"
            className="rounded-xl bg-white p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <PencilIcon className="h-5 w-5 shrink-0 text-indigo-600" />
                <h2
                  id="mentor-review-heading"
                  className="text-lg font-semibold leading-6 text-slate-900"
                >
                  Comprehensive Mentor Review
                </h2>
              </div>
              <p className="shrink-0 text-right text-xs font-semibold leading-4 tracking-tight text-gray-700">
                {projectDetailAdvisor}
              </p>
            </div>

            <div className="mt-3 overflow-hidden rounded-xl">
              <div className="flex items-center justify-between gap-2 rounded-t-lg bg-blue-50 px-3 py-1.5">
                <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-700">
                  <span>B</span>
                  <span className="italic">I</span>
                  <CodeIcon className="h-3 w-3" />
                  <span>≡</span>
                  <span>↗</span>
                </div>
                <span className="text-xs font-normal leading-4 text-gray-700">
                  Markdown enabled
                </span>
              </div>
              <textarea
                value={reviewText}
                onChange={(event) => {
                  setReviewText(event.target.value);
                  setDraftSaved(false);
                  setSubmitted(false);
                }}
                rows={11}
                aria-label="Mentor review comments"
                className="min-h-60 w-full resize-y bg-blue-50 p-3 text-sm font-normal leading-6 text-slate-900 outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600/30"
              />
            </div>
          </section>

          <section
            id="final-verdict"
            aria-labelledby="final-verdict-heading"
            className="scroll-mt-24 rounded-xl bg-white p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5 shrink-0 text-indigo-600" />
                <h2
                  id="final-verdict-heading"
                  className="text-lg font-semibold leading-6 text-slate-900"
                >
                  Final Milestone Verdict
                </h2>
              </div>
              <span className="w-fit rounded-sm bg-indigo-100 px-2 py-0.5 text-xs font-semibold leading-4 tracking-tight text-indigo-700">
                Official Sign-off
              </span>
            </div>

            <div className="flex flex-col gap-2 pt-3">
              {verdictOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = verdict === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      setVerdict(option.value);
                      setSubmitted(false);
                    }}
                    className={`flex min-h-16 w-full items-center gap-2 rounded-xl p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
                      isSelected
                        ? option.selected
                        : "bg-blue-50 hover:bg-blue-100"
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${option.iconStyle}`}
                    >
                      <Icon className="h-2.5 w-2.5" />
                    </span>
                    <span>
                      <span
                        className={`block text-xs font-semibold leading-4 ${option.titleStyle}`}
                      >
                        {option.title}
                      </span>
                      <span className="block text-xs font-semibold leading-4 tracking-tight text-gray-700">
                        {option.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <label className="flex cursor-pointer items-start gap-2 pt-4 text-xs font-normal leading-5 text-slate-900">
              <input
                type="checkbox"
                checked={syncGradebook}
                onChange={(event) => setSyncGradebook(event.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
              />
              Sync grade &amp; comments directly to Student Gradebook &amp; Canvas
              LMS
            </label>

            <div className="flex flex-col gap-2 pt-3">
              <button
                type="button"
                onClick={finalizeVerdict}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-2.5 text-sm font-semibold leading-5 text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
              >
                <CheckCircleIcon className="h-4 w-4" />
                {submitted
                  ? "Milestone Verdict Submitted"
                  : `Approve & Certify Milestone #${detail.milestoneNumber}`}
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setVerdict("Request Revision");
                    setSubmitted(false);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-rose-50 px-2 py-2 text-xs font-semibold leading-4 text-rose-600 transition-colors hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
                >
                  <XCircleIcon className="h-3.5 w-3.5" />
                  Request Revision
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDraftSaved(true);
                    setSubmitted(false);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-50 px-2 py-2 text-xs font-semibold leading-4 text-slate-900 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                >
                  <FileTextIcon className="h-3.5 w-3.5" />
                  Save Incomplete
                </button>
              </div>

              {(submitted || draftSaved) && (
                <p
                  role="status"
                  className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium leading-4 text-gray-700"
                >
                  <ChartIcon className="h-3.5 w-3.5 text-indigo-600" />
                  {submitted
                    ? `${verdict} recorded for ${submission.project}.`
                    : "Evaluation draft saved locally for this session."}
                </p>
              )}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
