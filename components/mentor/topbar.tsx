"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BellIcon,
  CalendarIcon,
  ChevronRightIcon,
  MenuIcon,
} from "@/components/dashboard/icons";
import {
  mentorProfile,
  mentorTodayLabel,
} from "@/components/mentor/profile";

const pageLabels: Record<string, string> = {
  "/mentor/dashboard": "Review Dashboard",
  "/mentor/reviews": "Project Reviews",
  "/mentor/profile": "Profile",
};

export function MentorTopbar({
  onOpenSidebar,
}: {
  onOpenSidebar: () => void;
}) {
  const pathname = usePathname();
  const pageTitle = pathname.startsWith("/mentor/reviews/")
    ? "Project Reviews"
    : (pageLabels[pathname] ?? "Review Dashboard");

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-slate-200/60 bg-white/80 px-4 shadow-[0px_1px_8px_0px_rgba(0,0,0,0.04)] backdrop-blur-md sm:px-5">
      <div className="flex min-w-0 items-center gap-2">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="Open navigation menu"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 lg:hidden"
        >
          <MenuIcon className="h-5 w-5" />
        </button>

        <nav aria-label="Breadcrumb" className="min-w-0">
          <ol className="flex min-w-0 items-center gap-1">
            <li className="hidden items-center gap-1 sm:flex">
              <Link
                href="/mentor/dashboard"
                className="rounded-sm text-xs font-medium leading-4 text-gray-700 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              >
                Workspace
              </Link>
              <ChevronRightIcon className="h-2.5 w-2.5 text-gray-500" />
            </li>
            <li className="truncate text-xs font-semibold leading-4 text-slate-900">
              {pageTitle}
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <span className="hidden items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold leading-4 tracking-tight text-gray-700 md:inline-flex">
          <CalendarIcon className="h-3.5 w-3.5 text-gray-700" />
          {mentorTodayLabel}
        </span>

        <button
          type="button"
          aria-label="Notifications, 1 unread"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
        >
          <BellIcon className="h-4 w-4" />
          <span
            className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-indigo-700 ring-2 ring-white"
            aria-hidden="true"
          />
        </button>

        <Link
          href="/mentor/profile"
          aria-label={`Open account menu for ${mentorProfile.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-700 text-xs font-semibold leading-4 tracking-tight text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors hover:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
        >
          {mentorProfile.initials}
        </Link>
      </div>
    </header>
  );
}
