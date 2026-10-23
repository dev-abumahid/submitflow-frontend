import type { Metadata } from "next";
import { Suspense, use } from "react";
import { MentorProjectDetails } from "@/components/mentor/project-details";

export const metadata: Metadata = {
  title: "Project Review Details",
  description: "Evaluate student code, verify repository links, and submit feedback.",
};

function ReviewDetailsContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <MentorProjectDetails projectId={id} />;
}

export default function MentorProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center text-sm text-gray-500">
          Loading review...
        </div>
      }
    >
      <ReviewDetailsContent params={params} />
    </Suspense>
  );
}
