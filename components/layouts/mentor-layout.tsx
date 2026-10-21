"use client";

import { useCallback, useState } from "react";
import type { ReactNode } from "react";
import { MentorSidebar } from "@/components/mentor/left-sidebar";
import { MentorTopbar } from "@/components/mentor/topbar";

export function MentorLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const openSidebar = useCallback(() => setSidebarOpen(true), []);

  return (
    <div className="min-h-dvh bg-slate-50 font-sans text-slate-900">
      <a
        href="#mentor-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to review dashboard content
      </a>

      <MentorSidebar open={sidebarOpen} onClose={closeSidebar} />

      <div className="flex min-h-dvh flex-col lg:pl-64">
        <MentorTopbar onOpenSidebar={openSidebar} />
        <main
          id="mentor-main"
          className="flex-1 px-4 pb-8 pt-6 sm:px-5 lg:pb-5 lg:pt-8"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
