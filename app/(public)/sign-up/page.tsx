import type { Metadata } from "next";
import { Signup } from "@/components/ui/auth/signup";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create your SubmitFlow student account and start submitting project milestones.",
};

export default function SignUpPage() {
  return <Signup />;
}
