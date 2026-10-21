"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AuthShell } from "@/components/ui/auth/auth-shell";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthShell labelledBy="login-heading" promo={<PromoPanel />}>
      <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 pb-2">
                <h1
                  id="login-heading"
                  className="text-3xl font-bold leading-9 tracking-tight text-slate-900"
                >
                  Welcome back
                </h1>
                <p className="text-sm font-normal leading-5 text-slate-500">
                  Sign in to continue to SubmitFlow
                </p>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold uppercase leading-4 tracking-tight text-slate-900"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@university.edu or you@company.com"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-10 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                    />
                    <MailIcon className="pointer-events-none absolute right-3.5 top-1/2 h-3 w-3.5 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-3">
                    <label
                      htmlFor="password"
                      className="text-xs font-semibold uppercase leading-4 tracking-tight text-slate-900"
                    >
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="rounded-sm text-xs font-medium leading-4 text-indigo-600 transition-colors hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-11 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-3 w-3 text-current" />
                      ) : (
                        <EyeIcon className="h-4 w-3 text-current" />
                      )}
                    </button>
                  </div>
                </div>

                <label className="flex items-center gap-2.5 pt-0.5 text-xs font-normal leading-4 text-slate-600">
                  <input
                    type="checkbox"
                    name="remember"
                    defaultChecked
                    className="h-4 w-4 rounded border-slate-300 accent-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                  />
                  Remember this machine for 30 days
                </label>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold leading-5 text-white shadow-sm transition-colors hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
                >
                  Sign In
                  <ArrowRightIcon className="h-2.5 w-2.5 text-white" />
                </button>
              </div>

              <p className="flex items-center justify-center gap-1.5 text-xs font-normal leading-4 text-slate-500">
                <LockIcon className="h-3 w-2.5 shrink-0 text-slate-400" />
                Protected by enterprise grade 2FA &amp; SSO encryption.
              </p>

              <p className="border-t border-slate-200/80 pt-6 text-center text-xs font-normal leading-4 text-slate-500">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="rounded-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
                >
                  Sign up
                </Link>
              </p>
      </form>
    </AuthShell>
  );
}

