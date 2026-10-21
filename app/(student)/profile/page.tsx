import type { Metadata } from "next";
import { studentProfile } from "@/components/dashboard/profile";
import { ProfilePage } from "@/components/profile/profile-page";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your student account details and change your password.",
};

export default function StudentProfilePage() {
  return (
    <ProfilePage
      account={{
        ...studentProfile,
        accountId: "SF-8492",
        memberSince: "August 2026",
        passwordUpdated: "92 days ago",
        workspace: "Student Workspace",
      }}
    />
  );
}
