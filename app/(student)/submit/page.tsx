import type { Metadata } from "next";
import { SubmitProject } from "@/components/dashboard/submit-project";

export const metadata: Metadata = {
  title: "Submit Project",
  description:
    "Submit your capstone project repository and live deployment for mentor review.",
};

export default function SubmitProjectPage() {
  return <SubmitProject />;
}
