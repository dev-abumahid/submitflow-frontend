import type { Metadata } from "next";
import type { ReactNode } from "react";
import { MentorLayout } from "@/components/layouts/mentor-layout";

export const metadata: Metadata = {
  title: {
    default: "Mentor Workspace",
    template: "%s | SubmitFlow",
  },
  description: "Review student submissions and track cohort progress.",
};

export default function MentorRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <MentorLayout>{children}</MentorLayout>;
}
