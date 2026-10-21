import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  findMentorSubmission,
  mentorSubmissions,
} from "@/components/mentor/data";
import { buildProjectDetail } from "@/components/mentor/project-detail-data";
import { MentorProjectDetails } from "@/components/mentor/project-details";

export function generateStaticParams() {
  return mentorSubmissions.map((submission) => ({ id: submission.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const submission = findMentorSubmission(id);

  if (!submission) {
    return { title: "Project Not Found" };
  }

  const detail = buildProjectDetail(submission);

  return {
    title: `${submission.project} — Milestone #${detail.milestoneNumber}`,
    description: `Review ${submission.project} by ${submission.student.name} for ${detail.milestoneTitle}.`,
  };
}

export default async function MentorProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const submission = findMentorSubmission(id);

  if (!submission) notFound();

  return (
    <MentorProjectDetails
      submission={submission}
      detail={buildProjectDetail(submission)}
    />
  );
}
