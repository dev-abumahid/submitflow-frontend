import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import {
  ActivityIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CheckIcon,
  ClockIcon,
  CodeIcon,
  ExternalLinkIcon,
  GraduationCapIcon,
  HourglassIcon,
  LayersIcon,
  RefreshIcon,
  ShieldCheckIcon,
  type IconProps,
} from "@/components/dashboard/icons";
import {
  currentDateLabel,
  studentProfile,
} from "@/components/dashboard/profile";

const statToneClasses = {
  indigo: {
    icon: "bg-indigo-600/10 text-indigo-700",
    badge: "bg-sky-100 text-indigo-700",
  },
  amber: {
    icon: "bg-amber-500/10 text-amber-600",
    badge: "bg-amber-50 text-amber-700",
  },
  violet: {
    icon: "bg-indigo-600/10 text-violet-700",
    badge: "bg-purple-200 text-violet-700",
  },
  emerald: {
    icon: "bg-emerald-500/10 text-emerald-600",
    badge: "bg-emerald-50 text-emerald-700",
  },
} as const;

type StatTone = keyof typeof statToneClasses;

const stats: {
  label: string;
  value: string;
  badge: string;
  icon: ComponentType<IconProps>;
  tone: StatTone;
}[] = [
  {
    label: "Total submissions",
    value: "6",
    badge: "All terms",
    icon: LayersIcon,
    tone: "indigo",
  },
  {
    label: "Pending",
    value: "1",
    badge: "Queue pos #3",
    icon: ClockIcon,
    tone: "amber",
  },
  {
    label: "Under review",
    value: "1",
    badge: "Active now",
    icon: RefreshIcon,
    tone: "violet",
  },
  {
    label: "Approved",
    value: "4",
    badge: "Avg 98%",
    icon: CheckCircleIcon,
    tone: "emerald",
  },
];

const submission = {
  version: "v1.0.0-rc1",
  status: "Under Review",
  title: "TaskFlow — Project Management App",
  description:
    "Collaborative kanban and milestone orchestrator. Complete with automated unit test suites, real-time sync, and Supabase auth.",
  submittedOn: {
    date: "Oct 18, 2026",
    meta: "14:32 EST • #4f8b2a1",
  },
  estimatedDecision: {
    date: "By Oct 22, 2026",
    meta: "< 24h Remaining",
  },
  reviewer: {
    name: "Prof. David Miller",
    role: "Senior Staff Engineering",
  },
  checks: {
    passed: "36/36 Passed",
  },
};

const lifecycleToneClasses = {
  completed: {
    card: "bg-blue-50 ring-1 ring-inset ring-slate-300/20",
    icon: "bg-indigo-700 text-white",
    badge: "bg-blue-100 text-indigo-700",
    meta: "text-gray-500",
  },
  progress: {
    card: "bg-sky-100 shadow-sm ring-2 ring-inset ring-indigo-700/20",
    icon: "bg-violet-500 text-white",
    badge: "bg-purple-200 text-violet-700",
    meta: "text-violet-700",
  },
  upcoming: {
    card: "bg-blue-50 opacity-75 ring-1 ring-inset ring-slate-300/20",
    icon: "bg-sky-100 text-gray-500",
    badge: "bg-sky-100 text-gray-500",
    meta: "text-gray-500",
  },
} as const;

type LifecycleTone = keyof typeof lifecycleToneClasses;

const lifecycleSteps: {
  number: number;
  title: string;
  status: string;
  description: string;
  meta: string;
  icon: ComponentType<IconProps>;
  tone: LifecycleTone;
}[] = [
  {
    number: 1,
    title: "Submitted",
    status: "Completed",
    description:
      "Repository snapshot verified & payload locked.",
    meta: "Oct 18, 2026 • 2:32 PM",
    icon: CheckIcon,
    tone: "completed",
  },
  {
    number: 2,
    title: "Under Review",
    status: "In Progress",
    description: "In mentor queue for rubric audit & code analysis.",
    meta: "Prof. David Miller (Senior Staff)",
    icon: RefreshIcon,
    tone: "progress",
  },
  {
    number: 3,
    title: "Final Decision",
    status: "Upcoming",
    description:
      "Awaiting rubric scoring, feedback synthesis & certification.",
    meta: "Estimated: Oct 22, 2026",
    icon: HourglassIcon,
    tone: "upcoming",
  },
];

