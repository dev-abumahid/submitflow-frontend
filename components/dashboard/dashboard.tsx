"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  ExternalLinkIcon,
  GithubIcon,
  GlobeIcon,
  LayersIcon,
  PlusIcon,
  RefreshIcon,
  ShieldCheckIcon,
} from "@/components/dashboard/icons";
import { useAuth } from "@/context/auth-context";
import { projectApi } from "@/lib/api";
import type { ProjectStatus } from "@/types/api";

const statusDisplay: Record<
  ProjectStatus,
  { label: string; badge: string; dot: string }
> = {
  PENDING: {
    label: "Pending Review",
    badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    dot: "bg-amber-500",
  },
  IN_PROGRESS: {
    label: "In Progress",
    badge: "bg-blue-50 text-indigo-700 ring-1 ring-indigo-200",
    dot: "bg-indigo-600",
  },
  APPROVED: {
    label: "Approved",
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    dot: "bg-emerald-600",
  },
  REJECTED: {
    label: "Rejected",
    badge: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
    dot: "bg-rose-600",
  },
};

export function Dashboard() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["student-dashboard-projects"],
    queryFn: () => projectApi.getProjects({ limit: 10 }),
  });

  const projects = data?.data || [];
  const total = data?.meta?.total ?? projects.length;

  const pendingCount = projects.filter((p) => p.status === "PENDING").length;
  const inProgressCount = projects.filter((p) => p.status === "IN_PROGRESS").length;
  const approvedCount = projects.filter((p) => p.status === "APPROVED").length;
  const latestProject = projects[0];

  const firstName = user?.fullName ? user.fullName.split(" ")[0] : "Student";

  return (
    <div className="relative isolate flex flex-col gap-8">
      {/* Background blurs */}
      <div
        className="pointer-events-none absolute -top-20 left-1/4 -z-10 h-72 w-72 rounded-full bg-indigo-600/10 blur-[32px] sm:h-96 sm:w-96"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-1/4 top-48 -z-10 h-64 w-64 rounded-full bg-violet-500/5 blur-[20px] sm:h-80 sm:w-80"
        aria-hidden="true"
      />

      {/* Header */}
      <header className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <h1 className="font-serif text-2xl font-semibold leading-9 tracking-tight text-slate-900 sm:text-3xl sm:leading-10">
              Welcome back, {firstName}!
            </h1>
            <span className="text-2xl leading-8" role="img" aria-label="Waving hand">
              👋
            </span>
          </div>
          <p className="text-pretty text-sm leading-6 text-gray-700">
            Track your project submissions and real-time mentor evaluation progress.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-slate-900 shadow-sm">
            <ShieldCheckIcon className="h-3.5 w-3.5 text-indigo-700" />
            {user?.email || "Student Account"}
          </span>
          <Link
            href="/submit"
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-700 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-800"
          >
            <PlusIcon className="h-3.5 w-3.5" />
            Submit Project
          </Link>
        </div>
      </header>

      {/* Stats Cards */}
      <section aria-label="Submission statistics">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="flex items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-inset ring-slate-300/30">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-700">
                <LayersIcon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Total Submissions
                </p>
                <p className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                  {total}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-inset ring-slate-300/30">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                <ClockIcon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Pending Review
                </p>
                <p className="text-2xl font-semibold text-amber-600 sm:text-3xl">
                  {pendingCount}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-inset ring-slate-300/30">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-indigo-700">
                <RefreshIcon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  In Review
                </p>
                <p className="text-2xl font-semibold text-indigo-700 sm:text-3xl">
                  {inProgressCount}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-inset ring-slate-300/30">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <CheckCircleIcon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Approved
                </p>
                <p className="text-2xl font-semibold text-emerald-700 sm:text-3xl">
                  {approvedCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Submission Card */}
      <section aria-label="Latest project status">
        {isLoading ? (
          <div className="flex h-48 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200/60">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <RefreshIcon className="h-4 w-4 animate-spin text-indigo-600" />
              Loading latest activity...
            </div>
          </div>
        ) : latestProject ? (
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-inset ring-slate-200/60">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  Latest Active Submission
                </span>
                <h2 className="mt-1 font-serif text-xl font-bold text-slate-900">
                  {latestProject.name}
                </h2>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  statusDisplay[latestProject.status].badge
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    statusDisplay[latestProject.status].dot
                  }`}
                  aria-hidden="true"
                />
                {statusDisplay[latestProject.status].label}
              </span>
            </div>

            <p className="mt-3 text-sm text-gray-600 line-clamp-3">
              {latestProject.description}
            </p>

            {/* Links and Feedback */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4 text-xs">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={latestProject.gitRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-indigo-600 hover:underline"
                >
                  <GithubIcon className="h-3.5 w-3.5 text-slate-800" />
                  Repository
                  <ExternalLinkIcon className="h-2.5 w-2.5" />
                </a>
                <a
                  href={latestProject.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-indigo-600 hover:underline"
                >
                  <GlobeIcon className="h-3.5 w-3.5 text-gray-500" />
                  Live Preview
                  <ExternalLinkIcon className="h-2.5 w-2.5" />
                </a>
              </div>

              <Link
                href="/submissions"
                className="inline-flex items-center gap-1 font-semibold text-indigo-700 hover:text-indigo-900"
              >
                View all submissions
                <ArrowRightIcon className="h-3 w-3" />
              </Link>
            </div>

            {latestProject.reviewerFeedBack && (
              <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 text-xs">
                <span className="font-semibold text-slate-900">
                  Mentor Feedback from {latestProject.reviewer?.fullName || "Reviewer"}:
                </span>
                <p className="mt-1 text-slate-700 italic">
                  &ldquo;{latestProject.reviewerFeedBack}&rdquo;
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white p-8 text-center ring-1 ring-inset ring-slate-200/60">
            <LayersIcon className="h-10 w-10 text-gray-300" />
            <h3 className="text-base font-semibold text-slate-900">
              No Projects Submitted Yet
            </h3>
            <p className="max-w-md text-xs text-gray-500">
              Ready to submit your capstone milestone? Enter your Git repository and live preview link to get started.
            </p>
            <Link
              href="/submit"
              className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-indigo-700 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-800"
            >
              <PlusIcon className="h-3.5 w-3.5" />
              Submit Project Now
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
