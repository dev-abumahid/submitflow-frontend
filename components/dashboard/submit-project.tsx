"use client";

import { useState } from "react";
import type { ChangeEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GithubIcon,
  GlobeIcon,
  InfoIcon,
  PencilIcon,
} from "@/components/dashboard/icons";
import { projectApi } from "@/lib/api";

const initialForm = {
  name: "",
  gitRepoUrl: "",
  previewUrl: "",
  description: "",
};

function isValidHttpOrHttpsUrl(value: string) {
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function SubmitProject() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const nameIsValid =
    form.name.trim().length >= 1 && form.name.trim().length <= 200;
  const gitRepoIsValid =
    isValidHttpOrHttpsUrl(form.gitRepoUrl) && form.gitRepoUrl.trim().length <= 500;
  const previewIsValid =
    isValidHttpOrHttpsUrl(form.previewUrl) && form.previewUrl.trim().length <= 500;
  const descriptionIsValid =
    form.description.trim().length >= 1 &&
    form.description.trim().length <= 5000;

  const linkChecks = [
    { label: "Project Title", isValid: nameIsValid },
    { label: "Git Repository URL", isValid: gitRepoIsValid },
    { label: "Live Preview URL", isValid: previewIsValid },
    { label: "Project Description", isValid: descriptionIsValid },
  ];

  const passedChecks = linkChecks.filter((check) => check.isValid).length;
  const validationPercent = Math.round(
    (passedChecks / linkChecks.length) * 100
  );
  const isReadyToSubmit =
    nameIsValid && gitRepoIsValid && previewIsValid && descriptionIsValid;

  const updateField =
    (field: keyof typeof initialForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setErrorMessage(null);
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isReadyToSubmit) return;

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await projectApi.createProject({
        name: form.name.trim(),
        gitRepoUrl: form.gitRepoUrl.trim(),
        previewUrl: form.previewUrl.trim(),
        description: form.description.trim(),
      });

      setSuccessMessage("Project submitted successfully! Redirecting...");
      setTimeout(() => {
        router.push("/submissions");
      }, 1000);
    } catch (err: unknown) {
      let msg = "Failed to submit project. Please verify all fields.";
      if (axios.isAxiosError(err) && err.response?.data) {
        const data = err.response.data as {
          message?: string;
          errorSources?: { message: string }[];
        };
        msg = data.message || data.errorSources?.[0]?.message || msg;
      }
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="font-serif text-2xl font-semibold leading-9 tracking-tight text-slate-900 sm:text-3xl sm:leading-10">
          Submit Your Project
        </h1>
        <p className="text-pretty text-sm leading-5 text-gray-700">
          Share your repository and live preview link to have your project
          evaluated by our mentors.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-inset ring-slate-200/60 sm:p-6 lg:p-8"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div>
              <h2 className="font-serif text-lg font-semibold leading-6 tracking-tight text-slate-900">
                Project Submission Form
              </h2>
              <p className="text-pretty text-xs leading-4 text-gray-700">
                Provide your project details, git repository, and live deployment.
              </p>
            </div>
            <span className="w-fit shrink-0 rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold uppercase leading-4 tracking-tight text-indigo-700">
              Starts as Pending
            </span>
          </div>

          {errorMessage && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs font-medium text-emerald-700">
              {successMessage}
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-5">
          <FormField
            id="name"
            label="Project Name"
            badge={<FieldBadge>1–200 chars</FieldBadge>}
            hint={
              <p className="flex items-start gap-1 text-xs leading-4 text-gray-700">
                <InfoIcon className="mt-0.5 h-3 w-3 shrink-0 text-gray-500" />
                Give your project a descriptive title reflecting its purpose.
              </p>
            }
          >
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                required
                minLength={1}
                maxLength={200}
                placeholder="e.g. Portfolio Website or E-Commerce App"
                value={form.name}
                onChange={updateField("name")}
                className={inputClassName}
              />
              <PencilIcon className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500" />
            </div>
          </FormField>

          <FormField
            id="git-repo-url"
            label="Git Repository URL"
            badge={<FieldBadge tone="blue">HTTP/HTTPS Required</FieldBadge>}
            hint={
              <p className="flex items-start gap-1 text-xs leading-4 text-gray-700">
                <GithubIcon className="mt-0.5 h-3 w-3 shrink-0 text-gray-500" />
                Must start with http:// or https:// (e.g. https://github.com/username/project).
              </p>
            }
          >
            <div className="relative">
              <input
                id="git-repo-url"
                name="gitRepoUrl"
                type="url"
                autoComplete="url"
                required
                maxLength={500}
                placeholder="https://github.com/username/repository"
                value={form.gitRepoUrl}
                onChange={updateField("gitRepoUrl")}
                className={`${inputClassName} pr-10`}
              />
              <GithubIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-900" />
              <ValidationIcon isValid={gitRepoIsValid} />
            </div>
          </FormField>

          <FormField
            id="preview-url"
            label="Live Project URL"
            badge={<FieldBadge>HTTP/HTTPS Required</FieldBadge>}
            hint={
              <p className="flex items-start gap-1 text-xs leading-4 text-gray-700">
                <GlobeIcon className="mt-0.5 h-3 w-3 shrink-0 text-gray-500" />
                Must start with http:// or https:// (e.g. https://myproject.vercel.app).
              </p>
            }
          >
            <div className="relative">
              <input
                id="preview-url"
                name="previewUrl"
                type="url"
                autoComplete="url"
                required
                maxLength={500}
                placeholder="https://my-project.vercel.app"
                value={form.previewUrl}
                onChange={updateField("previewUrl")}
                className={`${inputClassName} pr-10`}
              />
              <GlobeIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <ExternalLinkIcon className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500" />
            </div>
          </FormField>

          <FormField
            id="description"
            label="Project Description"
            badge={
              <FieldBadge>
                {form.description.length} / 5000 chars
              </FieldBadge>
            }
            hint={
              <p className="flex items-start gap-1 text-xs leading-4 text-gray-700">
                <FileTextIcon className="mt-0.5 h-3 w-3 shrink-0 text-gray-500" />
                Describe the key features, architecture, and technology stack used.
              </p>
            }
          >
            <textarea
              id="description"
              name="description"
              required
              minLength={1}
              maxLength={5000}
              rows={6}
              placeholder="Provide a comprehensive summary of your project..."
              value={form.description}
              onChange={updateField("description")}
              className="min-h-32 w-full resize-y rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-sm leading-6 text-slate-900 shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
            />
          </FormField>

          <section
            aria-labelledby="form-completeness"
            className="rounded-xl bg-blue-50 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3
                id="form-completeness"
                className="text-xs font-medium leading-4 tracking-tight text-gray-700"
              >
                Submission Checklist
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
              aria-label="Submission Checklist"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={validationPercent}
            >
              <div
                className="h-full rounded-full bg-indigo-700 transition-[width] duration-300"
                style={{ width: `${validationPercent}%` }}
              />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
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

            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={!isReadyToSubmit || loading}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-semibold leading-5 text-white shadow-sm transition-colors hover:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Project for Review"}
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
