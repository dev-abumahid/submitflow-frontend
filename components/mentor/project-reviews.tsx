"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GithubIcon,
  GlobeIcon,
  LayersIcon,
  PencilIcon,
  RefreshIcon,
  SearchIcon,
} from "@/components/dashboard/icons";
import { projectApi } from "@/lib/api";
import type { ProjectStatus } from "@/types/api";

type StatusFilter = "ALL" | ProjectStatus;

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

export function ProjectReviews() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [page, setPage] = useState(1);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["mentor-projects", { searchTerm, statusFilter, page, sortOrder }],
    queryFn: () =>
      projectApi.getProjects({
        searchTerm: searchTerm.trim() || undefined,
        status: statusFilter === "ALL" ? undefined : statusFilter,
        sortOrder,
        page,
        limit: 10,
      }),
  });

  const projects = data?.data || [];
  const meta = data?.meta;
  const total = meta?.total || 0;
  const limit = meta?.limit || 10;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const pendingCount = projects.filter((p) => p.status === "PENDING").length;
  const inProgressCount = projects.filter((p) => p.status === "IN_PROGRESS").length;
  const approvedCount = projects.filter((p) => p.status === "APPROVED").length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-2xl font-semibold leading-9 text-slate-900 sm:text-3xl">
          Student Project Reviews
        </h1>
        <p className="text-sm text-gray-600">
          Review, evaluate, and provide qualitative feedback on all student
          project submissions.
        </p>
      </div>

      {/* Summary Cards */}
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
              Pending
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

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-inset ring-slate-200/60 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            ref={searchRef}
            type="text"
            placeholder="Search projects by name... (Cmd+K)"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="text-xs font-medium text-gray-600">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as StatusFilter);
              setPage(1);
            }}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <label className="text-xs font-medium text-gray-600">Sort:</label>
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value as "desc" | "asc");
              setPage(1);
            }}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>

          <button
            type="button"
            onClick={() => refetch()}
            aria-label="Refresh projects"
            className="rounded-lg border border-slate-200 bg-white p-2 text-gray-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <RefreshIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-inset ring-slate-200/60">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <RefreshIcon className="h-5 w-5 animate-spin text-indigo-600" />
              Loading student submissions...
            </div>
          </div>
        ) : isError ? (
          <div className="flex h-64 flex-col items-center justify-center gap-2 p-6 text-center">
            <AlertTriangleIcon className="h-8 w-8 text-rose-500" />
            <p className="text-sm font-semibold text-slate-900">
              Failed to load reviews
            </p>
            <p className="text-xs text-gray-500">
              Could not retrieve submissions from the server.
            </p>
            <button
              onClick={() => refetch()}
              className="mt-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white"
            >
              Retry
            </button>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center gap-3 p-6 text-center">
            <FileTextIcon className="h-10 w-10 text-gray-300" />
            <p className="text-base font-semibold text-slate-900">
              No submissions found
            </p>
            <p className="text-xs text-gray-500">
              {searchTerm || statusFilter !== "ALL"
                ? "Try resetting your search or filter."
                : "No student has submitted a project yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200/80 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-5 py-3.5">Student</th>
                  <th className="px-5 py-3.5">Project</th>
                  <th className="px-5 py-3.5">Links</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Reviewer</th>
                  <th className="px-5 py-3.5">Submitted</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((project) => {
                  const statusInfo = statusDisplay[project.status];
                  const submittedDate = new Date(project.createdAt).toLocaleDateString(
                    undefined,
                    { year: "numeric", month: "short", day: "numeric" }
                  );

                  return (
                    <tr
                      key={project.id}
                      className="transition-colors hover:bg-slate-50/70"
                    >
                      {/* Student info */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                            {project.submitter?.fullName?.[0]?.toUpperCase() || "S"}
                          </span>
                          <div>
                            <p className="font-semibold text-slate-900 text-xs">
                              {project.submitter?.fullName || "Student"}
                            </p>
                            <p className="text-[11px] text-gray-500">
                              {project.submitter?.email || "—"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Project info */}
                      <td className="max-w-xs px-5 py-4">
                        <p className="font-semibold text-slate-900 truncate">
                          {project.name}
                        </p>
                        <p className="line-clamp-2 pt-0.5 text-xs text-gray-500">
                          {project.description}
                        </p>
                      </td>

                      {/* Links */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex flex-col gap-1 text-xs">
                          <a
                            href={project.gitRepoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 hover:underline"
                          >
                            <GithubIcon className="h-3.5 w-3.5 shrink-0 text-slate-800" />
                            <span>Repository</span>
                            <ExternalLinkIcon className="h-2.5 w-2.5" />
                          </a>
                          <a
                            href={project.previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 hover:underline"
                          >
                            <GlobeIcon className="h-3.5 w-3.5 shrink-0 text-gray-500" />
                            <span>Live Preview</span>
                            <ExternalLinkIcon className="h-2.5 w-2.5" />
                          </a>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusInfo.badge}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${statusInfo.dot}`}
                            aria-hidden="true"
                          />
                          {statusInfo.label}
                        </span>
                      </td>

                      {/* Reviewer */}
                      <td className="whitespace-nowrap px-5 py-4 text-xs text-gray-600">
                        {project.reviewer?.fullName ? (
                          <span className="font-medium text-slate-900">
                            {project.reviewer.fullName}
                          </span>
                        ) : (
                          <span className="text-gray-400">Unassigned</span>
                        )}
                      </td>

                      {/* Submitted Date */}
                      <td className="whitespace-nowrap px-5 py-4 text-xs text-gray-500">
                        {submittedDate}
                      </td>

                      {/* Action */}
                      <td className="whitespace-nowrap px-5 py-4 text-right">
                        <Link
                          href={`/mentor/reviews/${project.id}`}
                          className="inline-flex items-center gap-1 rounded-lg bg-indigo-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-indigo-800"
                        >
                          <PencilIcon className="h-3 w-3" />
                          Review Project
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {total > limit && (
          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-xs text-gray-600">
            <span>
              Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of{" "}
              {total} projects
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-md border border-slate-200 px-2.5 py-1 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-md border border-slate-200 px-2.5 py-1 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
