import type { Metadata } from "next";
import { Submissions } from "@/components/dashboard/submissions";

export const metadata: Metadata = {
  title: "Submissions",
  description:
    "Browse, filter, and track all project submissions, mentor reviews, and automated checks.",
};

export default function SubmissionsPage() {
  return <Submissions />;
}
