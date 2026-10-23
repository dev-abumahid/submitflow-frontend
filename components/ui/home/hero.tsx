"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  GithubIcon,
  GlobeIcon,
  PencilIcon,
  RefreshIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@/components/dashboard/icons";

export function Hero() {
  const [activeTab, setActiveTab] = useState<"student" | "mentor" | "lifecycle">("student");
  const [demoStatus, setDemoStatus] = useState<"PENDING" | "IN_PROGRESS" | "APPROVED" | "REJECTED">("PENDING");

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      {/* Background ambient glowing orbs */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-linear-to-tr from-indigo-500/15 via-purple-500/10 to-sky-400/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-96 left-1/4 -z-10 h-72 w-72 rounded-full bg-indigo-600/10 blur-2xl animate-pulse"
        aria-hidden="true"
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-4 pb-20 pt-10 sm:px-6 lg:px-10">
        {/* Hero Top Copy */}
        <div className="flex w-full max-w-4xl flex-col items-center text-center">
          {/* Animated Announcement Pill */}
          <div className="group mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-md transition-all hover:border-indigo-400 hover:shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
            </span>
            <span className="text-xs font-semibold tracking-tight text-slate-800">
              SubmitFlow Engine 2.0 &bull; Role-Based Evaluation Live
            </span>
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
              NEW
            </span>
          </div>

          {/* Main Title */}
          <h1
            id="hero-heading"
            className="text-balance font-serif text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl sm:leading-[62px] lg:text-6xl lg:leading-[72px]"
          >
            The seamless code submission &amp; review workflow for{" "}
            <span className="bg-linear-to-r from-indigo-600 via-indigo-700 to-purple-600 bg-clip-text text-transparent">
              engineering cohorts
            </span>
            .
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-gray-600 sm:text-lg">
            SubmitFlow simplifies project submissions for students and equips
            mentors with a dedicated grading console. Complete with automated
            link verification, state guardrails, and real-time qualitative feedback.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/sign-up"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:bg-indigo-700 hover:shadow-indigo-600/35 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 sm:w-auto"
            >
              Get Started as Student
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 sm:w-auto"
            >
              <UserIcon className="h-4 w-4 text-indigo-600" />
              Sign In (Student / Mentor)
            </Link>
          </div>

          {/* Feature Badges with Micro Animations */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-gray-600">
            <div className="flex items-center gap-1.5 rounded-full bg-slate-100/90 px-3 py-1 shadow-xs transition-transform hover:scale-105">
              <CheckCircleIcon className="h-3.5 w-3.5 text-emerald-600" />
              <span>Git &amp; HTTPS Live Preview</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-slate-100/90 px-3 py-1 shadow-xs transition-transform hover:scale-105">
              <ShieldCheckIcon className="h-3.5 w-3.5 text-indigo-600" />
              <span>State-Locked Guardrails</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-slate-100/90 px-3 py-1 shadow-xs transition-transform hover:scale-105">
              <ClockIcon className="h-3.5 w-3.5 text-amber-600" />
              <span>Real-time Status Tracking</span>
            </div>
          </div>
        </div>

        {/* Interactive Showcase Console (Aligned directly with project APIs) */}
        <div id="demo" className="w-full max-w-5xl scroll-mt-24">
          <div className="relative rounded-3xl border border-slate-200/80 bg-white/90 p-3 shadow-2xl shadow-indigo-900/10 backdrop-blur-xl transition-all sm:p-5">
            {/* Interactive Tab Switcher */}
            <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-rose-400 shadow-xs" />
                  <span className="h-3 w-3 rounded-full bg-amber-400 shadow-xs" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-xs" />
                </span>
                <span className="pl-2 font-mono text-xs font-semibold text-slate-500">
                  submitflow.app/workspace
                </span>
              </div>

              {/* View Toggle Tabs */}
              <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold text-gray-600">
                <button
                  type="button"
                  onClick={() => setActiveTab("student")}
                  className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 transition-all ${
                    activeTab === "student"
                      ? "bg-white text-indigo-700 shadow-xs"
                      : "hover:text-slate-900"
                  }`}
                >
                  <UserIcon className="h-3.5 w-3.5" />
                  Student View
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("mentor")}
                  className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 transition-all ${
                    activeTab === "mentor"
                      ? "bg-white text-indigo-700 shadow-xs"
                      : "hover:text-slate-900"
                  }`}
                >
                  <PencilIcon className="h-3.5 w-3.5" />
                  Mentor Console
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("lifecycle")}
                  className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 transition-all ${
                    activeTab === "lifecycle"
                      ? "bg-white text-indigo-700 shadow-xs"
                      : "hover:text-slate-900"
                  }`}
                >
                  <RefreshIcon className="h-3.5 w-3.5" />
                  Live Lifecycle
                </button>
              </div>
            </div>

            {/* Tab 1: Student Submission Experience */}
            {activeTab === "student" && (
              <div className="mt-5 grid gap-6 lg:grid-cols-12 lg:items-center">
                {/* Left: Interactive Submission Form Mockup */}
                <div className="flex flex-col gap-4 rounded-2xl bg-slate-50/80 p-5 ring-1 ring-inset ring-slate-200/70 lg:col-span-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-base font-bold text-slate-900">
                        Student Submission Form
                      </h3>
                      <p className="text-xs text-gray-500">
                        4 essential fields required for mentor evaluation
                      </p>
                    </div>
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                      Starts as PENDING
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold text-slate-700">Project Name</label>
                      <div className="mt-1 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-xs">
                        <PencilIcon className="h-3.5 w-3.5 text-indigo-600" />
                        <span className="font-medium">DevPulse — Real-Time Systems Health Monitor</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="font-semibold text-slate-700">Git Repo URL</label>
                        <div className="mt-1 flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-slate-900 shadow-xs truncate">
                          <GithubIcon className="h-3.5 w-3.5 shrink-0 text-slate-800" />
                          <span className="truncate text-indigo-600">github.com/alex/devpulse</span>
                        </div>
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700">Live Preview URL</label>
                        <div className="mt-1 flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-slate-900 shadow-xs truncate">
                          <GlobeIcon className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                          <span className="truncate text-indigo-600">devpulse.vercel.app</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700">Description</label>
                      <div className="mt-1 rounded-lg border border-slate-200 bg-white p-2.5 text-gray-600 shadow-xs text-[11px] leading-relaxed">
                        Observability dashboard streaming real-time telemetry from microservices with role-based auth, Next.js, and WebSocket synchronization.
                      </div>
                    </div>
                  </div>

                  {/* Submission Checklist */}
                  <div className="rounded-xl bg-white p-3 shadow-xs border border-slate-200/80">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">Validation Status</span>
                      <span className="font-bold text-emerald-600">100% Ready</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-full rounded-full bg-emerald-500 transition-all duration-500" />
                    </div>
                  </div>
                </div>

                {/* Right: What Student Sees After Submitting */}
                <div className="flex flex-col gap-4 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5 lg:col-span-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
                      Active Submission Card
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                      PENDING
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif text-lg font-bold text-slate-900">
                      DevPulse Monitor
                    </h4>
                    <p className="mt-1 text-xs text-gray-600 line-clamp-2">
                      Real-time telemetry and microservices incident alerting system.
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-3 text-xs shadow-xs border border-indigo-100/60">
                    <div className="flex items-center justify-between text-gray-500">
                      <span>Editability:</span>
                      <span className="font-semibold text-emerald-700">
                        ✓ Unlocked (Pending)
                      </span>
                    </div>
                    <p className="mt-1.5 text-[11px] text-gray-500 leading-normal">
                      Students can update links &amp; description while in Pending state. Once a mentor initiates review, editing locks automatically.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/submit"
                      className="flex-1 rounded-lg bg-indigo-600 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-indigo-700"
                    >
                      Try Submitting A Project
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Mentor Console View */}
            {activeTab === "mentor" && (
              <div className="mt-5 flex flex-col gap-5">
                <div className="flex flex-col gap-2 rounded-2xl bg-slate-50 p-5 ring-1 ring-inset ring-slate-200/70 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="text-xs font-bold text-indigo-700">
                      Evaluation Target: DevPulse
                    </span>
                    <h3 className="font-serif text-lg font-bold text-slate-900">
                      Mentor Decision &amp; Feedback Console
                    </h3>
                  </div>

                  {/* Dynamic Decision Selector Simulator */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium text-gray-500">Simulate Verdict:</span>
                    <button
                      type="button"
                      onClick={() => setDemoStatus("IN_PROGRESS")}
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                        demoStatus === "IN_PROGRESS"
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      In Progress
                    </button>
                    <button
                      type="button"
                      onClick={() => setDemoStatus("APPROVED")}
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                        demoStatus === "APPROVED"
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => setDemoStatus("REJECTED")}
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                        demoStatus === "REJECTED"
                          ? "bg-rose-600 text-white shadow-xs"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      Reject
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs shadow-xs">
                    <span className="font-semibold uppercase tracking-wider text-gray-500">
                      Audit Links Checked
                    </span>
                    <div className="mt-2 flex flex-col gap-2">
                      <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2">
                        <span className="flex items-center gap-1.5 text-slate-900 font-medium">
                          <GithubIcon className="h-4 w-4 text-slate-800" />
                          Source Repository
                        </span>
                        <span className="text-emerald-600 font-bold">200 OK</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2">
                        <span className="flex items-center gap-1.5 text-slate-900 font-medium">
                          <GlobeIcon className="h-4 w-4 text-gray-600" />
                          Production Deployment
                        </span>
                        <span className="text-emerald-600 font-bold">Active HTTPS</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs shadow-xs">
                    <span className="font-semibold uppercase tracking-wider text-gray-500">
                      Structured Reviewer Feedback
                    </span>
                    <p className="mt-2 rounded-lg bg-indigo-50/50 p-2.5 text-slate-700 italic border border-indigo-100">
                      {demoStatus === "APPROVED"
                        ? "“Exceptional telemetry pipeline architecture! Zero dropped packets, clean error boundary logging, and responsive Next.js frontend.”"
                        : demoStatus === "REJECTED"
                        ? "“WebSocket reconnections fail when offline. Please add exponential backoff retry and resubmit once tested.”"
                        : "“Currently inspecting database indexing and docker compose replica configuration...”"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Real-Time Lifecycle Pipeline */}
            {activeTab === "lifecycle" && (
              <div className="mt-5 flex flex-col gap-6 py-2">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {/* Step 1 */}
                  <div className="relative flex flex-col rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-5 shadow-xs transition-transform hover:-translate-y-1">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white">
                      1
                    </span>
                    <h4 className="mt-3 font-serif text-base font-bold text-slate-900">
                      PENDING
                    </h4>
                    <span className="mt-1 inline-flex w-fit rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                      Student Can Edit
                    </span>
                    <p className="mt-2 text-xs leading-relaxed text-gray-600">
                      Student submits Name, Description, Git repo, and preview URL. Fully editable until mentor accepts.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex flex-col rounded-2xl border-2 border-indigo-500 bg-white p-5 shadow-md shadow-indigo-500/10 transition-transform hover:-translate-y-1">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600 text-xs font-bold text-white">
                      2
                    </span>
                    <h4 className="mt-3 font-serif text-base font-bold text-slate-900">
                      IN_PROGRESS
                    </h4>
                    <span className="mt-1 inline-flex w-fit rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                      Submission Locked
                    </span>
                    <p className="mt-2 text-xs leading-relaxed text-gray-600">
                      Mentor starts evaluation. Code snapshot locks to prevent changes midway through the audit.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex flex-col rounded-2xl border-2 border-slate-200 bg-slate-50/70 p-5 shadow-xs transition-transform hover:-translate-y-1">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-xs font-bold text-white">
                      3
                    </span>
                    <h4 className="mt-3 font-serif text-base font-bold text-slate-900">
                      DECISION
                    </h4>
                    <span className="mt-1 inline-flex w-fit rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      APPROVED or REJECTED
                    </span>
                    <p className="mt-2 text-xs leading-relaxed text-gray-600">
                      Mentor delivers official verdict and detailed feedback notes stored permanently on the student profile.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
