"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  AlertTriangleIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ClockIcon,
  ExternalLinkIcon,
  GithubIcon,
  GlobeIcon,
  RefreshIcon,
  UserIcon,
  XCircleIcon,
} from "@/components/dashboard/icons";
import { projectApi } from "@/lib/api";
import type { ProjectStatus, ReviewProjectPayload } from "@/types/api";

type ReviewVerdict = "IN_PROGRESS" | "APPROVED" | "REJECTED";

const statusDisplay: Record<
  ProjectStatus,
  { label: string; badge: string; dot: string; desc: string }
> = {
  PENDING: {
    label: "Pending Review",
    badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    dot: "bg-amber-500",
    desc: "Awaiting mentor evaluation",
  },
  IN_PROGRESS: {
    label: "In Progress",
    badge: "bg-blue-50 text-indigo-700 ring-1 ring-indigo-200",
    dot: "bg-indigo-600",
    desc: "Review currently underway",
  },
  APPROVED: {
    label: "Approved",
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    dot: "bg-emerald-600",
    desc: "All requirements met",
  },
  REJECTED: {
    label: "Rejected",
    badge: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
    dot: "bg-rose-600",
    desc: "Changes requested before approval",
  },
};

export function MentorProjectDetails({ projectId }: { projectId: string }) {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<ReviewVerdict>("APPROVED");
  const [feedback, setFeedback] = useState("");
  const [feedbackInitialized, setFeedbackInitialized] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["project-detail", projectId],
    queryFn: async () => {
      const res = await projectApi.getProject(projectId);
      return res.data;
    },
  });

  const project = data;

  // Initialize feedback and status from fetched project once
  if (project && !feedbackInitialized) {
    if (project.reviewerFeedBack) {
      setFeedback(project.reviewerFeedBack);
    }
    if (project.status === "APPROVED" || project.status === "REJECTED" || project.status === "IN_PROGRESS") {
      setSelectedStatus(project.status as ReviewVerdict);
    }
    setFeedbackInitialized(true);
  }

  const reviewMutation = useMutation({
    mutationFn: (payload: ReviewProjectPayload) =>
      projectApi.reviewProject(projectId, payload),
    onSuccess: (res) => {
      setSubmitSuccess("Review submitted successfully!");
      setSubmitError(null);
      queryClient.setQueryData(["project-detail", projectId], res.data);
      queryClient.invalidateQueries({ queryKey: ["mentor-projects"] });
    },
    onError: (err: unknown) => {
      let msg = "Failed to submit review. Please try again.";
      if (axios.isAxiosError(err) && err.response?.data) {
        const data = err.response.data as { message?: string };
        msg = data.message || msg;
      }
      setSubmitError(msg);
      setSubmitSuccess(null);
    },
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    const payload: ReviewProjectPayload = {
      status: selectedStatus,
      reviewerFeedBack: feedback.trim() ? feedback.trim() : undefined,
    };

    reviewMutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <RefreshIcon className="h-5 w-5 animate-spin text-indigo-600" />
          Loading project details...
        </div>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-3 text-center">
        <AlertTriangleIcon className="h-10 w-10 text-rose-500" />
        <h2 className="text-xl font-bold text-slate-900">Project Not Found</h2>
        <p className="max-w-md text-sm text-gray-500">
          We could not locate this project submission. It may have been removed or you may not have permission to view it.
        </p>
        <Link
          href="/mentor/reviews"
          className="mt-2 inline-flex items-center gap-2 rounded-lg bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Back to All Reviews
        </Link>
      </div>
    );
  }

  const currentStatusInfo = statusDisplay[project.status];
  const submittedDate = new Date(project.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/mentor/reviews"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900"
        >
          <ChevronLeftIcon className="h-3.5 w-3.5" />
          Back to Project Reviews
        </Link>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${currentStatusInfo.badge}`}
        >
          <span
            className={`h-2 w-2 rounded-full ${currentStatusInfo.dot}`}
            aria-hidden="true"
          />
          {currentStatusInfo.label}
        </span>
      </div>

      {/* Main Project Header Card */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-inset ring-slate-200/60">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {project.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1.5">
                <UserIcon className="h-3.5 w-3.5 text-gray-400" />
                <span>
                  Submitted by{" "}
                  <strong className="text-slate-900">
                    {project.submitter?.fullName || "Student"}
                  </strong>{" "}
                  ({project.submitter?.email})
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <ClockIcon className="h-3.5 w-3.5 text-gray-400" />
                <span>{submittedDate}</span>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={project.gitRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-sm transition-colors hover:bg-slate-50"
            >
              <GithubIcon className="h-4 w-4" />
              Repository
              <ExternalLinkIcon className="h-3 w-3 text-gray-400" />
            </a>
            <a
              href={project.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-700 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-indigo-800"
            >
              <GlobeIcon className="h-4 w-4" />
              Live Deployment
              <ExternalLinkIcon className="h-3 w-3 text-indigo-200" />
            </a>
          </div>
        </div>

        {/* Project Description */}
        <div className="mt-6 border-t border-slate-100 pt-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Project Description
          </h2>
          <div className="mt-2 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-800">
            {project.description}
          </div>
        </div>

        {/* Existing Review Info if available */}
        {project.reviewer && (
          <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900">
                Current Review Status: {project.status}
              </span>
              <span className="text-gray-500">
                Reviewed by {project.reviewer.fullName} ({project.reviewer.email})
              </span>
            </div>
            {project.reviewerFeedBack && (
              <p className="mt-2 bg-white p-3 rounded-lg border border-indigo-100 text-slate-800 leading-relaxed">
                {project.reviewerFeedBack}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Mentor Evaluation Form */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-inset ring-slate-200/60">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="font-serif text-lg font-semibold text-slate-900">
            Mentor Decision &amp; Feedback
          </h2>
          <p className="pt-0.5 text-xs text-gray-500">
            Set the official project milestone status and write structured feedback for the student.
          </p>
        </div>

        {submitError && (
          <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700">
            {submitError}
          </div>
        )}

        {submitSuccess && (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-medium text-emerald-700">
            {submitSuccess}
          </div>
        )}

        <form onSubmit={handleReviewSubmit} className="mt-5 flex flex-col gap-6">
          {/* Status Options */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Decision Status <span className="text-red-600">*</span>
            </label>
            <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {/* In Progress */}
              <button
                type="button"
                onClick={() => setSelectedStatus("IN_PROGRESS")}
                className={`flex flex-col items-start rounded-xl p-3.5 text-left border-2 transition-all ${
                  selectedStatus === "IN_PROGRESS"
                    ? "border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-600" />
                  <span className="text-sm font-bold text-slate-900">In Progress</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Audit currently underway; student cannot edit code.
                </p>
              </button>

              {/* Approved */}
              <button
                type="button"
                onClick={() => setSelectedStatus("APPROVED")}
                className={`flex flex-col items-start rounded-xl p-3.5 text-left border-2 transition-all ${
                  selectedStatus === "APPROVED"
                    ? "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-bold text-slate-900">Approved</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Accept submission and grant milestone completion.
                </p>
              </button>

              {/* Rejected */}
              <button
                type="button"
                onClick={() => setSelectedStatus("REJECTED")}
                className={`flex flex-col items-start rounded-xl p-3.5 text-left border-2 transition-all ${
                  selectedStatus === "REJECTED"
                    ? "border-rose-600 bg-rose-50/60 ring-2 ring-rose-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <XCircleIcon className="h-4 w-4 text-rose-600" />
                  <span className="text-sm font-bold text-slate-900">Rejected</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Decline submission; require corrections per notes below.
                </p>
              </button>
            </div>
          </div>

          {/* Feedback Field */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="feedback"
                className="text-xs font-semibold uppercase tracking-wider text-slate-900"
              >
                Reviewer Feedback Notes
              </label>
              <span className="text-xs text-gray-500">
                {feedback.length} / 5000 chars
              </span>
            </div>
            <textarea
              id="feedback"
              name="reviewerFeedBack"
              rows={6}
              maxLength={5000}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide constructive feedback, commendations, or specific revision requests..."
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3.5 text-sm leading-6 text-slate-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
            <Link
              href="/mentor/reviews"
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={reviewMutation.isPending}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-700 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-800 disabled:opacity-50"
            >
              {reviewMutation.isPending ? "Submitting Decision..." : "Submit Review Decision"}
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
