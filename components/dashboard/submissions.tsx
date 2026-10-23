"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  CloseIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GithubIcon,
  GlobeIcon,
  LayersIcon,
  PencilIcon,
  PlusIcon,
  RefreshIcon,
  SearchIcon,
  UserIcon,
} from "@/components/dashboard/icons";
import { projectApi } from "@/lib/api";
import type { Project, ProjectStatus, UpdateProjectPayload } from "@/types/api";

type StatusFilter = "ALL" | ProjectStatus;

const statusDisplay: Record<
  ProjectStatus,
  { label: string; badge: string; dot: string; detail: string }
> = {
  PENDING: {
    label: "Pending Review",
    badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    dot: "bg-amber-500",
    detail: "Waiting for mentor review",
  },
  IN_PROGRESS: {
    label: "In Progress",
    badge: "bg-blue-50 text-indigo-700 ring-1 ring-indigo-200",
    dot: "bg-indigo-600",
    detail: "Mentor is actively reviewing",
  },
  APPROVED: {
    label: "Approved",
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    dot: "bg-emerald-600",
    detail: "Review criteria satisfied",
  },
  REJECTED: {
    label: "Rejected",
    badge: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
    dot: "bg-rose-600",
    detail: "Revisions needed per feedback",
  },
};

export function Submissions() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [page, setPage] = useState(1);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [viewingProject, setViewingProject] = useState<Project | null>(null);
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
    queryKey: ["student-projects", { searchTerm, statusFilter, page }],
    queryFn: () =>
      projectApi.getProjects({
        searchTerm: searchTerm.trim() || undefined,
        status: statusFilter === "ALL" ? undefined : statusFilter,
        page,
        limit: 10,
      }),
  });

  const projects = data?.data || [];
  const meta = data?.meta;
  const total = meta?.total || 0;
  const limit = meta?.limit || 10;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  // Quick stats derived from projects
  const pendingCount = projects.filter((p) => p.status === "PENDING").length;
  const approvedCount = projects.filter((p) => p.status === "APPROVED").length;
  const inProgressCount = projects.filter((p) => p.status === "IN_PROGRESS").length;

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold leading-9 text-slate-900 sm:text-3xl">
            My Project Submissions
          </h1>
          <p className="pt-1 text-sm text-gray-600">
            Track evaluation status, feedback, and links for your capstone projects.
          </p>
        </div>
        <Link
          href="/submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
        >
          <PlusIcon className="h-4 w-4" />
          Submit New Project
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-inset ring-slate-200/60">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
              <LayersIcon className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Total
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

      {/* Projects Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-inset ring-slate-200/60">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <RefreshIcon className="h-5 w-5 animate-spin text-indigo-600" />
              Loading submissions...
            </div>
          </div>
        ) : isError ? (
          <div className="flex h-64 flex-col items-center justify-center gap-2 p-6 text-center">
            <AlertTriangleIcon className="h-8 w-8 text-rose-500" />
            <p className="text-sm font-semibold text-slate-900">
              Failed to load projects
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
            <div>
              <p className="text-base font-semibold text-slate-900">
                No submissions found
              </p>
              <p className="pt-1 text-xs text-gray-500">
                {searchTerm || statusFilter !== "ALL"
                  ? "Try resetting your search filters."
                  : "You haven't submitted any projects yet."}
              </p>
            </div>
            <Link
              href="/submit"
              className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-indigo-700 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-800"
            >
              <PlusIcon className="h-3.5 w-3.5" />
              Submit Your First Project
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200/80 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-5 py-3.5">Project</th>
                  <th className="px-5 py-3.5">Links</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Reviewer / Feedback</th>
                  <th className="px-5 py-3.5">Submitted</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((project) => {
                  const statusInfo = statusDisplay[project.status];
                  const canEdit = project.status === "PENDING";
                  const submittedDate = new Date(project.createdAt).toLocaleDateString(
                    undefined,
                    { year: "numeric", month: "short", day: "numeric" }
                  );

                  return (
                    <tr
                      key={project.id}
                      className="transition-colors hover:bg-slate-50/70"
                    >
                      {/* Project info */}
                      <td className="max-w-xs px-5 py-4">
                        <p className="font-semibold text-slate-900 truncate">
                          {project.name}
                        </p>
                        <p className="line-clamp-2 pt-0.5 text-xs text-gray-500">
                          {project.description}
                        </p>
                      </td>

                      {/* Git and Preview links */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex flex-col gap-1 text-xs">
                          <a
                            href={project.gitRepoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 hover:underline"
                          >
                            <GithubIcon className="h-3.5 w-3.5 shrink-0 text-slate-800" />
                            <span className="truncate max-w-[150px]">Repository</span>
                            <ExternalLinkIcon className="h-2.5 w-2.5" />
                          </a>
                          <a
                            href={project.previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 hover:underline"
                          >
                            <GlobeIcon className="h-3.5 w-3.5 shrink-0 text-gray-500" />
                            <span className="truncate max-w-[150px]">Live Preview</span>
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

                      {/* Reviewer / Feedback */}
                      <td className="max-w-[200px] px-5 py-4">
                        {project.reviewer ? (
                          <div className="text-xs">
                            <p className="font-medium text-slate-900">
                              {project.reviewer.fullName}
                            </p>
                            {project.reviewerFeedBack ? (
                              <button
                                type="button"
                                onClick={() => setViewingProject(project)}
                                className="mt-0.5 line-clamp-1 text-left text-indigo-600 hover:underline"
                              >
                                &ldquo;{project.reviewerFeedBack}&rdquo;
                              </button>
                            ) : (
                              <span className="text-gray-400">Review pending</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">
                            Awaiting mentor
                          </span>
                        )}
                      </td>

                      {/* Submitted Date */}
                      <td className="whitespace-nowrap px-5 py-4 text-xs text-gray-500">
                        {submittedDate}
                      </td>

                      {/* Actions */}
                      <td className="whitespace-nowrap px-5 py-4 text-right">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setViewingProject(project)}
                            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
                          >
                            Details
                          </button>
                          {canEdit ? (
                            <button
                              type="button"
                              onClick={() => setEditingProject(project)}
                              className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-2.5 py-1.5 text-xs font-medium text-indigo-700 transition-colors hover:bg-indigo-100"
                            >
                              <PencilIcon className="h-3 w-3" />
                              Edit
                            </button>
                          ) : (
                            <span
                              title="Editing disabled once review has started"
                              className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-gray-400 cursor-not-allowed"
                            >
                              Locked
                            </span>
                          )}
                        </div>
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

      {/* Edit Project Modal (Allowed only when PENDING) */}
      {editingProject && (
        <EditProjectModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSuccess={() => {
            setEditingProject(null);
            queryClient.invalidateQueries({ queryKey: ["student-projects"] });
          }}
        />
      )}

      {/* View Project Details Modal */}
      {viewingProject && (
        <ViewProjectModal
          project={viewingProject}
          onClose={() => setViewingProject(null)}
        />
      )}
    </div>
  );
}

function EditProjectModal({
  project,
  onClose,
  onSuccess,
}: {
  project: Project;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState(project.name);
  const [gitRepoUrl, setGitRepoUrl] = useState(project.gitRepoUrl);
  const [previewUrl, setPreviewUrl] = useState(project.previewUrl);
  const [description, setDescription] = useState(project.description);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload: UpdateProjectPayload = {
      name: name.trim(),
      gitRepoUrl: gitRepoUrl.trim(),
      previewUrl: previewUrl.trim(),
      description: description.trim(),
    };

    try {
      await projectApi.updateProject(project.id, payload);
      onSuccess();
    } catch (err: unknown) {
      let msg = "Failed to update project. Projects can only be edited while PENDING.";
      if (axios.isAxiosError(err) && err.response?.data) {
        const data = err.response.data as { message?: string };
        msg = data.message || msg;
      }
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Edit Project
            </h3>
            <p className="text-xs text-gray-500">
              Only allowed while the project status is Pending Review.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-rose-50 p-3 text-xs font-medium text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-900">
              Project Name
            </label>
            <input
              type="text"
              required
              minLength={1}
              maxLength={200}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-900">
              Git Repository URL
            </label>
            <input
              type="url"
              required
              maxLength={500}
              value={gitRepoUrl}
              onChange={(e) => setGitRepoUrl(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-900">
              Live Preview URL
            </label>
            <input
              type="url"
              required
              maxLength={500}
              value={previewUrl}
              onChange={(e) => setPreviewUrl(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-900">
              Description
            </label>
            <textarea
              required
              minLength={1}
              maxLength={5000}
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-indigo-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 disabled:opacity-50"
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ViewProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const statusInfo = statusDisplay[project.status];
  const submittedDate = new Date(project.createdAt).toLocaleString();
  const updatedDate = new Date(project.updatedAt).toLocaleString();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusInfo.badge}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${statusInfo.dot}`}
                aria-hidden="true"
              />
              {statusInfo.label}
            </span>
            <h3 className="mt-2 text-xl font-bold text-slate-900">
              {project.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-4 text-sm">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Description
            </h4>
            <p className="mt-1 whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-slate-800 text-xs leading-5">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-slate-200 p-3">
              <span className="text-xs font-semibold text-gray-500">Repository</span>
              <a
                href={project.gitRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center gap-1 text-xs font-medium text-indigo-600 hover:underline"
              >
                <GithubIcon className="h-3.5 w-3.5 text-slate-800" />
                Open Code
                <ExternalLinkIcon className="h-2.5 w-2.5" />
              </a>
            </div>

            <div className="rounded-lg border border-slate-200 p-3">
              <span className="text-xs font-semibold text-gray-500">Live Preview</span>
              <a
                href={project.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center gap-1 text-xs font-medium text-indigo-600 hover:underline"
              >
                <GlobeIcon className="h-3.5 w-3.5 text-gray-600" />
                Open Site
                <ExternalLinkIcon className="h-2.5 w-2.5" />
              </a>
            </div>
          </div>

          {project.reviewer && (
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
              <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-indigo-700" />
                <span className="text-xs font-bold text-slate-900">
                  Mentor Review by {project.reviewer.fullName}
                </span>
                <span className="text-[11px] text-gray-500">
                  ({project.reviewer.email})
                </span>
              </div>
              {project.reviewerFeedBack ? (
                <p className="mt-2 text-xs leading-5 text-slate-800 bg-white p-3 rounded-lg border border-indigo-100">
                  {project.reviewerFeedBack}
                </p>
              ) : (
                <p className="mt-1 text-xs italic text-gray-500">
                  No written comments left yet.
                </p>
              )}
            </div>
          )}

          <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-gray-500">
            <span>Submitted: {submittedDate}</span>
            <span>Updated: {updatedDate}</span>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
