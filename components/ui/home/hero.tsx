import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const trustedBy = [
  { label: "SU", className: "bg-indigo-100 text-indigo-700" },
  { label: "MIT", className: "bg-purple-200 text-violet-700" },
  { label: "UCB", className: "bg-blue-100 text-gray-700" },
  { label: "CMU", className: "bg-indigo-100 text-gray-600" },
] as const;

const testResults = [
  "JWT Refresh & CSRF Guard",
  "PostgreSQL Migration Plan",
  "Docker Compose Integration",
  "Swagger / OpenAPI Docs",
] as const;

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="w-full">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-4 pb-16 pt-8 sm:gap-12 sm:px-6 lg:px-10">
        <div className="flex w-full max-w-4xl flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-1 rounded-full border border-slate-300/40 bg-sky-100 px-3 py-1 shadow-sm">
            <span
              className="h-2 w-2 rounded-full bg-indigo-600"
              aria-hidden="true"
            />
            <span className="text-xs font-medium leading-4 text-gray-700">
              Cohort Milestone Reviews &bull; Version 2.4 Live
            </span>
            <ArrowRightIcon className="h-2.5 w-2.5 text-indigo-700" />
          </div>

          <h1
            id="hero-heading"
            className="text-balance font-serif text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl sm:leading-[60px]"
          >
            The modern submission &amp; review platform for{" "}
            <span className="text-indigo-700">engineering cohorts</span>.
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-6 text-gray-700">
            SubmitFlow bridges student developers and senior mentors with
            automated GitHub verification, live preview health-checks,
            rubric-driven feedback, and sub-24h evaluation SLAs.
          </p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/sign-up"
              className="inline-flex w-full items-center justify-center gap-1 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium leading-5 text-white shadow-md transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 sm:w-auto"
            >
              Start Free Trial
              <LightningIcon className="h-4 w-3 text-white" />
            </Link>
            <Link
              href="/#how-it-works"
              className="inline-flex w-full items-center justify-center gap-1 rounded-lg border border-slate-300/50 bg-white px-6 py-3 text-sm font-medium leading-5 text-slate-900 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 sm:w-auto"
            >
              <PlayIcon className="h-4 w-4 text-indigo-700" />
              Watch Interactive Demo
            </Link>
          </div>

          <div className="mt-10 flex flex-col items-center gap-2 sm:flex-row">
            <div className="flex -space-x-2" aria-hidden="true">
              {trustedBy.map((school) => (
                <span
                  key={school.label}
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-slate-50 text-[10px] font-bold leading-4 ${school.className}`}
                >
                  {school.label}
                </span>
              ))}
            </div>
            <p className="text-center text-xs font-medium leading-4 text-gray-700">
              Trusted by engineering leads and mentors at{" "}
              <span className="font-bold">
                450+ universities &amp; bootcamps
              </span>
            </p>
          </div>
        </div>

        <ReviewPreview />
      </div>
    </section>
  );
}

function ReviewPreview() {
  return (
    <div className="w-full rounded-2xl bg-sky-100 p-2 shadow-xl shadow-slate-900/5 sm:p-3">
      <div className="overflow-hidden rounded-xl bg-white p-3 sm:p-6">
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200/70 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-serif text-lg font-bold leading-6 text-slate-900">
                  Milestone #4: Microservices Auth API
                </h2>
                <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-semibold leading-4 tracking-tight text-violet-950">
                  Cohort A4
                </span>
              </div>
              <p className="mt-1 text-xs font-normal leading-4 text-gray-700">
                Reviewer: Marcus Vance (Principal Architect @ Stripe)
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold leading-4 tracking-tight text-slate-900">
              <ClockIcon className="h-3.5 w-3 text-indigo-700" />
              SLA: 14h remaining
            </span>
          </div>

          <div className="rounded-xl bg-blue-50 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-4 w-4 text-indigo-700" />
                <h3 className="text-sm font-semibold leading-5 text-slate-900">
                  Automated Test Matrix
                </h3>
              </div>
              <p className="text-xs font-semibold leading-4 text-emerald-600">
                36 / 36 Passing (100%)
              </p>
            </div>

            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-sky-100">
              <div className="h-full w-full rounded-full bg-linear-to-r from-indigo-700 to-emerald-500" />
            </div>

            <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
              {testResults.map((result) => (
                <li
                  key={result}
                  className="flex items-center gap-2 rounded-sm bg-white p-2 text-xs font-medium leading-4 text-slate-900"
                >
                  <CheckListIcon className="h-3.5 w-3 shrink-0 text-emerald-600" />
                  {result}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-slate-200/70 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <ChatIcon className="h-4 w-4 text-indigo-700" />
                <h3 className="text-xs font-semibold leading-4 text-indigo-700">
                  Mentor Verdict
                </h3>
              </div>
              <p className="mt-1 max-w-lg text-xs font-normal leading-4 text-gray-700">
                &ldquo;Remarkably clean session revocation handling. Commits are
                well atomic with thorough regression test suites.&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-lg font-bold leading-6 text-slate-900">
                  98 / 100
                </p>
                <p className="text-xs font-medium leading-4 tracking-tight text-emerald-600">
                  Exceeds Rubric
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold leading-4 text-white shadow-sm">
                <DoubleCheckIcon className="h-2.5 w-4 text-white" />
                Approve
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-blue-50 p-3 sm:p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-red-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="pl-2 font-mono text-xs font-normal leading-4 text-gray-700">
                stanford-cs-hub // milestone-04
              </span>
            </div>
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold leading-4 tracking-tight text-emerald-600">
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
              Verified
            </span>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-center">
            <div className="relative overflow-hidden rounded-xl bg-slate-900 shadow-sm">
              <Image
                src="/hero.png"
                alt="SubmitFlow submission preview for Priya Sharma"
                width={423}
                height={224}
                className="h-56 w-full object-cover"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                <div>
                  <p className="font-serif text-base font-bold leading-6 text-white">
                    Priya Sharma
                  </p>
                  <p className="text-xs font-normal leading-4 text-blue-100">
                    Full-Stack Cloud Cohort &bull; Fall &apos;25
                  </p>
                </div>
                <span className="rounded-sm bg-indigo-600 px-2 py-1 text-xs font-normal leading-4 text-white">
                  PR #108
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 lg:justify-center">
              <StatusRow
                icon={<VerifiedIcon className="h-4 w-4 text-emerald-500" />}
                label="Public GitHub Repo Verified"
                value="2m ago"
              />
              <StatusRow
                icon={<LinkIcon className="h-4 w-2 text-emerald-500" />}
                label="HTTPS Preview Endpoint 200 OK"
                value="142ms"
                valueClassName="text-emerald-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusRow({
  icon,
  label,
  value,
  valueClassName = "text-gray-700",
}: {
  icon: ReactNode;
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-white p-3 shadow-sm">
      <div className="flex min-w-0 items-center gap-2">
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
        <span className="truncate text-xs font-medium leading-4 text-slate-900">
          {label}
        </span>
      </div>
      <span
        className={`shrink-0 font-mono text-xs font-normal leading-4 ${valueClassName}`}
      >
        {value}
      </span>
    </div>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7.10208 5.25H0V4.08333H7.10208L3.83542 0.816667L4.66667 0L9.33333 4.66667L4.66667 9.33333L3.83542 8.51667L7.10208 5.25V5.25"
        fill="currentColor"
      />
    </svg>
  );
}

function LightningIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4.9125 12.15L8.79375 7.5H5.79375L6.3375 3.24375L2.86875 8.25H5.475L4.9125 12.15V12.15M3 15L3.75 9.75H0L6.75 0H8.25L7.5 6H12L4.5 15H3V15"
        fill="currentColor"
      />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6.25 12.0833L12.0833 8.33333L6.25 4.58333V12.0833V12.0833M8.33333 16.6667C7.18056 16.6667 6.09722 16.4479 5.08333 16.0104C4.06944 15.5729 3.1875 14.9792 2.4375 14.2292C1.6875 13.4792 1.09375 12.5972 0.65625 11.5833C0.21875 10.5694 0 9.48611 0 8.33333C0 7.18056 0.21875 6.09722 0.65625 5.08333C1.09375 4.06944 1.6875 3.1875 2.4375 2.4375C3.1875 1.6875 4.06944 1.09375 5.08333 0.65625C6.09722 0.21875 7.18056 0 8.33333 0C9.48611 0 10.5694 0.21875 11.5833 0.65625C12.5972 1.09375 13.4792 1.6875 14.2292 2.4375C14.9792 3.1875 15.5729 4.06944 16.0104 5.08333C16.4479 6.09722 16.6667 7.18056 16.6667 8.33333C16.6667 9.48611 16.4479 10.5694 16.0104 11.5833C15.5729 12.5972 14.9792 13.4792 14.2292 14.2292C13.4792 14.9792 12.5972 15.5729 11.5833 16.0104C10.5694 16.4479 9.48611 16.6667 8.33333 16.6667V16.6667M8.33333 15C10.1944 15 11.7708 14.3542 13.0625 13.0625C14.3542 11.7708 15 10.1944 15 8.33333C15 6.47222 14.3542 4.89583 13.0625 3.60417C11.7708 2.3125 10.1944 1.66667 8.33333 1.66667C6.47222 1.66667 4.89583 2.3125 3.60417 3.60417C2.3125 4.89583 1.66667 6.47222 1.66667 8.33333C1.66667 10.1944 2.3125 11.7708 3.60417 13.0625C4.89583 14.3542 6.47222 15 8.33333 15V15"
        fill="currentColor"
      />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 1.33333V0H8V1.33333H4V1.33333M5.33333 8.66667H6.66667V4.66667H5.33333V8.66667V8.66667M6 14C5.17778 14 4.40278 13.8417 3.675 13.525C2.94722 13.2083 2.31111 12.7778 1.76667 12.2333C1.22222 11.6889 0.791667 11.0528 0.475 10.325C0.158333 9.59722 0 8.82222 0 8C0 7.17778 0.158333 6.40278 0.475 5.675C0.791667 4.94722 1.22222 4.31111 1.76667 3.76667C2.31111 3.22222 2.94722 2.79167 3.675 2.475C4.40278 2.15833 5.17778 2 6 2C6.68889 2 7.35 2.11111 7.98333 2.33333C8.61667 2.55556 9.21111 2.87778 9.76667 3.3L10.7 2.36667L11.6333 3.3L10.7 4.23333C11.1222 4.78889 11.4444 5.38333 11.6667 6.01667C11.8889 6.65 12 7.31111 12 8C12 8.82222 11.8417 9.59722 11.525 10.325C11.2083 11.0528 10.7778 11.6889 10.2333 12.2333C9.68889 12.7778 9.05278 13.2083 8.325 13.525C7.59722 13.8417 6.82222 14 6 14V14M6 12.6667C7.28889 12.6667 8.38889 12.2111 9.3 11.3C10.2111 10.3889 10.6667 9.28889 10.6667 8C10.6667 6.71111 10.2111 5.61111 9.3 4.7C8.38889 3.78889 7.28889 3.33333 6 3.33333C4.71111 3.33333 3.61111 3.78889 2.7 4.7C1.78889 5.61111 1.33333 6.71111 1.33333 8C1.33333 9.28889 1.78889 10.3889 2.7 11.3C3.61111 12.2111 4.71111 12.6667 6 12.6667V12.6667"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7.16667 12.1667L13.0417 6.29167L11.875 5.125L7.16667 9.83333L4.79167 7.45833L3.625 8.625L7.16667 12.1667V12.1667M8.33333 16.6667C7.18056 16.6667 6.09722 16.4479 5.08333 16.0104C4.06944 15.5729 3.1875 14.9792 2.4375 14.2292C1.6875 13.4792 1.09375 12.5972 0.65625 11.5833C0.21875 10.5694 0 9.48611 0 8.33333C0 7.18056 0.21875 6.09722 0.65625 5.08333C1.09375 4.06944 1.6875 3.1875 2.4375 2.4375C3.1875 1.6875 4.06944 1.09375 5.08333 0.65625C6.09722 0.21875 7.18056 0 8.33333 0C9.48611 0 10.5694 0.21875 11.5833 0.65625C12.5972 1.09375 13.4792 1.6875 14.2292 2.4375C14.9792 3.1875 15.5729 4.06944 16.0104 5.08333C16.4479 6.09722 16.6667 7.18056 16.6667 8.33333C16.6667 9.48611 16.4479 10.5694 16.0104 11.5833C15.5729 12.5972 14.9792 13.4792 14.2292 14.2292C13.4792 14.9792 12.5972 15.5729 11.5833 16.0104C10.5694 16.4479 9.48611 16.6667 8.33333 16.6667V16.6667M8.33333 15C10.1944 15 11.7708 14.3542 13.0625 13.0625C14.3542 11.7708 15 10.1944 15 8.33333C15 6.47222 14.3542 4.89583 13.0625 3.60417C11.7708 2.3125 10.1944 1.66667 8.33333 1.66667C6.47222 1.66667 4.89583 2.3125 3.60417 3.60417C2.3125 4.89583 1.66667 6.47222 1.66667 8.33333C1.66667 10.1944 2.3125 11.7708 3.60417 13.0625C4.89583 14.3542 6.47222 15 8.33333 15V15"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckListIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 15 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9.3 12.0562L8.25 11.0063L10.2 9.05625L8.25 7.10625L9.3 6.05625L11.25 8.00625L13.2 6.05625L14.25 7.10625L12.3 9.05625L14.25 11.0063L13.2 12.0562L11.25 10.1062L9.3 12.0562V12.0562M10.7812 5.30625L8.11875 2.64375L9.16875 1.59375L10.7625 3.1875L13.95 0L15 1.06875L10.7812 5.30625V5.30625M0 9.80625V8.30625H6.75V9.80625H0V9.80625M0 3.80625V2.30625H6.75V3.80625H0V3.80625"
        fill="currentColor"
      />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 9H5.2875L9.0375 5.25C9.15 5.1375 9.23438 5.00938 9.29062 4.86562C9.34687 4.72187 9.375 4.58125 9.375 4.44375C9.375 4.30625 9.34375 4.17188 9.28125 4.04063C9.21875 3.90938 9.1375 3.7875 9.0375 3.675L8.3625 2.9625C8.25 2.85 8.125 2.76562 7.9875 2.70937C7.85 2.65312 7.70625 2.625 7.55625 2.625C7.41875 2.625 7.27813 2.65312 7.13438 2.70937C6.99062 2.76562 6.8625 2.85 6.75 2.9625L3 6.7125V9V9M4.125 7.875V7.1625L6.01875 5.26875L6.39375 5.60625L6.73125 5.98125L4.8375 7.875H4.125V7.875M6.88125 9H12V7.5H8.38125L6.88125 9V9M0 15V1.5C0 1.0875 0.146875 0.734375 0.440625 0.440625C0.734375 0.146875 1.0875 0 1.5 0H13.5C13.9125 0 14.2656 0.146875 14.5594 0.440625C14.8531 0.734375 15 1.0875 15 1.5V10.5C15 10.9125 14.8531 11.2656 14.5594 11.5594C14.2656 11.8531 13.9125 12 13.5 12H3L0 15V15M2.3625 10.5H13.5V1.5H1.5V11.3438L2.3625 10.5V10.5"
        fill="currentColor"
      />
    </svg>
  );
}

function DoubleCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 17 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4.2375 9.01875L0 4.78125L1.06875 3.73125L4.25625 6.91875L5.30625 7.96875L4.2375 9.01875V9.01875M8.475 9.01875L4.2375 4.78125L5.2875 3.7125L8.475 6.9L15.375 0L16.425 1.06875L8.475 9.01875V9.01875M8.475 4.78125L7.40625 3.73125L11.1187 0.01875L12.1875 1.06875L8.475 4.78125V4.78125"
        fill="currentColor"
      />
    </svg>
  );
}

function VerifiedIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5.7 15.75L4.275 13.35L1.575 12.75L1.8375 9.975L0 7.875L1.8375 5.775L1.575 3L4.275 2.4L5.7 0L8.25 1.0875L10.8 0L12.225 2.4L14.925 3L14.6625 5.775L16.5 7.875L14.6625 9.975L14.925 12.75L12.225 13.35L10.8 15.75L8.25 14.6625L5.7 15.75V15.75M6.3375 13.8375L8.25 13.0125L10.2 13.8375L11.25 12.0375L13.3125 11.55L13.125 9.45L14.5125 7.875L13.125 6.2625L13.3125 4.1625L11.25 3.7125L10.1625 1.9125L8.25 2.7375L6.3 1.9125L5.25 3.7125L3.1875 4.1625L3.375 6.2625L1.9875 7.875L3.375 9.45L3.1875 11.5875L5.25 12.0375L6.3375 13.8375V13.8375M7.4625 10.5375L11.7 6.3L10.65 5.2125L7.4625 8.4L5.85 6.825L4.8 7.875L7.4625 10.5375V10.5375"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 15 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6.75 7.5H3.75C2.7125 7.5 1.82812 7.13437 1.09687 6.40312C0.365625 5.67188 0 4.7875 0 3.75C0 2.7125 0.365625 1.82812 1.09687 1.09687C1.82812 0.365625 2.7125 0 3.75 0H6.75V1.5H3.75C3.125 1.5 2.59375 1.71875 2.15625 2.15625C1.71875 2.59375 1.5 3.125 1.5 3.75C1.5 4.375 1.71875 4.90625 2.15625 5.34375C2.59375 5.78125 3.125 6 3.75 6H6.75V7.5V7.5M4.5 4.5V3H10.5V4.5H4.5V4.5M8.25 7.5V6H11.25C11.875 6 12.4062 5.78125 12.8438 5.34375C13.2812 4.90625 13.5 4.375 13.5 3.75C13.5 3.125 13.2812 2.59375 12.8438 2.15625C12.4062 1.71875 11.875 1.5 11.25 1.5H8.25V0H11.25C12.2875 0 13.1719 0.365625 13.9031 1.09687C14.6344 1.82812 15 2.7125 15 3.75C15 4.7875 14.6344 5.67188 13.9031 6.40312C13.1719 7.13437 12.2875 7.5 11.25 7.5H8.25V7.5"
        fill="currentColor"
      />
    </svg>
  );
}
