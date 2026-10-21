"use client";

import { useState } from "react";
import type { ChangeEvent, ReactNode } from "react";
import type { ComponentType } from "react";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClipboardCheckIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GithubIcon,
  GlobeIcon,
  InfoIcon,
  PencilIcon,
  ShieldCheckIcon,
  type IconProps,
} from "@/components/dashboard/icons";

const initialForm = {
  projectName: "DevPulse — Real-Time Systems Health Monitor",
  githubUrl: "https://github.com/alex-morgan/devpulse-engine",
  liveUrl: "https://devpulse.vercel.app",
  description:
    "DevPulse is an open-source observability dashboard providing real-time telemetry streaming and health analytics for containerized microservices. Built with Next.js 14, TailwindCSS, TypeScript, and Go backend with WebSockets for sub-50ms latency updates. Includes role-based auth, automated incident alerting, and customizable SLA health probes.",
};

const submissionInfo: {
  label: string;
  value: string;
  icon: ComponentType<IconProps>;
}[] = [
  {
    label: "Submission Slot",
    value: "1 / 1 Available",
    icon: ClipboardCheckIcon,
  },
  {
    label: "Status Guardrail",
    value: "Unlocked",
    icon: ShieldCheckIcon,
  },
];

function isValidGithubUrl(value: string) {
  return /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/.test(
    value.trim(),
  );
}

function isValidHttpsUrl(value: string) {
  try {
    return new URL(value.trim()).protocol === "https:";
  } catch {
    return false;
  }
}

