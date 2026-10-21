"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import type { ComponentType } from "react";
import {
  ActivityIcon,
  AlertTriangleIcon,
  ArrowUpDownIcon,
  ChartIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  CloudIcon,
  CloseIcon,
  CommitIcon,
  DatabaseIcon,
  DownloadIcon,
  FileTextIcon,
  GridIcon,
  LayersIcon,
  MoreHorizontalIcon,
  PencilIcon,
  PlusIcon,
  RefreshIcon,
  SearchIcon,
  ShieldCheckIcon,
  type IconProps,
} from "@/components/dashboard/icons";
import { studentProfile } from "@/components/dashboard/profile";

type SubmissionStatus = "Under Review" | "Approved" | "Revision Requested";
type StatusFilter = "all" | SubmissionStatus;
type SortOption = "newest" | "oldest" | "score";

type Submission = {
  id: string;
  project: string;
  version: string;
  milestone: string;
  milestoneNumber: number;
  commit: string;
  submittedDate: string;
  submittedIso: string;
  submittedMeta: string;
  reviewer: {
    name: string;
    initials: string;
    role: string;
    tone: "blue" | "violet" | "sky";
  };
  checks: {
    primary: string;
    secondary: string;
    secondaryIcon: ComponentType<IconProps>;
    tone: "indigo" | "red";
  };
  status: SubmissionStatus;
  statusDetail: string;
  score: number | null;
  icon: ComponentType<IconProps>;
  iconTone: "violet" | "sky" | "rose" | "indigo";
  action: {
    label: string;
    href?: string;
    tone: "sky" | "blue" | "danger";
    tracksReview?: boolean;
  };
};

