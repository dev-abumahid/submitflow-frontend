import type { ReactNode } from "react";
import { LogoMark } from "@/components/shared/logo";

export function AuthShell({
  promo,
  children,
  labelledBy,
  panelClassName = "bg-slate-50",
}: {
  promo: ReactNode;
  children: ReactNode;
  labelledBy: string;
  panelClassName?: string;
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      className="w-full bg-slate-50 p-4 sm:p-5"
    >
      <div className="mx-auto flex w-full max-w-7xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200/80 lg:grid lg:min-h-[820px] lg:grid-cols-2">
        {promo}

        <div
          className={`flex items-center justify-center px-5 py-12 sm:px-10 lg:px-12 lg:py-20 xl:px-20 ${panelClassName}`}
        >
          <div className="w-full max-w-sm">
            <div className="mb-8 flex items-center gap-2 lg:hidden">
              <LogoMark className="h-6 w-6" />
              <span className="font-serif text-xl font-bold text-slate-900">
                SubmitFlow
              </span>
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
