import Link from "next/link";

const actions = [
  {
    label: "Get Started Now",
    href: "/sign-up",
    variant: "primary",
    icon: "arrow",
  },
  {
    label: "Book Cohort Demo",
    href: "/book-demo",
    variant: "secondary",
    icon: "calendar",
  },
] as const;

const actionStyles = {
  primary:
    "bg-white text-indigo-700 shadow-md hover:bg-indigo-50 focus-visible:ring-white",
  secondary:
    "border border-white/40 text-white hover:bg-white/10 focus-visible:ring-white",
} as const;

export function Cta() {
  return (
    <section aria-labelledby="cta-heading" className="w-full">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-indigo-700 to-indigo-600 p-6 shadow-xl sm:p-10 lg:p-14">
          <div
            className="pointer-events-none absolute -right-24 -top-16 h-80 w-80 rounded-full bg-white/10 blur-[20px]"
            aria-hidden="true"
          />

          <div className="relative flex max-w-2xl flex-col items-start gap-4">
            <p className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase leading-4 tracking-wide text-white">
              Accelerate student growth
            </p>

            <h2
              id="cta-heading"
              className="text-balance font-serif text-3xl font-bold leading-tight text-white sm:text-4xl sm:leading-10"
            >
              Ready to streamline your cohort&apos;s project submissions?
            </h2>

            <p className="text-pretty text-sm font-normal leading-6 text-indigo-100 sm:text-base">
              Empower your students with structured code reviews, automated CI
              pre-flight checks, and lightning-fast mentor milestone feedback.
            </p>

            <div className="flex w-full flex-col items-stretch gap-3 pt-4 sm:w-auto sm:flex-row sm:items-center">
              {actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`inline-flex items-center justify-center gap-1 rounded-lg px-7 py-3.5 text-sm font-medium leading-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-700 ${actionStyles[action.variant]}`}
                >
                  {action.icon === "calendar" && (
                    <CalendarIcon className="h-4 w-3.5" />
                  )}
                  {action.label}
                  {action.icon === "arrow" && (
                    <ArrowRightIcon className="h-3 w-3" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9.13125 6.75H0V5.25H9.13125L4.93125 1.05L6 0L12 6L6 12L4.93125 10.95L9.13125 6.75V6.75"
        fill="currentColor"
      />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.5 15C1.0875 15 0.734375 14.8531 0.440625 14.5594C0.146875 14.2656 0 13.9125 0 13.5V3C0 2.5875 0.146875 2.23438 0.440625 1.94062C0.734375 1.64687 1.0875 1.5 1.5 1.5H2.25V0H3.75V1.5H9.75V0H11.25V1.5H12C12.4125 1.5 12.7656 1.64687 13.0594 1.94062C13.3531 2.23438 13.5 2.5875 13.5 3V13.5C13.5 13.9125 13.3531 14.2656 13.0594 14.5594C12.7656 14.8531 12.4125 15 12 15H1.5V15M1.5 13.5H12V6H1.5V13.5V13.5V13.5V13.5M1.5 4.5H12V3H1.5V4.5V4.5M6.75 9C6.5375 9 6.35938 8.92813 6.21562 8.78438C6.07187 8.64062 6 8.4625 6 8.25C6 8.0375 6.07187 7.85938 6.21562 7.71562C6.35938 7.57187 6.5375 7.5 6.75 7.5C6.9625 7.5 7.14062 7.57187 7.28438 7.71562C7.42813 7.85938 7.5 8.0375 7.5 8.25C7.5 8.4625 7.42813 8.64062 7.28438 8.78438C7.14062 8.92813 6.9625 9 6.75 9V9M3.75 9C3.5375 9 3.35938 8.92813 3.21563 8.78438C3.07188 8.64062 3 8.4625 3 8.25C3 8.0375 3.07188 7.85938 3.21563 7.71562C3.35938 7.57187 3.5375 7.5 3.75 7.5C3.9625 7.5 4.14062 7.57187 4.28438 7.71562C4.42813 7.85938 4.5 8.0375 4.5 8.25C4.5 8.4625 4.42813 8.64062 4.28438 8.78438C4.14062 8.92813 3.9625 9 3.75 9V9M9.75 9C9.5375 9 9.35938 8.92813 9.21562 8.78438C9.07187 8.64062 9 8.4625 9 8.25C9 8.0375 9.07187 7.85938 9.21562 7.71562C9.35938 7.57187 9.5375 7.5 9.75 7.5C9.9625 7.5 10.1406 7.57187 10.2844 7.71562C10.4281 7.85938 10.5 8.0375 10.5 8.25C10.5 8.4625 10.4281 8.64062 10.2844 8.78438C10.1406 8.92813 9.9625 9 9.75 9V9M6.75 12C6.5375 12 6.35938 11.9281 6.21562 11.7844C6.07187 11.6406 6 11.4625 6 11.25C6 11.0375 6.07187 10.8594 6.21562 10.7156C6.35938 10.5719 6.5375 10.5 6.75 10.5C6.9625 10.5 7.14062 10.5719 7.28438 10.7156C7.42813 10.8594 7.5 11.0375 7.5 11.25C7.5 11.4625 7.42813 11.6406 7.28438 11.7844C7.14062 11.9281 6.9625 12 6.75 12V12M3.75 12C3.5375 12 3.35938 11.9281 3.21563 11.7844C3.07188 11.6406 3 11.4625 3 11.25C3 11.0375 3.07188 10.8594 3.21563 10.7156C3.35938 10.5719 3.5375 10.5 3.75 10.5C3.9625 10.5 4.14062 10.5719 4.28438 10.7156C4.42813 10.8594 4.5 11.0375 4.5 11.25C4.5 11.4625 4.42813 11.6406 4.28438 11.7844C4.14062 11.9281 3.9625 12 3.75 12V12"
        fill="currentColor"
      />
    </svg>
  );
}
