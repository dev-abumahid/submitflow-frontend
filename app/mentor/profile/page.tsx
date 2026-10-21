import type { Metadata } from "next";
import { mentorProfile } from "@/components/mentor/profile";
import { ProfilePage } from "@/components/profile/profile-page";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your administrator account details and change your password.",
};

export default function MentorProfilePage() {
  return (
    <ProfilePage
      account={{
        ...mentorProfile,
        role: "Administrator",
        accountId: "MNT-1042",
        memberSince: "January 2025",
        passwordUpdated: "21 days ago",
        workspace: "Mentor Workspace",
      }}
    />
  );
}
