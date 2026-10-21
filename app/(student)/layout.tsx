import type { Metadata } from "next";
import type { ReactNode } from "react";
import { StudentLayout } from "@/components/layouts/student-layout";

export const metadata: Metadata = {
  title: "Student",
  description: "Track your project submissions and live review progress.",
};

export default function StudentRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <StudentLayout>{children}</StudentLayout>;
}
