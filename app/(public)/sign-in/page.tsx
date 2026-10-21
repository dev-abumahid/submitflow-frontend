import type { Metadata } from "next";
import { Login } from "@/components/ui/auth/login";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your SubmitFlow workspace.",
};

export default function SignInPage() {
  return <Login />;
}
