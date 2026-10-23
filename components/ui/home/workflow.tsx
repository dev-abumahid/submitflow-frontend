"use client";

import {
  CheckCircleIcon,
  FileTextIcon,
  GithubIcon,
  RefreshIcon,
  ShieldCheckIcon,
} from "@/components/dashboard/icons";

const corePillars = [
  {
    icon: GithubIcon,
    iconBg: "bg-slate-900 text-white",
    title: "Dual URL Verification",
    badge: "Public & HTTPS",
    badgeTone: "bg-emerald-100 text-emerald-800",
    description:
      "Every submission requires a valid Git repository and active live preview URL, ensuring mentors only review running applications with inspectable source code.",
  },
  {
    icon: ShieldCheckIcon,
    iconBg: "bg-indigo-600 text-white",
    title: "State-Machine Guardrails",
    badge: "Anti-Collision",
    badgeTone: "bg-indigo-100 text-indigo-800",
    description:
      "Projects start as PENDING and can be updated by the student. Once a mentor initiates review (IN_PROGRESS), code editing locks to prevent unexpected mid-review changes.",
  },
  {
    icon: FileTextIcon,
    iconBg: "bg-purple-600 text-white",
    title: "Qualitative Feedback",
    badge: "Actionable Insights",
    badgeTone: "bg-purple-100 text-purple-800",
    description:
      "Mentors don't just pass or fail; they provide detailed feedback notes outlining architectural commendations, security findings, or required revisions.",
  },
  {
    icon: RefreshIcon,
    iconBg: "bg-blue-600 text-white",
    title: "Session Persistence",
    badge: "Auto-Refresh",
    badgeTone: "bg-sky-100 text-indigo-800",
    description:
      "Engineered with short-lived access tokens and automated refresh rotation. Reloading the webpage never signs you out or disrupts active work.",
  },
];

export function ProjectWorkflow() {
  return (
    <section id="how-it-works" className="relative w-full bg-slate-50/70 py-20 border-y border-slate-200/60 scroll-mt-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-16 px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex max-w-3xl flex-col items-center gap-3 text-center">
          <span className="rounded-full bg-indigo-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700">
            Engineered For Modern Cohorts
          </span>
          <h2 className="font-serif text-3xl font-extrabold text-slate-900 sm:text-4xl">
            A Purpose-Built Pipeline for Capstone Reviews
          </h2>
          <p className="text-pretty text-base text-gray-600">
            SubmitFlow aligns student milestones with mentor audits through a
            deterministic, secure submission workflow.
          </p>
        </div>

        {/* 3 Step Interactive Process Flow */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {/* Step 1 */}
          <div className="group relative flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-inset ring-slate-200/80 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 font-mono text-base font-bold text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                01
              </span>
              <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
                PENDING
              </span>
            </div>
            <h3 className="mt-5 font-serif text-lg font-bold text-slate-900">
              Submit &amp; Validate
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-gray-600">
              Students submit project name, public Git repository, live preview URL, and architectural summary. While pending, submissions remain completely editable.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-indigo-600">
              <span>Clean 4-field schema</span>
              <CheckCircleIcon className="h-4 w-4 text-emerald-600" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="group relative flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-inset ring-slate-200/80 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 font-mono text-base font-bold text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                02
              </span>
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-200">
                IN_PROGRESS
              </span>
            </div>
            <h3 className="mt-5 font-serif text-lg font-bold text-slate-900">
              Mentor Evaluation &amp; Lock
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-gray-600">
              A mentor selects the project from the review queue. Status automatically updates to in-progress, locking code changes so evaluation remains stable and accurate.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-purple-600">
              <span>Automatic edit guardrails</span>
              <ShieldCheckIcon className="h-4 w-4 text-indigo-600" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="group relative flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-inset ring-slate-200/80 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 font-mono text-base font-bold text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                03
              </span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                DECISION
              </span>
            </div>
            <h3 className="mt-5 font-serif text-lg font-bold text-slate-900">
              Official Decision &amp; Feedback
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-gray-600">
              The mentor marks the submission as APPROVED or REJECTED accompanied by structured feedback notes. Results sync immediately to the student workspace.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <span>Real-time feedback sync</span>
              <CheckCircleIcon className="h-4 w-4 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div id="features" className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 scroll-mt-24">
          {corePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-inset ring-slate-200/70 transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${pillar.iconBg} shadow-xs`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${pillar.badgeTone}`}
                  >
                    {pillar.badge}
                  </span>
                </div>
                <h4 className="mt-4 font-serif text-base font-bold text-slate-900">
                  {pillar.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-gray-600">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
