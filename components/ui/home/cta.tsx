import Link from "next/link";
import { ArrowRightIcon, UserIcon } from "@/components/dashboard/icons";

export function Cta() {
  return (
    <section aria-labelledby="cta-heading" className="w-full pb-20 pt-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-indigo-900 via-indigo-700 to-indigo-600 p-8 shadow-2xl shadow-indigo-900/20 sm:p-12 lg:p-16">
          {/* Animated background glowing blurs */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-3xl animate-pulse"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 left-1/3 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative flex max-w-3xl flex-col items-start gap-5">
            <span className="rounded-full bg-white/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-indigo-100 backdrop-blur-md">
              Start Reviewing Today
            </span>

            <h2
              id="cta-heading"
              className="text-balance font-serif text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight"
            >
              Ready to streamline your cohort&apos;s project submissions?
            </h2>

            <p className="text-pretty text-base leading-7 text-indigo-100/90 sm:text-lg">
              Join students and mentors already accelerating milestone evaluations
              with automated URL checks, state-locked review integrity, and structured feedback.
            </p>

            <div className="flex w-full flex-col items-stretch gap-3 pt-3 sm:w-auto sm:flex-row sm:items-center">
              <Link
                href="/sign-up"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-indigo-700 shadow-md transition-all hover:bg-indigo-50 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Create Student Account
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <UserIcon className="h-4 w-4" />
                Sign In to Workspace
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
