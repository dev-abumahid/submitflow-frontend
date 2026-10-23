"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  FileTextIcon,
  GithubIcon,
  GlobeIcon,
  LayersIcon,
  PencilIcon,
  RefreshIcon,
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

export function MentorDashboard() {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<"ALL" | ProjectStatus>("ALL");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["mentor-dashboard-projects", statusFilter],
    queryFn: () =>
      projectApi.getProjects({
        status: statusFilter === "ALL" ? undefined : statusFilter,
        limit: 10,
        sortOrder: "desc",
      }),
  });

  const projects = data?.data || [];
  const total = data?.meta?.total ?? projects.length;

  const pendingCount = projects.filter((p) => p.status === "PENDING").length;
  const inProgressCount = projects.filter((p) => p.status === "IN_PROGRESS").length;
  const approvedCount = projects.filter((p) => p.status === "APPROVED").length;

  const mentorName = user?.fullName || "Lead Mentor";

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back, {mentorName}!
          </h1>
          <p className="pt-1 text-sm text-gray-600">
            Monitor incoming project submissions, evaluate code quality, and provide student reviews.
          </p>
        </div>
        <Link
          href="/mentor/reviews"
          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-700 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-800"
        >
          View All Submissions
          <ArrowRightIcon className="h-3 w-3" />
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-inset ring-slate-200/60">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
              <LayersIcon className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Total Submissions
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">{total}</p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-inset ring-slate-200/60">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <ClockIcon className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Pending Audit
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-amber-600">{pendingCount}</p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-inset ring-slate-200/60">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-indigo-700">
              <RefreshIcon className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              In Review
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-indigo-700">{inProgressCount}</p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-inset ring-slate-200/60">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
              <CheckCircleIcon className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Approved
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-700">{approvedCount}</p>
        </div>
      </div>

      {/* Recent Submissions Queue */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-inset ring-slate-200/60">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-base font-semibold text-slate-900">
              Recent Submissions Queue
            </h2>
            <p className="text-xs text-gray-500">
              Direct access to submissions needing mentor review.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs font-medium">
              {(["ALL", "PENDING", "IN_PROGRESS", "APPROVED"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setStatusFilter(tab)}
                  className={`rounded-md px-3 py-1 transition-colors ${
                    statusFilter === tab
                      ? "bg-white text-indigo-700 shadow-xs font-semibold"
                      : "text-gray-600 hover:text-slate-900"
                  }`}
                >
                  {tab === "ALL" ? "All" : tab === "PENDING" ? "Pending" : tab === "IN_PROGRESS" ? "In Progress" : "Approved"}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-lg border border-slate-200 p-1.5 text-gray-500 hover:bg-slate-50"
            >
              <RefreshIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <RefreshIcon className="h-5 w-5 animate-spin text-indigo-600" />
              Loading submissions...
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center gap-2 p-6 text-center">
            <FileTextIcon className="h-8 w-8 text-gray-300" />
            <p className="text-sm font-semibold text-slate-900">
              No projects in this category
            </p>
            <p className="text-xs text-gray-500">
              All submissions in this filter status have been cleared.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-5 py-3">Student</th>
                  <th className="px-5 py-3">Project</th>
                  <th className="px-5 py-3">Links</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Submitted</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((project) => {
                  const statusInfo = statusDisplay[project.status];
                  const submittedDate = new Date(project.createdAt).toLocaleDateString(
                    undefined,
                    { month: "short", day: "numeric" }
                  );

                  return (
                    <tr
                      key={project.id}
                      className="transition-colors hover:bg-slate-50/70"
                    >
                      <td className="whitespace-nowrap px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                            {project.submitter?.fullName?.[0]?.toUpperCase() || "S"}
                          </span>
                          <div>
                            <p className="font-semibold text-slate-900 text-xs">
                              {project.submitter?.fullName || "Student"}
                            </p>
                            <p className="text-[11px] text-gray-500">
                              {project.submitter?.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="max-w-xs px-5 py-3.5">
                        <p className="font-semibold text-slate-900 truncate">
                          {project.name}
                        </p>
                        <p className="line-clamp-1 text-xs text-gray-500">
                          {project.description}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-5 py-3.5 text-xs">
                        <div className="flex items-center gap-3">
                          <a
                            href={project.gitRepoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-indigo-600 hover:underline"
                          >
                            <GithubIcon className="h-3 w-3 text-slate-800" />
                            Git
                          </a>
                          <a
                            href={project.previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-indigo-600 hover:underline"
                          >
                            <GlobeIcon className="h-3 w-3 text-gray-500" />
                            Live
                          </a>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-5 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${statusInfo.badge}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${statusInfo.dot}`}
                            aria-hidden="true"
                          />
                          {statusInfo.label}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-3.5 text-xs text-gray-500">
                        {submittedDate}
                      </td>

                      <td className="whitespace-nowrap px-5 py-3.5 text-right">
                        <Link
                          href={`/mentor/reviews/${project.id}`}
                          className="inline-flex items-center gap-1 rounded-lg bg-indigo-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-800"
                        >
                          <PencilIcon className="h-3 w-3" />
                          Review
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
