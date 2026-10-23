const faqs = [
  {
    question: "What information is required to submit a project?",
    answer:
      "Students submit four core fields: Project Name (1–200 characters), Public Git Repository URL, Live Preview Deployment URL (both starting with http:// or https://), and a Project Description (1–5000 characters).",
  },
  {
    question: "Can I edit my project after submitting?",
    answer:
      "Yes, as long as your project status is PENDING. Once a mentor begins auditing your submission and marks it IN_PROGRESS, REJECTED, or APPROVED, the submission is locked from further edits to maintain grading consistency.",
  },
  {
    question: "How does the mentor review process work?",
    answer:
      "Mentors have a dedicated Review Dashboard where they can access all student submissions, test the live deployment URL, inspect the source code, and assign a verdict (IN_PROGRESS, APPROVED, or REJECTED) accompanied by qualitative feedback.",
  },
  {
    question: "Will I stay logged in if I reload the webpage?",
    answer:
      "Yes! SubmitFlow uses secure token rotation with httpOnly cookies and client persistence. When you refresh the website, your session automatically validates in the background with zero logout disruptions.",
  },
  {
    question: "What account roles are supported?",
    answer:
      "SubmitFlow supports two distinct roles: STUDENT (can submit projects, track evaluation status, and view feedback) and MENTOR (can view all submissions, search/filter by status or student, and submit formal reviews).",
  },
] as const;

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="w-full py-16 scroll-mt-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xs font-semibold uppercase leading-4 tracking-wide text-indigo-700">
            Frequently Asked Questions
          </p>
          <h2
            id="faq-heading"
            className="text-balance font-serif text-3xl font-bold text-slate-900"
          >
            Everything you need to know about SubmitFlow
          </h2>
          <p className="max-w-xl text-pretty text-sm text-gray-600">
            Find answers to common questions about project submission rules, mentor reviews, and account permissions.
          </p>
        </div>

        <ul className="flex w-full flex-col gap-3">
          {faqs.map((faq) => (
            <li key={faq.question}>
              <details className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-inset ring-slate-200/70 transition-all hover:ring-slate-300">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600 [&::-webkit-details-marker]:hidden">
                  <span className="text-left text-base font-semibold leading-6 text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDownIcon className="h-2 w-3 shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5">
                  <p className="border-t border-slate-100 pt-4 text-sm leading-6 text-gray-600">
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
