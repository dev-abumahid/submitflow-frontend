import type { Metadata } from "next";
import { MentorDashboard } from "@/components/mentor/dashboard";

export const metadata: Metadata = {
  title: "Review Dashboard",
  description:
    "Manage student submissions and track project review progress across active milestones.",
};

export default function MentorDashboardPage() {
  return <MentorDashboard />;
}
