import type { Metadata } from "next";
import { Dashboard } from "@/components/dashboard/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Track your latest project submission, review lifecycle, and mentor feedback.",
};

export default function DashboardPage() {
  return <Dashboard />;
}
