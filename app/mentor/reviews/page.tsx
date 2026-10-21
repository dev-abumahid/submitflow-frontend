import type { Metadata } from "next";
import { ProjectReviews } from "@/components/mentor/project-reviews";

export const metadata: Metadata = {
  title: "Project Reviews",
  description:
    "Review, verify source integrity, test builds, and issue formal milestone decisions.",
};

export default function MentorReviewsPage() {
  return <ProjectReviews />;
}
