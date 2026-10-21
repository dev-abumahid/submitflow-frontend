"use client";

import { useEffect } from "react";
import type { ComponentType } from "react";
import {
  ArrowRightIcon,
  CloseIcon,
  CodeIcon,
  FileTextIcon,
  GridIcon,
  LayersIcon,
  type IconProps,
} from "@/components/dashboard/icons";
import {
  type Submission,
  type SubmissionStatus,
  type SubmissionTone,
} from "@/components/mentor/data";

export const toneStyles: Record<
  SubmissionTone,
  { project: string; avatar: string }
> = {
  indigo: {
    project: "bg-indigo-100 text-indigo-700",
    avatar: "bg-indigo-100 text-indigo-700",
  },
  blue: {
    project: "bg-blue-100 text-blue-700",
    avatar: "bg-blue-100 text-blue-700",
  },
  rose: {
    project: "bg-rose-100 text-red-700",
    avatar: "bg-rose-100 text-red-700",
  },
  emerald: {
    project: "bg-emerald-100 text-emerald-700",
    avatar: "bg-emerald-100 text-emerald-700",
  },
  amber: {
    project: "bg-amber-100 text-amber-700",
    avatar: "bg-amber-100 text-amber-700",
  },
  violet: {
    project: "bg-violet-100 text-violet-700",
    avatar: "bg-violet-100 text-violet-700",
  },
};

export const projectIcons: Record<
  Submission["icon"],
  ComponentType<IconProps>
> = {
  grid: GridIcon,
  code: CodeIcon,
  layers: LayersIcon,
  file: FileTextIcon,
};

const defaultStatusStyles: Record<SubmissionStatus, string> = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Approved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Rejected: "bg-rose-50 text-red-700 ring-red-600/20",
};

const queueStatusStyles: Record<SubmissionStatus, string> = {
  Pending: "bg-sky-100 text-violet-700 ring-violet-300/30",
  Approved: "bg-blue-50 text-indigo-700 ring-indigo-600/15",
  Rejected: "bg-rose-200 text-red-800 ring-red-700/15",
};

const statusDotStyles: Record<SubmissionStatus, string> = {
  Pending: "bg-violet-600",
  Approved: "bg-indigo-600",
  Rejected: "bg-red-700",
};

export function StatusBadge({
  status,
  label,
  appearance = "default",
}: {
  status: SubmissionStatus;
  label?: string;
  appearance?: "default" | "queue";
}) {
  const style =
    appearance === "queue" ? queueStatusStyles[status] : defaultStatusStyles[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium leading-4 ring-1 ring-inset ${style}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${statusDotStyles[status]}`}
        aria-hidden="true"
      />
      {label ?? status}
    </span>
  );
}

export function SubmissionDialog({
  submission,
  onClose,
}: {
  submission: Submission;
  onClose: () => void;
}) {
  const ProjectIcon = projectIcons[submission.icon];
  const tone = toneStyles[submission.tone];
  const avatarTone = toneStyles[submission.avatarTone];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Close submission details"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-slate-950/40 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="submission-dialog-title"
        className="relative w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tone.project}`}
            >
              <ProjectIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h2
                id="submission-dialog-title"
                className="truncate text-lg font-semibold leading-7 text-slate-900"
              >
                {submission.project}
              </h2>
              <p className="truncate text-xs leading-4 text-gray-700">
                {submission.repo}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close submission details"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4">
          <div className="col-span-2">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
              Student
            </p>
            <div className="flex items-center gap-2 pt-1.5">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${avatarTone.avatar}`}
              >
                {submission.student.initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-900">
                  {submission.student.name}
                </p>
                <p className="truncate text-xs text-gray-700">
                  {submission.student.email}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
              Submitted
            </p>
            <p className="pt-1.5 text-sm font-medium text-slate-900">
              {submission.submittedDate}
            </p>
            <p className="text-xs text-gray-700">{submission.relativeDate}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
              Status
            </p>
            <div className="pt-1.5">
              <StatusBadge status={submission.status} />
            </div>
          </div>
          <div className="col-span-2">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
              Stack
            </p>
            <p className="pt-1.5 text-sm font-medium text-slate-900">
              {submission.stack}
            </p>
          </div>
        </div>

        <p className="pt-4 text-xs leading-5 text-gray-700">
          Open the repository and compare the latest commit against the milestone
          rubric before recording a review decision.
        </p>

        <div className="flex flex-col-reverse gap-2 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
          >
            Close
          </button>
          <a
            href={`https://${submission.repo}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            Open Repository
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