const submissions: Submission[] = [
  {
    id: "SUB-8849-TF",
    project: "TaskFlow",
    version: "v1.0.0-rc1",
    milestone: "Milestone #4: Microservices & Real-time sync",
    milestoneNumber: 4,
    commit: "#4f8b2a1",
    submittedDate: "Oct 18, 2026",
    submittedIso: "2026-10-18",
    submittedMeta: "2 days ago",
    reviewer: {
      name: "Prof. David Miller",
      initials: "DM",
      role: "Senior Staff",
      tone: "blue",
    },
    checks: {
      primary: "36/36 Passed",
      secondary: "Preview 200 OK",
      secondaryIcon: CloudIcon,
      tone: "indigo",
    },
    status: "Under Review",
    statusDetail: "Queue #3 • <24h SLA",
    score: null,
    icon: ChartIcon,
    iconTone: "violet",
    action: {
      label: "Track Review",
      tone: "sky",
      tracksReview: true,
    },
  },
  {
    id: "SUB-7712-CD",
    project: "CloudDeploy",
    version: "v0.9.4",
    milestone: "Milestone #3: Container orchestration & telemetry",
    milestoneNumber: 3,
    commit: "#8b3c1d9",
    submittedDate: "Oct 02, 2026",
    submittedIso: "2026-10-02",
    submittedMeta: "18 days ago",
    reviewer: {
      name: "Prof. David Miller",
      initials: "DM",
      role: "Reviewer",
      tone: "blue",
    },
    checks: {
      primary: "28/28 Passed",
      secondary: "100% Coverage",
      secondaryIcon: ShieldCheckIcon,
      tone: "indigo",
    },
    status: "Approved",
    statusDetail: "Exceeds Rubric Criteria",
    score: 98,
    icon: CloudIcon,
    iconTone: "sky",
    action: {
      label: "View Feedback",
      href: "/reviews",
      tone: "blue",
    },
  },
  {
    id: "SUB-6524-DB",
    project: "DevBoard",
    version: "v0.8.2",
    milestone: "Milestone #2: PostgreSQL & Prisma Migration",
    milestoneNumber: 2,
    commit: "#3e7a0f4",
    submittedDate: "Sep 18, 2026",
    submittedIso: "2026-09-18",
    submittedMeta: "1 month ago",
    reviewer: {
      name: "Dr. Elena Rostova",
      initials: "ER",
      role: "Lead Assessor",
      tone: "violet",
    },
    checks: {
      primary: "24/24 Passed",
      secondary: "Schema Valid",
      secondaryIcon: DatabaseIcon,
      tone: "indigo",
    },
    status: "Approved",
    statusDetail: "Meets Rubric Criteria",
    score: 95,
    icon: GridIcon,
    iconTone: "sky",
    action: {
      label: "View Feedback",
      href: "/reviews",
      tone: "blue",
    },
  },
  {
    id: "SUB-5318-QA",
    project: "QuickAuth",
    version: "v0.5.0",
    milestone: "Milestone #1: Identity Provider & Sessions",
    milestoneNumber: 1,
    commit: "#1a2b3c4",
    submittedDate: "Sep 05, 2026",
    submittedIso: "2026-09-05",
    submittedMeta: "6 weeks ago",
    reviewer: {
      name: "Marcus Vance",
      initials: "MV",
      role: "Security Evaluator",
      tone: "sky",
    },
    checks: {
      primary: "18/18 Passed",
      secondary: "0 Vulnerabilities",
      secondaryIcon: ShieldCheckIcon,
      tone: "indigo",
    },
    status: "Approved",
    statusDetail: "Exemplary Score",
    score: 100,
    icon: ShieldCheckIcon,
    iconTone: "indigo",
    action: {
      label: "View Feedback",
      href: "/reviews",
      tone: "blue",
    },
  },
  {
    id: "SUB-4907-ES",
    project: "EventStream",
    version: "v0.2.1",
    milestone: "Milestone #4 Beta: Stream Processing & DLQ",
    milestoneNumber: 4,
    commit: "#9d8e7f1",
    submittedDate: "Aug 24, 2026",
    submittedIso: "2026-08-24",
    submittedMeta: "2 months ago",
    reviewer: {
      name: "Dr. Elena Rostova",
      initials: "ER",
      role: "Lead Assessor",
      tone: "violet",
    },
    checks: {
      primary: "14/16 Passed",
      secondary: "1 Warning (DLQ Timeout)",
      secondaryIcon: AlertTriangleIcon,
      tone: "red",
    },
    status: "Revision Requested",
    statusDetail: "Action: Fix retry backoff",
    score: null,
    icon: ActivityIcon,
    iconTone: "rose",
    action: {
      label: "Resubmit / Edit",
      href: "/submit",
      tone: "danger",
    },
  },
  {
    id: "SUB-4412-DP",
    project: "DataPipe",
    version: "v0.1.0",
    milestone: "Milestone #0: Ingestion Schema & CLI",
    milestoneNumber: 0,
    commit: "#5f6a7b8",
    submittedDate: "Aug 10, 2026",
    submittedIso: "2026-08-10",
    submittedMeta: "2.5 months ago",
    reviewer: {
      name: "Prof. David Miller",
      initials: "DM",
      role: "Reviewer",
      tone: "blue",
    },
    checks: {
      primary: "12/12 Passed",
      secondary: "Lint Clean",
      secondaryIcon: CheckCircleIcon,
      tone: "indigo",
    },
    status: "Approved",
    statusDetail: "Exceeds Rubric Criteria",
    score: 97,
    icon: FileTextIcon,
    iconTone: "sky",
    action: {
      label: "View Feedback",
      href: "/reviews",
      tone: "blue",
    },
  },
];

const statusToneClasses = {
  "Under Review": {
    badge: "bg-violet-700/10 text-violet-700",
    dot: "bg-violet-700",
    detail: "text-gray-700",
  },
  Approved: {
    badge: "bg-sky-100 text-slate-900",
    dot: "bg-indigo-700",
    detail: "text-indigo-700",
  },
  "Revision Requested": {
    badge: "bg-rose-200/40 text-red-700",
    dot: "bg-red-700",
    detail: "text-red-700",
  },
} as const;

const projectToneClasses = {
  violet: "bg-violet-700/10 text-violet-700",
  sky: "bg-sky-100 text-indigo-700",
  rose: "bg-rose-200/40 text-red-700",
  indigo: "bg-indigo-600/10 text-indigo-700",
} as const;

const reviewerToneClasses = {
  blue: "bg-blue-100 text-slate-900",
  violet: "bg-violet-700/10 text-violet-700",
  sky: "bg-sky-100 text-indigo-700",
} as const;

const actionToneClasses = {
  sky: "bg-sky-100 text-indigo-700 hover:bg-sky-200",
  blue: "bg-blue-50 text-slate-900 hover:bg-blue-100",
  danger: "bg-red-700 text-white hover:bg-red-800",
} as const;

