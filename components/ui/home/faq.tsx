const faqs = [
  {
    question: "How does the single submission guardrail work?",
    answer:
      "Each student gets one active submission per milestone. Re-submissions require a mentor override, which prevents duplicate reviews and last-minute resubmission spam.",
  },
  {
    question: "What automated checks are performed on student repos?",
    answer:
      "SubmitFlow verifies the GitHub repository is public, runs the configured build and test suites, checks the HTTPS preview endpoint, and validates required project files.",
  },
  {
    question: "How do mentors track evaluation SLAs?",
    answer:
      "Every submission shows a live countdown. Mentors and program leads are alerted before an SLA is breached, with a dashboard highlighting the reviews most at risk.",
  },
  {
    question: "Can custom rubrics and grading criteria be imported?",
    answer:
      "Yes. Teams can import existing rubrics from CSV or build weighted criteria directly in the rubric editor, then reuse them across cohorts and milestones.",
  },
  {
    question: "Is SubmitFlow compatible with monorepos and microservices?",
    answer:
      "Yes. Configure the target package and preview service for each project. SubmitFlow runs checks against the correct workspace while still validating the full build.",
  },
] as const;

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="w-full">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xs font-semibold uppercase leading-4 tracking-wide text-indigo-700">
            Got questions?
          </p>
          <h2
            id="faq-heading"
            className="text-balance font-serif text-2xl font-bold leading-8 text-slate-900"
          >
            Frequently Asked Questions
          </h2>
          <p className="max-w-xl text-pretty text-sm font-normal leading-5 text-gray-700">
            Everything you need to know about implementing SubmitFlow in your
            organization.
          </p>
        </div>

        <ul className="flex w-full flex-col gap-3">
          {faqs.map((faq) => (
            <li key={faq.question}>
              <details className="group overflow-hidden rounded-xl bg-white shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600 [&::-webkit-details-marker]:hidden">
                  <span className="text-left text-base font-semibold leading-6 text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDownIcon className="h-2 w-3 shrink-0 text-[#464555] transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5">
                  <p className="border-t border-slate-100 pt-4 text-sm font-normal leading-6 text-gray-700">
                    {faq.answer}
                  </p>
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M6 7.4L0 1.4L1.4 0L6 4.6L10.6 0L12 1.4L6 7.4V7.4" fill="currentColor" />
    </svg>
  );
}