export function SubmitProject() {
  const [form, setForm] = useState(initialForm);
  const [draftSaved, setDraftSaved] = useState(false);

  const projectNameIsValid =
    form.projectName.trim().length >= 3 &&
    form.projectName.trim().length <= 100;
  const githubIsValid = isValidGithubUrl(form.githubUrl);
  const liveUrlIsValid = isValidHttpsUrl(form.liveUrl);
  const descriptionIsValid =
    form.description.trim().length >= 30 &&
    form.description.trim().length <= 2000;

  const linkChecks = [
    { label: "GitHub Reachable", isValid: githubIsValid },
    { label: "HTTPS 200 OK", isValid: liveUrlIsValid },
    {
      label: "Schema Valid",
      isValid:
        projectNameIsValid &&
        githubIsValid &&
        liveUrlIsValid &&
        descriptionIsValid,
    },
  ];

  const passedChecks = linkChecks.filter((check) => check.isValid).length;
  const validationPercent = Math.round(
    (passedChecks / linkChecks.length) * 100,
  );
  const isReadyToSubmit =
    projectNameIsValid &&
    githubIsValid &&
    liveUrlIsValid &&
    descriptionIsValid;

  const updateField =
    (field: keyof typeof initialForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDraftSaved(false);
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold uppercase leading-4 tracking-wide text-indigo-700">
              Cohort 12 • Final Capstone Milestone
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold leading-4 tracking-tight text-gray-700">
              <span
                className="h-1.5 w-1.5 rounded-full bg-indigo-700"
                aria-hidden="true"
              />
              Window open: closes in 4 days
            </span>
          </div>
          <h1 className="pt-1 font-serif text-2xl font-semibold leading-9 tracking-tight text-slate-900 sm:text-3xl sm:leading-10">
            Submit Your Project
          </h1>
          <p className="text-pretty text-sm leading-5 text-gray-700">
            Share your work and get it audited and certified by an assigned
            senior mentor.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:flex xl:flex-row">
          {submissionInfo.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex min-w-0 items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-inset ring-slate-200/60"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-indigo-700">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 pr-1">
                  <p className="text-xs font-semibold leading-4 tracking-tight text-gray-500">
                    {item.label}
                  </p>
                  <p className="whitespace-nowrap text-xs font-semibold leading-4 text-slate-900">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </header>

      <form
        onSubmit={(event) => event.preventDefault()}
        className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-inset ring-slate-200/60 sm:p-6 lg:p-8"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div>
              <h2 className="font-serif text-lg font-semibold leading-6 tracking-tight text-slate-900">
                Project Submission Form
              </h2>
              <p className="text-pretty text-xs leading-4 text-gray-700">
                Please provide accurate repository and deployment links for
                staff audit.
              </p>
            </div>
            <span className="w-fit shrink-0 rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold uppercase leading-4 tracking-tight text-indigo-700">
              Mandatory
            </span>
          </div>

          <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-3">
            <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-indigo-700" />
            <div>
              <p className="text-xs font-semibold leading-4 text-slate-900">
                Policy Reminder: Single Active Submission
              </p>
              <p className="pt-0.5 text-pretty text-xs leading-4 text-gray-700">
                Each student may submit only 1 active project at a time. Once
                submitted, your repository commit snapshot is locked for mentor
                evaluation.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-5">
          <FormField
            id="project-name"
            label="Project Name"
            badge={<FieldBadge>3–100 chars</FieldBadge>}
            hint={
              <p className="flex items-start gap-1 text-xs leading-4 text-gray-700">
                <InfoIcon className="mt-0.5 h-3 w-3 shrink-0 text-gray-500" />
                Give your project a descriptive, professional title reflecting
                its core value.
              </p>
            }
          >
            <div className="relative">
              <input
                id="project-name"
                name="projectName"
                type="text"
                required
                minLength={3}
                maxLength={100}
                value={form.projectName}
                onChange={updateField("projectName")}
                aria-invalid={!projectNameIsValid}
                aria-describedby="project-name-hint"
                className={`${inputClassName} ${
                  projectNameIsValid ? "" : invalidInputClassName
                }`}
              />
              <PencilIcon className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500" />
            </div>
          </FormField>

          <FormField
            id="github-url"
            label="GitHub Repository URL"
            badge={<FieldBadge tone="blue">Public Repo</FieldBadge>}
            hint={
              <p className="flex items-start gap-1 text-xs leading-4 text-gray-700">
                <GithubIcon className="mt-0.5 h-3 w-3 shrink-0 text-gray-500" />
                Must be a valid public GitHub repository. Ensure your main
                branch contains clean code and a comprehensive README.
              </p>
            }
          >
            <div className="relative">
              <input
                id="github-url"
                name="githubUrl"
                type="url"
                autoComplete="url"
                required
                value={form.githubUrl}
                onChange={updateField("githubUrl")}
                aria-invalid={!githubIsValid}
                aria-describedby="github-url-hint"
                className={`${inputClassName} pr-10 ${
                  githubIsValid ? "" : invalidInputClassName
                }`}
              />
              <GithubIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-900" />
              <ValidationIcon isValid={githubIsValid} />
            </div>
          </FormField>

          <FormField
            id="live-url"
            label="Live Project URL"
            badge={<FieldBadge>HTTPS Required</FieldBadge>}
            hint={
              <p className="flex items-start gap-1 text-xs leading-4 text-gray-700">
                <GlobeIcon className="mt-0.5 h-3 w-3 shrink-0 text-gray-500" />
                Must be an active HTTPS deployment (e.g. Vercel, Netlify,
                Railway, or AWS).
              </p>
            }
          >
            <div className="relative">
              <input
                id="live-url"
                name="liveUrl"
                type="url"
                autoComplete="url"
                required
                value={form.liveUrl}
                onChange={updateField("liveUrl")}
                aria-invalid={!liveUrlIsValid}
                aria-describedby="live-url-hint"
                className={`${inputClassName} pr-10 ${
                  liveUrlIsValid ? "" : invalidInputClassName
                }`}
              />
              <GlobeIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <ExternalLinkIcon className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500" />
            </div>
          </FormField>

          <FormField
            id="project-description"
            label="Project Description"
            badge={
              <FieldBadge>
                {form.description.length} / 2000 chars (Min 30 chars)
              </FieldBadge>
            }
            hint={
              <div className="flex flex-col justify-between gap-1 text-xs leading-4 sm:flex-row sm:items-center">
                <p className="flex items-start gap-1 text-gray-700">
                  <FileTextIcon className="mt-0.5 h-3 w-3 shrink-0 text-gray-500" />
                  Summarize architecture, frameworks used, and testing
                  credentials.
                </p>
                <p
                  className={
                    descriptionIsValid
                      ? "font-medium text-indigo-700"
                      : "font-medium text-amber-700"
                  }
                  aria-live="polite"
                >
                  {descriptionIsValid
                    ? "✓ Meets length requirement"
                    : `Add ${Math.max(0, 30 - form.description.trim().length)} more characters`}
                </p>
              </div>
            }
          >
            <textarea
              id="project-description"
              name="description"
              required
              minLength={30}
              maxLength={2000}
              rows={7}
              value={form.description}
              onChange={updateField("description")}
              aria-invalid={!descriptionIsValid}
              aria-describedby="description-hint"
              className={`min-h-36 w-full resize-y rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-sm leading-6 text-slate-900 shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 ${
                descriptionIsValid ? "" : invalidInputClassName
              }`}
            />
          </FormField>

          <section
            aria-labelledby="link-validation-heading"
            className="rounded-xl bg-blue-50 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3
                id="link-validation-heading"
                className="text-xs font-medium leading-4 tracking-tight text-gray-700"
              >
                Automated Link Validation Status
              </h3>
              <p
                className="text-xs font-semibold leading-4 tracking-tight text-indigo-700"
                aria-live="polite"
              >
                {validationPercent}% Ready
              </p>
            </div>
            <div
              className="mt-2 h-1.5 overflow-hidden rounded-full bg-sky-100"
              role="progressbar"
              aria-label="Automated link validation"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={validationPercent}
            >
              <div
                className="h-full rounded-full bg-indigo-700 transition-[width] duration-300"
                style={{ width: `${validationPercent}%` }}
              />
            </div>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {linkChecks.map((check) => (
                <p
                  key={check.label}
                  className={`inline-flex items-center gap-1 text-xs font-semibold leading-4 tracking-tight ${
                    check.isValid ? "text-indigo-700" : "text-gray-500"
                  }`}
                >
                  <CheckCircleIcon className="h-3 w-3 shrink-0" />
                  {check.label}
                </p>
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-3 border-t border-sky-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
            <p
              className={`flex items-start gap-2 text-xs leading-4 ${
                isReadyToSubmit ? "text-gray-700" : "text-amber-700"
              }`}
              aria-live="polite"
            >
              {isReadyToSubmit ? (
                <CheckCircleIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-700" />
              ) : (
                <InfoIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              )}
              {isReadyToSubmit
                ? "All required fields satisfied. Ready for submission."
                : "Complete all required fields to submit your project."}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setDraftSaved(true)}
                className="rounded-lg bg-blue-50 px-3 py-2.5 text-sm font-medium leading-5 text-slate-900 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
              >
                {draftSaved ? "Draft Saved" : "Save Draft"}
              </button>
              <button
                type="submit"
                disabled={!isReadyToSubmit}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-semibold leading-5 text-white shadow-sm transition-colors hover:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Submit Project for Review
                <ArrowRightIcon className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const inputClassName =
  "w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm leading-5 text-slate-900 shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30";

const invalidInputClassName =
  "border-red-400 focus:border-red-500 focus:ring-red-500/20";

function FormField({
  id,
  label,
  badge,
  hint,
  children,
}: {
  id: string;
  label: string;
  badge: ReactNode;
  hint: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label
          htmlFor={id}
          className="text-sm font-semibold leading-5 text-slate-900"
        >
          {label} <span className="text-red-700">*</span>
        </label>
        {badge}
      </div>
      {children}
      <div id={`${id}-hint`}>{hint}</div>
    </div>
  );
}

function FieldBadge({
  children,
  tone = "sky",
}: {
  children: ReactNode;
  tone?: "sky" | "blue";
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm px-2 py-0.5 font-mono text-xs font-semibold leading-4 tracking-tight ${
        tone === "blue"
          ? "bg-blue-100 text-indigo-700"
          : "bg-sky-100 text-gray-500"
      }`}
    >
      {tone === "blue" && (
        <span
          className="h-1.5 w-1.5 rounded-full bg-indigo-700"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

function ValidationIcon({ isValid }: { isValid: boolean }) {
  return (
    <CheckCircleIcon
      className={`pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 ${
        isValid ? "text-indigo-700" : "text-gray-400"
      }`}
    />
  );
}