const approvedSubmissions = submissions.filter(
  (submission) => submission.status === "Approved",
);
const averageApprovedScore = Math.round(
  approvedSubmissions.reduce(
    (total, submission) => total + (submission.score ?? 0),
    0,
  ) / approvedSubmissions.length,
);

type OverviewStat = {
  label: string;
  value: number;
  suffix: string;
  suffixTone: string;
  valueTone: string;
  icon: ComponentType<IconProps>;
  iconTone: string;
  metaLead: string;
  metaLeadTone: string;
  metaRest: string;
  metaTone: string;
  dot?: string;
};

const overviewStats: OverviewStat[] = [
  {
    label: "Total Submissions",
    value: submissions.length,
    suffix: "projects",
    suffixTone: "text-gray-700",
    valueTone: "text-slate-900",
    icon: LayersIcon,
    iconTone: "bg-blue-50 text-indigo-700",
    metaLead: "100%",
    metaLeadTone: "text-indigo-700",
    metaRest: "syllabus progress",
    metaTone: "text-gray-700",
  },
  {
    label: "Under Review",
    value: submissions.filter((submission) => submission.status === "Under Review")
      .length,
    suffix: "active SLA",
    suffixTone: "text-gray-700",
    valueTone: "text-violet-700",
    icon: RefreshIcon,
    iconTone: "bg-blue-100 text-indigo-700",
    metaLead: "Queue Pos #3 • ETA <24 hrs",
    metaLeadTone: "text-violet-700",
    metaRest: "",
    metaTone: "text-gray-700",
    dot: "bg-violet-700",
  },
  {
    label: "Pending Revision",
    value: submissions.filter(
      (submission) => submission.status === "Revision Requested",
    ).length,
    suffix: "action required",
    suffixTone: "text-gray-700",
    valueTone: "text-red-700",
    icon: AlertTriangleIcon,
    iconTone: "bg-rose-200/30 text-red-700",
    metaLead: "Dead letter retry update",
    metaLeadTone: "text-red-700",
    metaRest: "",
    metaTone: "text-red-700",
  },
  {
    label: "Approved & Certified",
    value: approvedSubmissions.length,
    suffix: `Avg ${averageApprovedScore}%`,
    suffixTone: "text-indigo-700",
    valueTone: "text-slate-900",
    icon: CheckCircleIcon,
    iconTone: "bg-blue-50 text-indigo-700",
    metaLead: "All rubrics met or exceeded",
    metaLeadTone: "text-gray-700",
    metaRest: "",
    metaTone: "text-gray-700",
  },
];

const milestoneOptions = Array.from(
  new Set(submissions.map((submission) => submission.milestoneNumber)),
).sort((a, b) => b - a);

const rubricChecks = [
  {
    title: "Architecture & Clean Microservices",
    description:
      "Event-driven RPC separation and stateless API gateways",
    score: "25/25 pts",
    tone: "text-indigo-700",
    icon: CheckCircleIcon,
    iconTone: "text-indigo-700",
  },
  {
    title: "Test Suite & Concurrency Checks",
    description:
      "All 36 Jest & Playwright tests passing with 0 race conditions",
    score: "30/30 pts",
    tone: "text-indigo-700",
    icon: CheckCircleIcon,
    iconTone: "text-indigo-700",
  },
  {
    title: "Code Documentation & OpenAPI Spec",
    description:
      "Evaluating Swagger UI sync & async schema documentation",
    score: "Pending Mentor Review",
    tone: "text-violet-700",
    icon: RefreshIcon,
    iconTone: "text-violet-700",
  },
];

const pipelineSteps = [
  {
    label: "CI Pre-Flight Checks Passed",
    state: "complete",
    icon: CheckIcon,
  },
  {
    label: "Assigned to Prof. David Miller",
    state: "complete",
    icon: CheckIcon,
  },
  {
    label: "Evaluation Rubric in Progress",
    detail: "Queue position #3 (SLA: <24 hrs)",
    state: "active",
    icon: PencilIcon,
  },
  {
    label: "Final Grade & Certificate Issued",
    state: "upcoming",
    icon: CheckIcon,
  },
] as const;

const pipelineToneClasses = {
  complete: "bg-indigo-700 text-white",
  active: "bg-violet-700 text-white",
  upcoming: "bg-blue-100 text-slate-900",
} as const;