export function Dashboard() {
  return (
    <div className="relative isolate flex flex-col gap-8">
      <div
        className="pointer-events-none absolute -top-20 left-1/4 -z-10 h-72 w-72 rounded-full bg-indigo-600/10 blur-[32px] sm:h-96 sm:w-96"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-1/4 top-48 -z-10 h-64 w-64 rounded-full bg-violet-500/5 blur-[20px] sm:h-80 sm:w-80"
        aria-hidden="true"
      />

      <header className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <h1 className="font-serif text-2xl font-semibold leading-9 tracking-tight text-slate-900 sm:text-3xl sm:leading-10">
              Welcome back, {studentProfile.firstName}!
            </h1>
            <span
              className="text-2xl leading-8"
              role="img"
              aria-label="Waving hand"
            >
              👋
            </span>
          </div>
          <p className="text-pretty text-sm leading-6 text-gray-700 sm:text-base">
            Track your project submission and live review progress.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1.5 text-xs leading-4 shadow-sm">
            <span
              className="h-2 w-2 rounded-full bg-indigo-700"
              aria-hidden="true"
            />
            <span className="font-semibold text-indigo-700">
              Live Tracking
            </span>
            <span className="font-medium text-gray-500">/</span>
            <span className="font-medium text-slate-900">
              {currentDateLabel}
            </span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium leading-4 text-slate-900 shadow-sm">
            <ShieldCheckIcon className="h-3.5 w-3.5 text-indigo-700" />
            {studentProfile.email}
          </span>
        </div>
      </header>

      <section aria-label="Submission statistics">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const tone = statToneClasses[stat.tone];

            return (
              <article
                key={stat.label}
                className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-inset ring-slate-300/30"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`flex h-12 w-10 shrink-0 items-center justify-center rounded-xl ${tone.icon}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 pr-1">
                    <p className="text-xs font-semibold uppercase leading-4 tracking-wide text-gray-500">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-semibold leading-9 text-slate-900 sm:text-3xl sm:leading-10">
                      {stat.value}
                    </p>
                  </div>
                </div>
                <span
                  className={`shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-center text-xs font-semibold leading-4 tracking-tight ${tone.badge}`}
                >
                  {stat.badge}
                </span>
              </article>
            );
          })}
        </div>
      </section>

      <article
        id="latest-submission"
        className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-inset ring-slate-300/30 sm:p-6 lg:p-8"
      >
        <div className="flex flex-col justify-between gap-5 border-b border-sky-100 pb-5 xl:flex-row xl:items-start">
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2 pb-1">
              <span className="rounded-full bg-indigo-600 px-2.5 py-0.5 font-mono text-xs font-semibold leading-4 tracking-tight text-white">
                Latest Submission
              </span>
              <span className="rounded-md bg-sky-100 px-2 py-0.5 font-mono text-xs font-semibold leading-4 tracking-tight text-gray-500">
                {submission.version}
              </span>
              <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-semibold leading-4 tracking-tight text-slate-900">
                Active Milestone
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-200 px-3 py-1 text-xs font-semibold leading-4 tracking-tight text-violet-700">
                <span
                  className="h-2 w-2 rounded-full bg-violet-700"
                  aria-hidden="true"
                />
                {submission.status}
              </span>
            </div>
            <h2 className="font-serif text-2xl font-semibold leading-9 tracking-tight text-slate-900 sm:text-3xl sm:leading-10">
              {submission.title}
            </h2>
            <p className="max-w-2xl text-pretty text-sm leading-5 text-gray-700">
              {submission.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/submissions"
              className="inline-flex items-center gap-1 rounded-lg bg-sky-100 px-3 py-2.5 text-sm font-medium leading-5 text-slate-900 transition-colors hover:bg-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
            >
              <ExternalLinkIcon className="h-3.5 w-3.5" />
              Live Preview
            </Link>
            <Link
              href="/submissions"
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-medium leading-5 text-white shadow-md shadow-indigo-500/20 transition-colors hover:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
            >
              View Submission Details
              <ArrowRightIcon className="h-3 w-3" />
            </Link>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 rounded-xl bg-blue-50 px-4 py-5 sm:grid-cols-2 xl:grid-cols-4">
          <MetaField label="Submitted on">
            <p className="text-sm font-semibold leading-5 text-slate-900">
              {submission.submittedOn.date}
            </p>
            <p className="text-xs leading-4 text-gray-700">
              {submission.submittedOn.meta}
            </p>
          </MetaField>

          <MetaField label="Estimated decision">
            <p className="text-sm font-semibold leading-5 text-slate-900">
              {submission.estimatedDecision.date}
            </p>
            <p className="text-xs font-medium leading-4 text-indigo-700">
              {submission.estimatedDecision.meta}
            </p>
          </MetaField>

          <MetaField label="Assigned reviewer">
            <p className="flex items-center gap-1 text-sm font-semibold leading-5 text-slate-900">
              <GraduationCapIcon className="h-3.5 w-3.5 shrink-0 text-violet-700" />
              {submission.reviewer.name}
            </p>
            <p className="text-xs leading-4 text-gray-700">
              {submission.reviewer.role}
            </p>
          </MetaField>

          <MetaField label="Automated checks">
            <p className="flex items-center gap-1 text-sm font-semibold leading-5 text-slate-900">
              <CheckCircleIcon className="h-3.5 w-3.5 text-emerald-600" />
              {submission.checks.passed}
            </p>
            <div className="flex flex-wrap items-center gap-1.5 text-xs leading-4">
              <Link
                href="/submissions"
                className="inline-flex items-center gap-1 rounded-sm text-indigo-700 transition-colors hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              >
                <CodeIcon className="h-3 w-3" />
                GitHub Repo
              </Link>
              <span className="text-gray-500" aria-hidden="true">
                •
              </span>
              <Link
                href="/submissions"
                className="inline-flex items-center gap-1 rounded-sm text-indigo-700 transition-colors hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              >
                Preview URL
                <ExternalLinkIcon className="h-3 w-3" />
              </Link>
            </div>
          </MetaField>
        </div>

        <section aria-labelledby="progress-heading" className="mt-5">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
            <h3
              id="progress-heading"
              className="text-xs font-semibold uppercase leading-4 tracking-wide text-gray-500"
            >
              Review lifecycle progress
            </h3>
            <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-semibold leading-4 tracking-tight text-gray-700">
              Step 2 of 3
            </span>
          </div>
          <LifecycleSteps />
        </section>
      </article>

      <section
        aria-labelledby="lifecycle-heading"
        className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-inset ring-slate-200/70"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-indigo-700">
              <ActivityIcon className="h-4 w-4" />
            </span>
            <h2
              id="lifecycle-heading"
              className="font-serif text-base font-semibold leading-6 tracking-tight text-slate-900"
            >
              Review Lifecycle
            </h2>
          </div>
          <span className="rounded-full bg-sky-100 px-2 py-1 text-xs font-semibold leading-4 tracking-tight text-gray-700">
            Step 2 of 3
          </span>
        </div>

        <div className="pt-4">
          <LifecycleSteps />
        </div>
      </section>
    </div>
  );
}

function MetaField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="pb-0.5 text-xs font-semibold uppercase leading-4 tracking-wide text-gray-500">
        {label}
      </p>
      {children}
    </div>
  );
}

function LifecycleSteps() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {lifecycleSteps.map((step) => {
        const Icon = step.icon;
        const tone = lifecycleToneClasses[step.tone];

        return (
          <article
            key={step.number}
            className={`flex flex-col gap-1 rounded-xl p-3 ${tone.card}`}
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full ${tone.icon}`}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold leading-4 tracking-tight ${tone.badge}`}
              >
                {step.status}
              </span>
            </div>
            <h4 className="pt-1 text-base font-semibold leading-6 text-slate-900">
              {step.number}. {step.title}
            </h4>
            <p className="text-pretty text-xs font-normal leading-4 text-gray-700">
              {step.description}
            </p>
            <p
              className={`pt-1 text-xs font-normal leading-4 ${tone.meta}`}
            >
              {step.meta}
            </p>
          </article>
        );
      })}
    </div>
  );
}
