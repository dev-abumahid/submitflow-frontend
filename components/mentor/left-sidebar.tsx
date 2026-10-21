"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import type { ComponentType } from "react";
import {
  ClipboardCheckIcon,
  CloseIcon,
  GridIcon,
  LayersIcon,
  LogOutIcon,
  UserIcon,
  type IconProps,
} from "@/components/dashboard/icons";
import { mentorProfile } from "@/components/mentor/profile";

const mentorLinks: {
  label: string;
  href: string;
  icon: ComponentType<IconProps>;
}[] = [
  { label: "Dashboard", href: "/mentor/dashboard", icon: GridIcon },
  {
    label: "Project Reviews",
    href: "/mentor/reviews",
    icon: ClipboardCheckIcon,
  },
  { label: "Profile", href: "/mentor/profile", icon: UserIcon },
];

export function MentorSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <>
      <aside
        aria-label="Mentor navigation"
        className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200/70 bg-white shadow-[0px_1px_8px_0px_rgba(0,0,0,0.04)] lg:flex"
      >
        <SidebarBody pathname={pathname} />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-slate-950/40 backdrop-blur-sm"
          />
          <aside
            id="mentor-sidebar"
            role="dialog"
            aria-modal="true"
            aria-label="Mentor navigation"
            className="absolute inset-y-0 left-0 flex w-64 max-w-[85vw] flex-col bg-white shadow-2xl"
          >
            <SidebarBody
              pathname={pathname}
              onNavigate={onClose}
              onClose={onClose}
            />
          </aside>
        </div>
      )}
    </>
  );
}

function SidebarBody({
  pathname,
  onNavigate,
  onClose,
}: {
  pathname: string;
  onNavigate?: () => void;
  onClose?: () => void;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-slate-100 px-5">
        <Link
          href="/mentor/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-700 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
            <LayersIcon className="h-4 w-4 text-white" />
          </span>
          <span className="font-serif text-base font-semibold leading-6 text-slate-900">
            SubmitFlow
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-xs font-medium leading-4 text-gray-700">
            v2.4
          </span>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 lg:hidden"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <nav aria-label="Mentor workspace" className="flex-1 px-3 pt-6">
        <p className="px-3 pb-2 text-xs font-semibold uppercase leading-4 tracking-wide text-gray-500">
          Mentor Workspace
        </p>
        <ul className="flex flex-col gap-1">
          {mentorLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            const Icon = link.icon;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
                      : "text-gray-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="shrink-0 border-t border-slate-100 p-3">
        <div className="flex items-center justify-between gap-2 rounded-xl bg-blue-50 p-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-700 text-xs font-semibold leading-4 tracking-tight text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
              {mentorProfile.initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold leading-4 text-slate-900">
                {mentorProfile.name}
              </p>
              <span className="mt-0.5 inline-flex rounded-full bg-indigo-100 px-1.5 py-0.5 text-[10px] font-semibold leading-3 tracking-tight text-indigo-700">
                {mentorProfile.role}
              </span>
            </div>
          </div>
          <Link
            href="/sign-in"
            aria-label="Sign out"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-white hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
          >
            <LogOutIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