export function Submissions() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [milestoneFilter, setMilestoneFilter] = useState("all");
  const [sort, setSort] = useState<SortOption>("newest");
  const [reviewVisible, setReviewVisible] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredSubmissions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return [...submissions]
      .filter((submission) => {
        const matchesStatus =
          statusFilter === "all" || submission.status === statusFilter;
        const matchesMilestone =
          milestoneFilter === "all" ||
          String(submission.milestoneNumber) === milestoneFilter;
        const searchableText = [
          submission.project,
          submission.milestone,
          submission.commit,
          submission.reviewer.name,
          submission.status,
        ]
          .join(" ")
          .toLowerCase();

        return (
          matchesStatus &&
          matchesMilestone &&
          (normalizedQuery === "" ||
            searchableText.includes(normalizedQuery))
        );
      })
      .sort((a, b) => {
        if (sort === "oldest") {
          return a.submittedIso.localeCompare(b.submittedIso);
        }

        if (sort === "score") {
          return (b.score ?? -1) - (a.score ?? -1);
        }

        return b.submittedIso.localeCompare(a.submittedIso);
      });
  }, [milestoneFilter, query, sort, statusFilter]);

  const hasActiveFilters =
    query.trim() !== "" ||
    statusFilter !== "all" ||
    milestoneFilter !== "all" ||
    sort !== "newest";

  const resetFilters = () => {
    setQuery("");
    setStatusFilter("all");
    setMilestoneFilter("all");
    setSort("newest");
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value as StatusFilter);
  };

  const handleExport = () => {
    const headers = [
      "Project",
      "Version",
      "Milestone",
      "Commit",
      "Submitted",
      "Reviewer",
      "CI/CD",
      "Status",
      "Score",
    ];
    const rows = filteredSubmissions.map((submission) => [
      submission.project,
      submission.version,
      submission.milestone,
      submission.commit,
      submission.submittedDate,
      submission.reviewer.name,
      submission.checks.primary,
      submission.status,
      submission.score === null ? "Pending" : `${submission.score}/100`,
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsvValue).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "submissions-log.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const trackReview = () => {
    setReviewVisible(true);
    window.setTimeout(() => {
      document
        .getElementById("active-review")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <span
              className="h-1.5 w-1.5 rounded-full bg-indigo-700"
              aria-hidden="true"
            />
            <p className="text-xs font-semibold uppercase leading-4 tracking-wide text-indigo-700">
              Academic Portfolio Registry
            </p>
          </div>
          <h1 className="font-serif text-2xl font-semibold leading-9 tracking-tight text-slate-900 sm:text-3xl sm:leading-10">
            My Submissions
          </h1>
          <p className="max-w-2xl text-pretty text-sm leading-5 text-gray-700">
            Browse, filter, and track all submitted projects, code reviews,
            automated CI pre-flight checks, and mentor evaluation rubrics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleExport}
            disabled={filteredSubmissions.length === 0}
            className="inline-flex h-10 items-center gap-1 rounded-lg bg-blue-50 px-3 text-sm font-medium leading-5 text-slate-900 shadow-sm transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <DownloadIcon className="h-3.5 w-3.5" />
            Export Log
          </button>
          <Link
            href="/submit"
            className="inline-flex h-10 items-center gap-1 rounded-lg bg-indigo-700 px-3 text-sm font-medium leading-5 text-white shadow-sm transition-colors hover:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            <PlusIcon className="h-3.5 w-3.5" />
            New Submission
          </Link>
        </div>
      </header>

      <section aria-label="Submission statistics">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {overviewStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="flex flex-col justify-between rounded-xl bg-white p-5 shadow-sm ring-1 ring-inset ring-slate-200/60"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium leading-4 text-gray-700">
                    {stat.label}
                  </p>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${stat.iconTone}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <div className="flex items-baseline gap-1 pt-3">
                  <p
                    className={`text-3xl font-semibold leading-10 ${stat.valueTone}`}
                  >
                    {stat.value}
                  </p>
                  <p
                    className={`text-xs font-semibold leading-4 tracking-tight ${stat.suffixTone}`}
                  >
                    {stat.suffix}
                  </p>
                </div>
                <div className="flex items-center gap-1 pt-1">
                  {stat.dot && (
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${stat.dot}`}
                      aria-hidden="true"
                    />
                  )}
                  <p
                    className={`text-xs font-normal leading-4 ${stat.metaTone}`}
                  >
                    <span
                      className={`font-semibold ${stat.metaLeadTone}`}
                    >
                      {stat.metaLead}
                    </span>
                    {stat.metaRest && ` ${stat.metaRest}`}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        aria-label="Filter submissions"
        className="flex flex-col gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-inset ring-slate-200/60 lg:flex-row lg:items-center"
      >
        <div className="relative w-full lg:max-w-96">
          <label htmlFor="submission-search" className="sr-only">
            Search submissions
          </label>
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            ref={searchRef}
            id="submission-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by project title, milestone, commit hash (#4f8b2a1)..."
            className="h-10 w-full rounded-lg border border-transparent bg-blue-50 py-2 pl-9 pr-14 text-sm leading-5 text-slate-900 outline-none transition-colors placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-white hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            >
              <CloseIcon className="h-3 w-3" />
            </button>
          ) : (
            <span className="pointer-events-none absolute right-2 top-1/2 hidden h-6 -translate-y-1/2 items-center rounded-sm bg-sky-100 px-1.5 font-mono text-[10px] leading-5 text-gray-700 sm:flex">
              ⌘K
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-wrap items-center gap-2">
          <SelectControl
            label="Filter by status"
            value={statusFilter}
            onChange={handleStatusChange}
            className="w-full sm:w-44"
          >
            <option value="all">
              All Statuses ({submissions.length})
            </option>
            {(["Under Review", "Approved", "Revision Requested"] as const).map(
              (status) => (
                <option key={status} value={status}>
                  {status} (
                  {
                    submissions.filter(
                      (submission) => submission.status === status,
                    ).length
                  }
                  )
                </option>
              ),
            )}
          </SelectControl>

          <SelectControl
            label="Filter by milestone"
            value={milestoneFilter}
            onChange={(event) => setMilestoneFilter(event.target.value)}
            className="w-full sm:w-52"
          >
            <option value="all">All Milestones</option>
            {milestoneOptions.map((milestone) => (
              <option key={milestone} value={String(milestone)}>
                Milestone #{milestone}
              </option>
            ))}
          </SelectControl>

          <SelectControl
            label="Sort submissions"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="w-full sm:w-40"
            icon={<ArrowUpDownIcon className="h-3.5 w-3.5" />}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="score">Highest Score</option>
          </SelectControl>

          <button
            type="button"
            onClick={resetFilters}
            disabled={!hasActiveFilters}
            aria-label="Reset filters"
            title="Reset filters"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-gray-700 transition-colors hover:bg-blue-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RefreshIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      <section
        aria-label="Submission history"
        className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-inset ring-slate-200/60"
      >
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[68rem] border-collapse text-left">
            <caption className="sr-only">
              Academic project submissions with reviewer, automated checks, and
              evaluation status
            </caption>
            <thead className="bg-blue-50/60">
              <tr>
                <th
                  scope="col"
                  className="w-[30%] px-5 py-5 text-xs font-semibold uppercase leading-4 tracking-wide text-gray-700"
                >
                  Project &amp; Milestone
                </th>
                <th
                  scope="col"
                  className="w-[11%] px-3 py-5 text-xs font-semibold uppercase leading-4 tracking-wide text-gray-700"
                >
                  Submitted
                </th>
                <th
                  scope="col"
                  className="w-[16%] px-3 py-5 text-xs font-semibold uppercase leading-4 tracking-wide text-gray-700"
                >
                  Assigned Reviewer
                </th>
                <th
                  scope="col"
                  className="w-[15%] px-3 py-5 text-xs font-semibold uppercase leading-4 tracking-wide text-gray-700"
                >
                  CI/CD Pre-Flight
                </th>
                <th
                  scope="col"
                  className="w-[16%] px-3 py-5 text-xs font-semibold uppercase leading-4 tracking-wide text-gray-700"
                >
                  Status &amp; Evaluation
                </th>
                <th
                  scope="col"
                  className="w-[12%] px-5 py-5 text-right text-xs font-semibold uppercase leading-4 tracking-wide text-gray-700"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((submission) => (
                <tr
                  key={submission.id}
                  className="border-t border-blue-100/60 align-middle transition-colors hover:bg-blue-50/30"
                >
                  <td className="px-5 py-5">
                    <ProjectIdentity submission={submission} />
                  </td>
                  <td className="px-3 py-5">
                    <SubmittedMeta submission={submission} />
                  </td>
                  <td className="px-3 py-5">
                    <ReviewerMeta submission={submission} />
                  </td>
                  <td className="px-3 py-5">
                    <CheckSummary submission={submission} />
                  </td>
                  <td className="px-3 py-5">
                    <StatusSummary submission={submission} />
                  </td>
                  <td className="px-5 py-5">
                    <SubmissionActions
                      submission={submission}
                      onTrackReview={trackReview}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col divide-y divide-blue-100/60 md:hidden">
          {filteredSubmissions.map((submission) => (
            <article key={submission.id} className="flex flex-col gap-4 p-4">
              <div className="flex flex-col gap-3">
                <ProjectIdentity submission={submission} />
                <StatusSummary submission={submission} />
              </div>
              <div className="grid grid-cols-2 gap-3 rounded-lg bg-blue-50/60 p-3">
                <div>
                  <p className="pb-0.5 text-[10px] font-semibold uppercase leading-4 tracking-wide text-gray-500">
                    Submitted
                  </p>
                  <SubmittedMeta submission={submission} />
                </div>
                <div>
                  <p className="pb-0.5 text-[10px] font-semibold uppercase leading-4 tracking-wide text-gray-500">
                    Reviewer
                  </p>
                  <ReviewerMeta submission={submission} />
                </div>
                <div className="col-span-2">
                  <p className="pb-0.5 text-[10px] font-semibold uppercase leading-4 tracking-wide text-gray-500">
                    CI/CD pre-flight
                  </p>
                  <CheckSummary submission={submission} />
                </div>
              </div>
              <SubmissionActions
                submission={submission}
                onTrackReview={trackReview}
                mobile
              />
            </article>
          ))}
        </div>

        {filteredSubmissions.length === 0 && (
          <div className="flex flex-col items-center gap-3 px-5 py-16 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-indigo-700">
              <SearchIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-5 text-slate-900">
                No submissions match your filters
              </p>
              <p className="text-xs leading-4 text-gray-700">
                Try a different project name, commit hash, or milestone.
              </p>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-lg bg-sky-100 px-3 py-1.5 text-xs font-semibold leading-4 tracking-tight text-indigo-700 transition-colors hover:bg-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            >
              Clear filters
            </button>
          </div>
        )}

        <footer className="flex flex-col justify-between gap-3 border-t border-blue-100/60 bg-blue-50/40 p-3 sm:flex-row sm:items-center">
          <div
            className="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-xs leading-4"
            aria-live="polite"
          >
            <span className="font-medium text-slate-900">
              Showing {filteredSubmissions.length === 0 ? 0 : 1}–
              {filteredSubmissions.length}
            </span>
            <span className="text-gray-700">
              of {submissions.length} submissions
            </span>
            <span className="px-1 text-slate-300" aria-hidden="true">
              •
            </span>
            <span className="text-gray-700">All submissions up to date</span>
            <span
              className="h-1.5 w-1.5 rounded-full bg-indigo-700"
              aria-hidden="true"
            />
            <span className="text-gray-700">Last synced 2 mins ago</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled
              className="rounded-sm bg-sky-100 px-3 py-1.5 text-xs font-semibold leading-4 tracking-tight text-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Previous
            </button>
            <span className="rounded-sm bg-indigo-700 px-3 py-1.5 text-xs font-semibold leading-4 tracking-tight text-white">
              1
            </span>
            <button
              type="button"
              disabled
              className="rounded-sm bg-sky-100 px-3 py-1.5 text-xs font-semibold leading-4 tracking-tight text-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Next
            </button>
          </div>
        </footer>
      </section>

      {reviewVisible && (
        <section
          id="active-review"
          aria-labelledby="active-review-heading"
          className="relative scroll-mt-24 overflow-hidden rounded-xl bg-white p-4 shadow-sm ring-1 ring-inset ring-slate-200/60 sm:p-5"
        >
          <div
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-700 via-violet-700 to-indigo-600"
            aria-hidden="true"
          />

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="flex min-w-0 flex-col gap-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-semibold leading-4 tracking-tight text-indigo-700">
                      Active Review Target
                    </span>
                    <span className="text-xs leading-4 text-gray-500">
                      ID: SUB-8849-TF
                    </span>
                  </div>
                  <h2
                    id="active-review-heading"
                    className="font-serif text-lg font-semibold leading-6 tracking-tight text-slate-900"
                  >
                    TaskFlow — Milestone #4: Microservices &amp; Real-time sync
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setReviewVisible(false)}
                  aria-label="Dismiss active review target"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                >
                  <CloseIcon className="h-3 w-3" />
                </button>
              </div>

              <p className="text-sm leading-5 text-gray-700">
                {studentProfile.name} submitted commit{" "}
                <span className="rounded-sm bg-sky-100 px-1.5 py-0.5 font-mono text-xs font-medium leading-4 text-indigo-700">
                  #4f8b2a1
                </span>{" "}
                containing WebSocket broadcast pipelines, Redis Pub/Sub
                adapter, and Docker Compose definition with 3 independent
                replicas.
              </p>

              <div className="flex flex-col gap-2 pt-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xs font-semibold leading-4 tracking-tight text-slate-900">
                    Grading Rubric Checkpoints
                  </h3>
                  <p className="text-xs font-semibold leading-4 tracking-tight text-indigo-700">
                    Pre-check: 96 / 100 projected
                  </p>
                </div>

                <ul className="flex flex-col gap-2">
                  {rubricChecks.map((check) => {
                    const Icon = check.icon;

                    return (
                      <li
                        key={check.title}
                        className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-blue-50 p-2"
                      >
                        <div className="flex min-w-0 items-start gap-2">
                          <Icon
                            className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${check.iconTone}`}
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-semibold leading-4 text-slate-900">
                              {check.title}
                            </p>
                            <p className="text-pretty text-xs leading-4 text-gray-700">
                              {check.description}
                            </p>
                          </div>
                        </div>
                        <p
                          className={`shrink-0 text-xs font-semibold leading-4 ${check.tone}`}
                        >
                          {check.score}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <aside className="flex flex-col justify-between gap-3 rounded-xl bg-blue-50 p-3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold uppercase leading-4 tracking-wide text-gray-700">
                    Review Pipeline
                  </p>
                  <p className="text-xs font-medium leading-4 text-violet-700">
                    Under Review
                  </p>
                </div>

                <ul className="flex flex-col gap-3 pt-2">
                  {pipelineSteps.map((step) => {
                    const Icon = step.icon;
                    const isUpcoming = step.state === "upcoming";

                    return (
                      <li
                        key={step.label}
                        className={`flex items-start gap-2.5 ${
                          isUpcoming ? "opacity-40" : ""
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${pipelineToneClasses[step.state]}`}
                        >
                          <Icon className="h-3 w-3" />
                        </span>
                        <div className="min-w-0">
                          <p
                            className={`text-xs font-medium leading-4 ${
                              step.state === "active"
                                ? "font-semibold text-violet-700"
                                : "text-slate-900"
                            }`}
                          >
                            {step.label}
                          </p>
                          {"detail" in step && step.detail && (
                            <p className="text-xs leading-4 text-gray-700">
                              {step.detail}
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1 rounded-lg bg-white p-2 shadow-sm">
                  <p className="flex items-center gap-1 text-xs font-semibold leading-4 tracking-tight text-slate-900">
                    <FileTextIcon className="h-3.5 w-3.5 text-indigo-700" />
                    Assigned Reviewer
                  </p>
                  <p className="text-xs leading-4 text-gray-700">
                    &ldquo;Received and staging env spun up cleanly. Looking
                    over the event bus retry logic this afternoon.&rdquo;
                  </p>
                  <p className="pt-1 text-right text-xs leading-4 text-gray-500">
                    — Prof. David Miller
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="flex-1 rounded-lg bg-indigo-700 px-3 py-2 text-xs font-semibold leading-4 text-white shadow-sm transition-colors hover:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                  >
                    Open Staging Diff
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewVisible(false)}
                    className="rounded-lg bg-sky-100 px-3 py-2 text-xs font-medium leading-4 text-gray-700 transition-colors hover:bg-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>
      )}
    </div>
  );
}

function ProjectIdentity({ submission }: { submission: Submission }) {
  const Icon = submission.icon;

  return (
    <div className="flex min-w-0 items-start gap-2">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${projectToneClasses[submission.iconTone]}`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1">
          <p className="text-base font-semibold leading-6 text-slate-900">
            {submission.project}
          </p>
          <span className="rounded-sm bg-sky-100 px-1.5 py-0.5 font-mono text-[10px] font-normal leading-4 text-gray-700">
            {submission.version}
          </span>
        </div>
        <p className="text-pretty text-xs leading-4 text-gray-700">
          {submission.milestone}
        </p>
        <p className="flex items-center gap-1 pt-1 text-xs leading-4 text-gray-500">
          <CommitIcon className="h-3 w-3 shrink-0" />
          {submission.commit}
        </p>
      </div>
    </div>
  );
}

function SubmittedMeta({ submission }: { submission: Submission }) {
  const isRecent = submission.submittedIso >= "2026-10-01";

  return (
    <div>
      <p className="whitespace-nowrap text-sm font-medium leading-5 text-slate-900">
        {submission.submittedDate}
      </p>
      <p
        className={`whitespace-nowrap text-xs font-semibold leading-4 tracking-tight ${
          isRecent ? "text-indigo-700" : "text-gray-700"
        }`}
      >
        {submission.submittedMeta}
      </p>
    </div>
  );
}

function ReviewerMeta({ submission }: { submission: Submission }) {
  return (
    <div className="flex min-w-0 items-center gap-1">
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold leading-4 tracking-tight ${reviewerToneClasses[submission.reviewer.tone]}`}
      >
        {submission.reviewer.initials}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium leading-5 text-slate-900">
          {submission.reviewer.name}
        </p>
        <p className="text-xs font-semibold leading-4 tracking-tight text-gray-700">
          {submission.reviewer.role}
        </p>
      </div>
    </div>
  );
}

function CheckSummary({ submission }: { submission: Submission }) {
  const SecondaryIcon = submission.checks.secondaryIcon;
  const isWarning = submission.checks.tone === "red";
  const PrimaryIcon = isWarning ? AlertTriangleIcon : CheckCircleIcon;

  return (
    <div className="flex flex-col items-start gap-1">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium leading-4 tracking-tight ${
          isWarning
            ? "bg-rose-200/40 text-red-700"
            : "bg-sky-100 text-indigo-700"
        }`}
      >
        <PrimaryIcon className="h-3 w-3 shrink-0" />
        {submission.checks.primary}
      </span>
      <span
        className={`flex items-start gap-1 text-xs leading-4 ${
          isWarning ? "text-red-700" : "text-gray-700"
        }`}
      >
        <SecondaryIcon className="mt-0.5 h-3 w-3 shrink-0" />
        {submission.checks.secondary}
      </span>
    </div>
  );
}

function StatusSummary({ submission }: { submission: Submission }) {
  const tone = statusToneClasses[submission.status];
  const statusLabel =
    submission.status === "Approved"
      ? `Approved • ${submission.score}/100`
      : submission.status;

  return (
    <div className="flex max-w-full flex-col items-start gap-1">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium leading-4 tracking-tight ${tone.badge}`}
      >
        <span
          className={`h-1.5 w-1.5 shrink-0 rounded-full ${tone.dot}`}
          aria-hidden="true"
        />
        {statusLabel}
      </span>
      <p
        className={`text-pretty text-xs font-medium leading-4 ${tone.detail}`}
      >
        {submission.statusDetail}
      </p>
    </div>
  );
}

function SubmissionActions({
  submission,
  onTrackReview,
  mobile = false,
}: {
  submission: Submission;
  onTrackReview: () => void;
  mobile?: boolean;
}) {
  const actionClass = `inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold leading-4 tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 ${actionToneClasses[submission.action.tone]}`;

  return (
    <div
      className={`flex items-center gap-1 ${
        mobile ? "justify-between" : "justify-end"
      }`}
    >
      {submission.action.tracksReview ? (
        <button
          type="button"
          onClick={onTrackReview}
          className={actionClass}
        >
          {submission.action.label}
        </button>
      ) : (
        <Link
          href={submission.action.href ?? "/submissions"}
          className={actionClass}
        >
          {submission.action.label}
        </Link>
      )}
      <button
        type="button"
        aria-label={`More actions for ${submission.project}`}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-blue-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
      >
        <MoreHorizontalIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

function SelectControl({
  label,
  value,
  onChange,
  className,
  icon,
  children,
}: {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  className: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  const id = label.toLowerCase().replaceAll(" ", "-");

  return (
    <div className={`relative ${className}`}>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="h-10 w-full appearance-none rounded-lg border border-transparent bg-blue-50 pl-3 pr-8 text-xs font-medium leading-4 text-slate-900 outline-none transition-colors hover:bg-blue-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center gap-1 text-gray-500">
        {icon}
        <ChevronDownIcon className="h-3.5 w-3.5" />
      </span>
    </div>
  );
}

function escapeCsvValue(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}
