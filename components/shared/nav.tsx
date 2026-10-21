"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Metrics", href: "/#metrics" },
  { label: "FAQ", href: "/#faq" },
] as const;

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-slate-50/90 shadow-[0px_1px_8px_0px_rgba(15,23,42,0.04)] backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10"
      >
        <div className="flex items-center gap-5">
          <Link
            href="/"
            aria-label="SubmitFlow home"
            className="flex items-center gap-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
          >
            <LogoMark className="h-[22px] w-[22px]" />
            <span className="font-serif text-lg font-bold leading-6 text-slate-900">
              SubmitFlow
            </span>
          </Link>

          <div className="hidden items-center gap-5 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-sm text-sm font-medium leading-5 text-gray-700 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/sign-in"
            className="rounded-lg px-3 py-2 text-sm font-medium leading-5 text-gray-700 transition-colors hover:bg-slate-200/70 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
          >
            Sign In
          </Link>
          <Link
            href="/get-started"
            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium leading-5 text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
          >
            Get Started
          </Link>
          <Link
            href="/account"
            aria-label="Account"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-700 text-white transition-colors hover:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
          >
            <UserIcon className="h-3 w-3" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 md:hidden"
        >
          {isOpen ? (
            <CloseIcon className="h-5 w-5" />
          ) : (
            <MenuIcon className="h-5 w-5" />
          )}
        </button>
      </nav>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-slate-200/70 px-4 pb-6 pt-4 sm:px-6 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-slate-200/70 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-slate-200/70 pt-4">
            <Link
              href="/sign-in"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-slate-200/70 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            >
              Sign In
            </Link>
            <Link
              href="/get-started"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-indigo-600 px-3 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10.8333 21.6667C9.33472 21.6667 7.92639 21.3823 6.60833 20.8135C5.29028 20.2448 4.14375 19.4729 3.16875 18.4979C2.19375 17.5229 1.42188 16.3764 0.853125 15.0583C0.284375 13.7403 0 12.3319 0 10.8333C0 9.33472 0.284375 7.92639 0.853125 6.60833C1.42188 5.29028 2.19375 4.14375 3.16875 3.16875C4.14375 2.19375 5.29028 1.42188 6.60833 0.853125C7.92639 0.284375 9.33472 0 10.8333 0C12.0069 0 13.1174 0.171528 14.1646 0.514583C15.2118 0.857639 16.1778 1.33611 17.0625 1.95L15.4917 3.54792C14.8056 3.11458 14.0743 2.77604 13.2979 2.53229C12.5215 2.28854 11.7 2.16667 10.8333 2.16667C8.43194 2.16667 6.38715 3.01076 4.69896 4.69896C3.01076 6.38715 2.16667 8.43194 2.16667 10.8333C2.16667 13.2347 3.01076 15.2795 4.69896 16.9677C6.38715 18.6559 8.43194 19.5 10.8333 19.5C13.2347 19.5 15.2795 18.6559 16.9677 16.9677C18.6559 15.2795 19.5 13.2347 19.5 10.8333C19.5 10.5083 19.4819 10.1833 19.4458 9.85833C19.4097 9.53333 19.3556 9.21736 19.2833 8.91042L21.0438 7.15C21.2424 7.72778 21.3958 8.32361 21.5042 8.9375C21.6125 9.55139 21.6667 10.1833 21.6667 10.8333C21.6667 12.3319 21.3823 13.7403 20.8135 15.0583C20.2448 16.3764 19.4729 17.5229 18.4979 18.4979C17.5229 19.4729 16.3764 20.2448 15.0583 20.8135C13.7403 21.3823 12.3319 21.6667 10.8333 21.6667V21.6667M9.31667 15.8167L4.7125 11.2125L6.22917 9.69583L9.31667 12.7833L20.15 1.92292L21.6667 3.43958L9.31667 15.8167V15.8167"
        fill="#3525CD"
      />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 6C5.175 6 4.46875 5.70625 3.88125 5.11875C3.29375 4.53125 3 3.825 3 3C3 2.175 3.29375 1.46875 3.88125 0.88125C4.46875 0.29375 5.175 0 6 0C6.825 0 7.53125 0.29375 8.11875 0.88125C8.70625 1.46875 9 2.175 9 3C9 3.825 8.70625 4.53125 8.11875 5.11875C7.53125 5.70625 6.825 6 6 6V6M0 12V9.9C0 9.475 0.109375 9.08437 0.328125 8.72812C0.546875 8.37187 0.8375 8.1 1.2 7.9125C1.975 7.525 2.7625 7.23438 3.5625 7.04063C4.3625 6.84688 5.175 6.75 6 6.75C6.825 6.75 7.6375 6.84688 8.4375 7.04063C9.2375 7.23438 10.025 7.525 10.8 7.9125C11.1625 8.1 11.4531 8.37187 11.6719 8.72812C11.8906 9.08437 12 9.475 12 9.9V12H0V12M1.5 10.5H10.5V9.9C10.5 9.7625 10.4656 9.6375 10.3969 9.525C10.3281 9.4125 10.2375 9.325 10.125 9.2625C9.45 8.925 8.76875 8.67188 8.08125 8.50313C7.39375 8.33438 6.7 8.25 6 8.25C5.3 8.25 4.60625 8.33438 3.91875 8.50313C3.23125 8.67188 2.55 8.925 1.875 9.2625C1.7625 9.325 1.67188 9.4125 1.60312 9.525C1.53437 9.6375 1.5 9.7625 1.5 9.9V10.5V10.5M6 4.5C6.4125 4.5 6.76562 4.35312 7.05937 4.05937C7.35312 3.76562 7.5 3.4125 7.5 3C7.5 2.5875 7.35312 2.23438 7.05937 1.94062C6.76562 1.64687 6.4125 1.5 6 1.5C5.5875 1.5 5.23438 1.64687 4.94063 1.94062C4.64688 2.23438 4.5 2.5875 4.5 3C4.5 3.4125 4.64688 3.76562 4.94063 4.05937C5.23438 4.35312 5.5875 4.5 6 4.5V4.5M6 3V3V3V3V3V3V3V3V3V3M6 10.5V10.5V10.5V10.5V10.5V10.5V10.5V10.5V10.5V10.5V10.5V10.5V10.5"
        fill="currentColor"
      />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
