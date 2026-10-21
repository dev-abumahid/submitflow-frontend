import Link from "next/link";
import { LogoMark } from "@/components/shared/logo";

type FooterLink = {
  label: string;
  href: string;
};

const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Workflow Engine", href: "/#how-it-works" },
      { label: "Audit Logs", href: "/audit-logs" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/docs/api" },
      { label: "FAQ", href: "/#faq" },
      { label: "Security & SOC 2", href: "/security" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Changelog", href: "/changelog" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const legalLinks: FooterLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Status", href: "/status" },
];

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="w-full bg-blue-50 shadow-[0px_-1px_8px_0px_rgba(15,23,42,0.03)]">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2">
            <Link
              href="/"
              aria-label="SubmitFlow home"
              className="inline-flex items-center gap-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-50"
            >
              <LogoMark className="h-5 w-5" />
              <span className="font-serif text-base font-bold leading-6 text-slate-900">
                SubmitFlow
              </span>
            </Link>

            <p className="mt-2 max-w-sm text-pretty text-xs font-normal leading-4 text-gray-700">
              High-velocity submission workflows, automated compliance audits,
              and real-time approval pipelines built for modern engineering and
              product teams.
            </p>

            <p className="mt-3 flex items-center gap-1 text-xs font-semibold leading-4 tracking-tight text-gray-700">
              <span
                className="h-2 w-2 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
              All systems operational
            </p>
          </div>

          {footerColumns.map((column) => (
            <FooterColumn key={column.title} column={column} />
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-slate-200/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium leading-4 text-gray-700">
            &copy; {currentYear} SubmitFlow Inc. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-sm text-xs font-medium leading-4 text-gray-700 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  column,
}: {
  column: { title: string; links: FooterLink[] };
}) {
  return (
    <div>
      <h3 className="text-xs font-medium uppercase leading-4 tracking-wide text-slate-900">
        {column.title}
      </h3>
      <ul className="mt-2 flex flex-col gap-1">
        {column.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-block rounded-sm py-0.5 text-xs font-normal leading-4 text-gray-700 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-50"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