function PromoPanel() {
  return (
    <div className="relative hidden flex-col overflow-hidden bg-linear-to-br from-indigo-950 via-indigo-900 to-indigo-700 p-8 lg:flex xl:p-12">
      <div
        className="pointer-events-none absolute -left-28 -top-28 h-96 w-96 rounded-full bg-indigo-500/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-1/3 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center gap-3 pb-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 shadow-[inset_0px_2px_4px_1px_rgba(0,0,0,0.05)] backdrop-blur-sm">
            <CodeIcon className="h-4 w-5 text-indigo-200" />
          </span>
          <span className="text-2xl font-bold leading-8 text-white">
            SubmitFlow
          </span>
        </div>

        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-300/20 bg-indigo-400/10 px-3.5 py-1.5 text-xs font-medium leading-4 tracking-tight text-indigo-200 backdrop-blur-sm">
          <span
            className="h-2 w-2 rounded-full bg-emerald-400"
            aria-hidden="true"
          />
          System Operational &bull; Automatic Workspace Routing Active
        </p>

        <p className="max-w-lg text-balance text-4xl font-bold leading-tight text-white xl:text-5xl">
          Your projects deserve a better workflow.
        </p>

        <p className="max-w-md text-pretty text-base font-normal leading-6 text-indigo-100/80">
          Streamlined code submissions, instant automated checks, and
          structured mentor feedback in one unified workspace.
        </p>
      </div>

      <div className="relative z-10 mt-8 overflow-hidden rounded-2xl border border-white/20 bg-slate-900/40 shadow-2xl backdrop-blur-md">
        <div className="relative aspect-[423/224] w-full overflow-hidden">
          <Image
            src="/hero.png"
            alt="Priya Sharma's SubmitFlow project preview"
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 40vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/25 to-transparent" />

          <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-900/70 px-3 py-1 text-xs font-medium leading-4 text-white shadow-sm backdrop-blur-sm">
            <AcademicCapIcon className="h-3 w-3 text-emerald-400" />
            Student Spotlight
          </span>
          <span className="absolute right-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold leading-4 text-emerald-300 backdrop-blur-sm">
            <span
              className="h-2 w-2 rounded-full bg-emerald-400"
              aria-hidden="true"
            />
            Active Learner
          </span>

          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-base font-semibold leading-5 text-white">
                Priya Sharma
              </p>
              <p className="text-xs font-normal leading-4 text-indigo-200/90">
                CS Junior &bull; 14 Reviews Completed
              </p>
            </div>
            <span className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium leading-4 text-indigo-100 backdrop-blur-sm">
              100% CI Pass
            </span>
          </div>
        </div>

        <div className="flex gap-3 border-t border-white/10 bg-indigo-950/30 p-4">
          <QuoteIcon className="h-3 w-3 shrink-0 text-indigo-300" />
          <p className="text-pretty text-xs font-normal leading-5 text-indigo-100/90">
            &ldquo;SubmitFlow turned multi-day code reviews into instant mentor
            feedback. My project velocity tripled this semester.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2V16M2 14H18V4H2V14V14V14V14M5.5 13L4.1 11.6L6.675 9L4.075 6.4L5.5 5L9.5 9L5.5 13V13M10 13V11H16V13H10V13"
        fill="currentColor"
      />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.33333 10.6667C0.966667 10.6667 0.652778 10.5361 0.391667 10.275C0.130556 10.0139 0 9.7 0 9.33333V1.33333C0 0.966667 0.130556 0.652778 0.391667 0.391667C0.652778 0.130556 0.966667 0 1.33333 0H12C12.3667 0 12.6806 0.130556 12.9417 0.391667C13.2028 0.652778 13.3333 0.966667 13.3333 1.33333V9.33333C13.3333 9.7 13.2028 10.0139 12.9417 10.275C12.6806 10.5361 12.3667 10.6667 12 10.6667H1.33333V10.6667M6.66667 6L1.33333 2.66667V9.33333H12V2.66667L6.66667 6V6M6.66667 4.66667L12 1.33333H1.33333L6.66667 4.66667V4.66667"
        fill="currentColor"
      />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 17 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8.25 9C9.1875 9 9.98438 8.67188 10.6406 8.01562C11.2969 7.35938 11.625 6.5625 11.625 5.625C11.625 4.6875 11.2969 3.89062 10.6406 3.23438C9.98438 2.57812 9.1875 2.25 8.25 2.25C7.3125 2.25 6.51562 2.57812 5.85938 3.23438C5.20312 3.89062 4.875 4.6875 4.875 5.625C4.875 6.5625 5.20312 7.35938 5.85938 8.01562C6.51562 8.67188 7.3125 9 8.25 9V9M8.25 7.65C7.6875 7.65 7.20938 7.45312 6.81563 7.05937C6.42188 6.66562 6.225 6.1875 6.225 5.625C6.225 5.0625 6.42188 4.58438 6.81563 4.19063C7.20938 3.79688 7.6875 3.6 8.25 3.6C8.8125 3.6 9.29062 3.79688 9.68437 4.19063C10.0781 4.58438 10.275 5.0625 10.275 5.625C10.275 6.1875 10.0781 6.66562 9.68437 7.05937C9.29062 7.45312 8.8125 7.65 8.25 7.65V7.65M8.25 11.25C6.425 11.25 4.7625 10.7406 3.2625 9.72188C1.7625 8.70312 0.675 7.3375 0 5.625C0.675 3.9125 1.7625 2.54688 3.2625 1.52813C4.7625 0.509375 6.425 0 8.25 0C10.075 0 11.7375 0.509375 13.2375 1.52813C14.7375 2.54688 15.825 3.9125 16.5 5.625C15.825 7.3375 14.7375 8.70312 13.2375 9.72188C11.7375 10.7406 10.075 11.25 8.25 11.25V11.25M8.25 9.75C9.6625 9.75 10.9594 9.37812 12.1406 8.63437C13.3219 7.89062 14.225 6.8875 14.85 5.625C14.225 4.3625 13.3219 3.35938 12.1406 2.61562C10.9594 1.87187 9.6625 1.5 8.25 1.5C6.8375 1.5 5.54063 1.87187 4.35938 2.61562C3.17812 3.35938 2.275 4.3625 1.65 5.625C2.275 6.8875 3.17812 7.89062 4.35938 8.63437C5.54063 9.37812 6.8375 9.75 8.25 9.75V9.75"
        fill="currentColor"
      />
    </svg>
  );
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 17 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1 1L16 13M7.25 3.15C7.575 3.05 7.9125 3 8.25 3C9.6625 3 10.9594 3.37187 12.1406 4.11562C13.3219 4.85938 14.225 5.8625 14.85 7.125C14.4 7.95 13.8375 8.66875 13.1625 9.28125M4.4 3.9125C3.0875 4.7375 2.0375 5.80833 1.25 7.125C1.925 8.4375 2.8625 9.45937 4.0625 10.1906C5.2625 10.9219 6.65833 11.2875 8.25 11.2875C9.175 11.2875 10.075 11.1406 10.95 10.8469M6.825 5.325C6.525 5.6625 6.375 6.0625 6.375 6.525C6.375 7.0375 6.55937 7.475 6.92812 7.8375C7.29687 8.2 7.7375 8.38125 8.25 8.38125C8.7125 8.38125 9.1125 8.23125 9.45 7.93125"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.16667 12.25C0.845833 12.25 0.571181 12.1358 0.342708 11.9073C0.114236 11.6788 0 11.4042 0 11.0833V5.25C0 4.92917 0.114236 4.65451 0.342708 4.42604C0.571181 4.19757 0.845833 4.08333 1.16667 4.08333H1.75V2.91667C1.75 2.10972 2.03438 1.42188 2.60313 0.853125C3.17188 0.284375 3.85972 0 4.66667 0C5.47361 0 6.16146 0.284375 6.73021 0.853125C7.29896 1.42188 7.58333 2.10972 7.58333 2.91667V4.08333H8.16667C8.4875 4.08333 8.76215 4.19757 8.99063 4.42604C9.2191 4.65451 9.33333 4.92917 9.33333 5.25V11.0833C9.33333 11.4042 9.2191 11.6788 8.99063 11.9073C8.76215 12.1358 8.4875 12.25 8.16667 12.25H1.16667V12.25M1.16667 11.0833H8.16667V5.25H1.16667V11.0833V11.0833V11.0833V11.0833M4.66667 9.33333C4.9875 9.33333 5.26215 9.2191 5.49062 8.99063C5.7191 8.76215 5.83333 8.4875 5.83333 8.16667C5.83333 7.84583 5.7191 7.57118 5.49062 7.34271C5.26215 7.11424 4.9875 7 4.66667 7C4.34583 7 4.07118 7.11424 3.84271 7.34271C3.61424 7.57118 3.5 7.84583 3.5 8.16667C3.5 8.4875 3.61424 8.76215 3.84271 8.99063C4.07118 9.2191 4.34583 9.33333 4.66667 9.33333V9.33333M2.91667 4.08333H6.41667V2.91667C6.41667 2.43056 6.24653 2.01736 5.90625 1.67708C5.56597 1.33681 5.15278 1.16667 4.66667 1.16667C4.18056 1.16667 3.76736 1.33681 3.42708 1.67708C3.08681 2.01736 2.91667 2.43056 2.91667 2.91667V4.08333V4.08333"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8.11667 6H0V4.66667H8.11667L4.38333 0.933333L5.33333 0L10.6667 5.33333L5.33333 10.6667L4.38333 9.73333L8.11667 6V6"
        fill="currentColor"
      />
    </svg>
  );
}

function AcademicCapIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 13 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6.41667 10.5L2.33333 8.28333V4.78333L0 3.5L6.41667 0L12.8333 3.5V8.16667H11.6667V4.14167L10.5 4.78333V8.28333L6.41667 10.5V10.5M6.41667 5.65833L10.4125 3.5L6.41667 1.34167L2.42083 3.5L6.41667 5.65833V5.65833M6.41667 9.17292L9.33333 7.59792V5.39583L6.41667 7L3.5 5.39583V7.59792L6.41667 9.17292V9.17292"
        fill="currentColor"
      />
    </svg>
  );
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 13 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.275 11L3 8C2.175 8 1.46875 7.70625 0.88125 7.11875C0.29375 6.53125 0 5.825 0 5C0 4.175 0.29375 3.46875 0.88125 2.88125C1.46875 2.29375 2.175 2 3 2C3.825 2 4.53125 2.29375 5.11875 2.88125C5.70625 3.46875 6 4.175 6 5C6 5.2875 5.96562 5.55312 5.89687 5.79688C5.82812 6.04063 5.725 6.275 5.5875 6.5L3 11H1.275V11M8.025 11L9.75 8C8.925 8 8.21875 7.70625 7.63125 7.11875C7.04375 6.53125 6.75 5.825 6.75 5C6.75 4.175 7.04375 3.46875 7.63125 2.88125C8.21875 2.29375 8.925 2 9.75 2C10.575 2 11.2812 2.29375 11.8687 2.88125C12.4562 3.46875 12.75 4.175 12.75 5C12.75 5.2875 12.7156 5.55312 12.6469 5.79688C12.5781 6.04063 12.475 6.275 12.3375 6.5L9.75 11H8.025V11M3 6.125C3.3125 6.125 3.57812 6.01562 3.79688 5.79688C4.01562 5.57812 4.125 5.3125 4.125 5C4.125 4.6875 4.01562 4.42188 3.79688 4.20312C3.57812 3.98438 3.3125 3.875 3 3.875C2.6875 3.875 2.42188 3.98438 2.20312 4.20312C1.98438 4.42188 1.875 4.6875 1.875 5C1.875 5.3125 1.98438 5.57812 2.20312 5.79688C2.42188 6.01562 2.6875 6.125 3 6.125V6.125M9.75 6.125C10.0625 6.125 10.3281 6.01562 10.5469 5.79688C10.7656 5.57812 10.875 5.3125 10.875 5C10.875 4.6875 10.7656 4.42188 10.5469 4.20312C10.3281 3.98438 10.0625 3.875 9.75 3.875C9.4375 3.875 9.17188 3.98438 8.95312 4.20312C8.73438 4.42188 8.625 4.6875 8.625 5C8.625 5.3125 8.73438 5.57812 8.95312 5.79688C9.17188 6.01562 9.4375 6.125 9.75 6.125V6.125"
        fill="currentColor"
      />
    </svg>
  );
}
