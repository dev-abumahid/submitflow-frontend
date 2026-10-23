"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { AuthShell } from "@/components/ui/auth/auth-shell";
import { useAuth } from "@/context/auth-context";

const strengthLabels = ["Too short", "Weak", "Fair", "Good", "Strong"];
const strengthColors = [
  "bg-slate-200",
  "bg-red-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-emerald-500",
];
const strengthTextColors = [
  "text-slate-500",
  "text-red-600",
  "text-amber-600",
  "text-emerald-600",
  "text-emerald-600",
];

function getPasswordScore(password: string) {
  if (!password) return 0;
  if (password.length < 8) return 1;

  let score = 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  return score;
}

function getStrengthSegmentColor(score: number, index: number) {
  if (index >= score) return "bg-slate-200";
  if (score === 4 && index === 3) return "bg-indigo-600";

  return strengthColors[score];
}

export function Signup() {
  const router = useRouter();
  const { register } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const passwordScore = getPasswordScore(password);
  const nameIsValid = fullName.trim().length >= 2;
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    setErrorMessage(null);
    setLoading(true);

    try {
      await register(email, password, fullName);
      router.push("/dashboard");
    } catch (err: unknown) {
      let serverMessage =
        "Registration failed. Please check your information and try again.";
      if (axios.isAxiosError(err) && err.response?.data) {
        const data = err.response.data as {
          message?: string;
          errorSources?: { message: string }[];
        };
        serverMessage =
          data.message ||
          data.errorSources?.[0]?.message ||
          serverMessage;
      }
      setErrorMessage(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      labelledBy="signup-heading"
      panelClassName="bg-white"
      promo={<PromoPanel />}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold leading-4 tracking-tight text-indigo-700">
            <AcademicCapIcon className="h-3 w-3.5 text-indigo-700" />
            Student Registration &bull; Free Access for Cohort Learners
          </p>
          <h1
            id="signup-heading"
            className="pt-1 text-2xl font-bold leading-8 text-slate-900"
          >
            Create your account
          </h1>
          <p className="text-pretty text-sm font-normal leading-5 text-gray-700">
            Join SubmitFlow as a student and start submitting your project
            milestones.
          </p>
        </div>

        {errorMessage && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="full-name"
                className="text-xs font-semibold uppercase leading-4 tracking-wide text-slate-900"
              >
                Full name <RequiredMark />
              </label>
              <ValidationHint
                isValid={nameIsValid}
                validLabel="Min 2 chars"
                invalidLabel="Min 2 chars"
              />
            </div>
            <div className="relative">
              <input
                id="full-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                aria-invalid={fullName.length > 0 && !nameIsValid}
                placeholder="Maya Chen"
                className="w-full rounded-lg border border-[#c7c4d8] bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
              />
              <UserIcon className="pointer-events-none absolute left-3.5 top-1/2 h-3 w-3 -translate-y-1/2 text-[#777587]" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="student-email"
              className="text-xs font-semibold uppercase leading-4 tracking-wide text-slate-900"
            >
              Student email address <RequiredMark />
            </label>
            <div className="relative">
              <input
                id="student-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="maya@university.edu or your personal email"
                className="w-full rounded-lg border border-[#c7c4d8] bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
              />
              <MailIcon className="pointer-events-none absolute left-3.5 top-1/2 h-3 w-3.5 -translate-y-1/2 text-[#777587]" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="signup-password"
              className="text-xs font-semibold uppercase leading-4 tracking-wide text-slate-900"
            >
              Password <RequiredMark />
            </label>
            <div className="relative">
              <input
                id="signup-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-describedby="password-strength"
                placeholder="Create a strong password"
                className="w-full rounded-lg border border-[#c7c4d8] bg-white py-2.5 pl-10 pr-11 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
              />
              <LockInputIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-3 -translate-y-1/2 text-[#777587]" />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#777587] transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-3 w-4" />
                ) : (
                  <EyeIcon className="h-3 w-4" />
                )}
              </button>
            </div>

            <div className="flex flex-col gap-1 pt-1.5">
              <div className="flex gap-1.5" aria-hidden="true">
                {[0, 1, 2, 3].map((index) => (
                  <span
                    key={index}
                    className={`h-1.5 flex-1 rounded-full ${getStrengthSegmentColor(
                      passwordScore,
                      index,
                    )}`}
                  />
                ))}
              </div>
              <div
                id="password-strength"
                aria-live="polite"
                className="flex flex-col justify-between gap-1 text-xs font-normal leading-5 text-gray-700 sm:flex-row sm:items-center"
              >
                <p>
                  Strength:{" "}
                  <span className={strengthTextColors[passwordScore]}>
                    {password ? strengthLabels[passwordScore] : "—"}
                  </span>
                </p>
                <p>
                  {passwordScore === 4
                    ? "Letters, numbers & symbols verified"
                    : "Use 8+ characters with a number & symbol"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="confirm-password"
                className="text-xs font-semibold uppercase leading-4 tracking-wide text-slate-900"
              >
                Confirm password <RequiredMark />
              </label>
              {confirmPassword.length > 0 && (
                <ValidationHint
                  isValid={passwordsMatch}
                  validLabel="Passwords match"
                  invalidLabel="Passwords do not match"
                />
              )}
            </div>
            <div className="relative">
              <input
                id="confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                aria-invalid={
                  confirmPassword.length > 0 && !passwordsMatch
                }
                placeholder="Confirm your password"
                className="w-full rounded-lg border border-[#c7c4d8] bg-white py-2.5 pl-10 pr-11 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
              />
              <LockInputIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-3 -translate-y-1/2 text-[#777587]" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((visible) => !visible)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                aria-pressed={showConfirmPassword}
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#777587] transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="h-3 w-4" />
                ) : (
                  <EyeIcon className="h-3 w-4" />
                )}
              </button>
            </div>
          </div>

          <label className="flex items-start gap-2 pt-1 text-xs font-normal leading-4 text-gray-700">
            <input
              type="checkbox"
              name="terms"
              required
              className="mt-0.5 h-4 w-4 shrink-0 rounded accent-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
            />
            <span>
              I agree to the{" "}
              <Link
                href="/code-of-conduct"
                className="rounded-sm text-indigo-700 hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              >
                SubmitFlow Student Code of Conduct
              </Link>{" "}
              and{" "}
              <Link
                href="/academic-integrity"
                className="rounded-sm text-indigo-700 hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              >
                Academic Integrity Guidelines
              </Link>
              .
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-700 px-3 py-3.5 text-sm font-medium leading-5 text-white shadow-lg shadow-indigo-500/20 transition-colors hover:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Student Account"}
            <ArrowRightIcon className="h-3 w-3 text-white" />
          </button>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <p className="flex items-center justify-center gap-1.5 text-center text-xs font-normal leading-5 text-gray-700">
            <ShieldCheckIcon className="h-3 w-3 shrink-0 text-emerald-600" />
            Protected by 256-bit SSL encryption &amp; SOC2 certified data privacy
          </p>
          <p className="border-t border-sky-100 pt-3 text-center text-xs font-normal leading-4 text-gray-700">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="rounded-sm font-semibold text-indigo-700 transition-colors hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </AuthShell>
  );
}

function RequiredMark() {
  return <span className="text-red-700">*</span>;
}

function ValidationHint({
  isValid,
  validLabel,
  invalidLabel,
}: {
  isValid: boolean;
  validLabel: string;
  invalidLabel: string;
}) {
  return (
    <span
      aria-live="polite"
      className={`inline-flex items-center gap-1 text-xs font-semibold leading-4 tracking-tight ${
        isValid ? "text-emerald-600" : "text-slate-500"
      }`}
    >
      <CheckCircleIcon className="h-3 w-3" />
      {isValid ? validLabel : invalidLabel}
    </span>
  );
}

function PromoPanel() {
  return (
    <div className="relative hidden flex-col overflow-hidden bg-linear-to-br from-indigo-950 via-indigo-900 to-indigo-700 p-8 lg:flex xl:p-10">
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-700/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 left-1/3 h-80 w-80 rounded-full bg-indigo-600/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)] backdrop-blur-sm">
              <CodeIcon className="h-3.5 w-4 text-white" />
            </span>
            <span className="text-lg font-semibold leading-6 text-white">
              SubmitFlow
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-normal uppercase leading-5 tracking-wide text-white/90 backdrop-blur-sm sm:text-xs">
            <span
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              aria-hidden="true"
            />
            Student Workspace
          </span>
        </div>

        <div className="pt-5">
          <p className="text-balance text-4xl font-bold leading-10">
            <span className="block text-white">Start building.</span>
            <span className="block text-indigo-100">Start submitting.</span>
          </p>
          <p className="mt-1.5 max-w-lg text-pretty text-sm font-normal leading-6 text-white/80">
            Submit your capstone repository, track real-time evaluation status,
            and receive qualitative mentor feedback in one unified student workspace.
          </p>
        </div>
      </div>

      {/* Project Submission Theme Card */}
      <div className="relative z-10 mt-8 overflow-hidden rounded-2xl border border-white/20 bg-slate-900/40 p-5 shadow-2xl backdrop-blur-md">
        {/* Top window controls and project status badge */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="pl-1.5 font-mono text-xs text-white/70">
              submitflow // capstone-submission
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-2.5 py-0.5 text-xs font-semibold text-amber-300 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            PENDING
          </span>
        </div>

        {/* Project Name & Description */}
        <div className="pt-3.5 pb-2">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-white">
              DevPulse — Real-Time Systems Health Monitor
            </h3>
            <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-200">
              Cohort 12
            </span>
          </div>
          <p className="mt-1 text-xs text-indigo-100/75 line-clamp-2 leading-relaxed">
            Telemetry streaming observability dashboard built with Next.js, WebSockets, and automated incident alerting probes.
          </p>
        </div>

        {/* Project Verification Links */}
        <div className="mt-2.5 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center justify-between rounded-lg bg-white/10 p-2.5 backdrop-blur-sm border border-white/10">
            <span className="text-white/80 font-medium">Git Repo</span>
            <span className="text-emerald-300 font-semibold text-[11px]">✓ Verified</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white/10 p-2.5 backdrop-blur-sm border border-white/10">
            <span className="text-white/80 font-medium">Live Preview</span>
            <span className="text-emerald-300 font-semibold text-[11px]">HTTPS 200 OK</span>
          </div>
        </div>

        {/* Real-time Status Lifecycle Pipeline */}
        <div className="mt-3.5 rounded-xl bg-white/5 p-3 border border-white/10">
          <div className="flex items-center justify-between text-[11px] text-white/70">
            <span>Evaluation Lifecycle</span>
            <span className="font-semibold text-indigo-200">Stage 1 of 3</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="flex-1 h-1.5 rounded-full bg-amber-400" title="PENDING" />
            <span className="flex-1 h-1.5 rounded-full bg-white/20" title="IN_PROGRESS" />
            <span className="flex-1 h-1.5 rounded-full bg-white/20" title="APPROVED" />
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] text-white/60">
            <span className="font-semibold text-amber-300">1. PENDING (Editable)</span>
            <span>2. IN_PROGRESS</span>
            <span>3. DECISION</span>
          </div>
        </div>

        {/* Mentor Review Snippet */}
        <div className="mt-3 flex items-start gap-2 border-t border-white/10 pt-3 text-xs text-indigo-100/80">
          <CheckCircleIcon className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            <span className="font-semibold text-white">Mentor Review SLA:</span> Projects start in Pending, allowing you to update code and preview URLs until mentor evaluation begins.
          </p>
        </div>
      </div>
    </div>
  );
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 17 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.66667 13.3333C1.20833 13.3333 0.815972 13.1701 0.489583 12.8438C0.163194 12.5174 0 12.125 0 11.6667V1.66667C0 1.20833 0.163194 0.815972 0.489583 0.489583C0.815972 0.163194 1.20833 0 1.66667 0H15C15.4583 0 15.8507 0.163194 16.1771 0.489583C16.5035 0.815972 16.6667 1.20833 16.6667 1.66667V11.6667C16.6667 12.125 16.5035 12.5174 16.1771 12.8438C15.8507 13.1701 15.4583 13.3333 15 13.3333H1.66667V13.3333M1.66667 11.6667H15V3.33333H1.66667V11.6667V11.6667V11.6667V11.6667M4.58333 10.8333L3.41667 9.66667L5.5625 7.5L3.39583 5.33333L4.58333 4.16667L7.91667 7.5L4.58333 10.8333V10.8333M8.33333 10.8333V9.16667H13.3333V10.8333H8.33333V10.8333"
        fill="currentColor"
      />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 6C5.175 6 4.46875 5.70625 3.88125 5.11875C3.29375 4.53125 3 3.825 3 3C3 2.175 3.29375 1.46875 3.88125 0.88125C4.46875 0.29375 5.175 0 6 0C6.825 0 7.53125 0.29375 8.11875 0.88125C8.70625 1.46875 9 2.175 9 3C9 3.825 8.70625 4.53125 8.11875 5.11875C7.53125 5.70625 6.825 6 6 6V6M0 12V9.9C0 9.475 0.109375 9.08437 0.328125 8.72812C0.546875 8.37187 0.8375 8.1 1.2 7.9125C1.975 7.525 2.7625 7.23438 3.5625 7.04063C4.3625 6.84688 5.175 6.75 6 6.75C6.825 6.75 7.6375 6.84688 8.4375 7.04063C9.2375 7.23438 10.025 7.525 10.8 7.9125C11.1625 8.1 11.4531 8.37187 11.6719 8.72812C11.8906 9.08437 12 9.475 12 9.9V12H0V12M1.5 10.5H10.5V9.9C10.5 9.7625 10.4656 9.6375 10.3969 9.525C10.3281 9.4125 10.2375 9.325 10.125 9.2625C9.45 8.925 8.76875 8.67188 8.08125 8.50313C7.39375 8.33438 6.7 8.25 6 8.25C5.3 8.25 4.60625 8.33438 3.91875 8.50313C3.23125 8.67188 2.55 8.925 1.875 9.2625C1.7625 9.325 1.67188 9.4125 1.60312 9.525C1.53437 9.6375 1.5 9.7625 1.5 9.9V10.5V10.5M6 4.5C6.4125 4.5 6.76562 4.35312 7.05937 4.05937C7.35312 3.76562 7.5 3.4125 7.5 3C7.5 2.5875 7.35312 2.23438 7.05937 1.94062C6.76562 1.64687 6.4125 1.5 6 1.5C5.5875 1.5 5.23438 1.64687 4.94063 1.94062C4.64688 2.23438 4.5 2.5875 4.5 3C4.5 3.4125 4.64688 3.76562 4.94063 4.05937C5.23438 4.35312 5.5875 4.5 6 4.5V4.5M6 3V3V3V3V3V3V3V3V3V3M6 10.5V10.5V10.5V10.5V10.5V10.5V10.5V10.5V10.5V10.5V10.5V10.5V10.5"
        fill="currentColor"
      />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 15 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.5 12C1.0875 12 0.734375 11.8531 0.440625 11.5594C0.146875 11.2656 0 10.9125 0 10.5V1.5C0 1.0875 0.146875 0.734375 0.440625 0.440625C0.734375 0.146875 1.0875 0 1.5 0H13.5C13.9125 0 14.2656 0.146875 14.5594 0.440625C14.8531 0.734375 15 1.0875 15 1.5V10.5C15 10.9125 14.8531 11.2656 14.5594 11.5594C14.2656 11.8531 13.9125 12 13.5 12H1.5V12M7.5 6.75L1.5 3V10.5H13.5V3L7.5 6.75V6.75M7.5 5.25L13.5 1.5H1.5L7.5 5.25V5.25"
        fill="currentColor"
      />
    </svg>
  );
}

function LockInputIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.5 15.75C1.0875 15.75 0.734375 15.6031 0.440625 15.3094C0.146875 15.0156 0 14.6625 0 14.25V6.75C0 6.3375 0.146875 5.98438 0.440625 5.69063C0.734375 5.39688 1.0875 5.25 1.5 5.25H2.25V3.75C2.25 2.7125 2.61562 1.82812 3.34687 1.09687C4.07812 0.365625 4.9625 0 6 0C7.0375 0 7.92188 0.365625 8.65312 1.09687C9.38437 1.82812 9.75 2.7125 9.75 3.75V5.25H10.5C10.9125 5.25 11.2656 5.39688 11.5594 5.69063C11.8531 5.98438 12 6.3375 12 6.75V14.25C12 14.6625 11.8531 15.0156 11.5594 15.3094C11.2656 15.6031 10.9125 15.75 10.5 15.75H1.5V15.75M1.5 14.25H10.5V6.75H1.5V14.25V14.25V14.25V14.25M6 12C6.4125 12 6.76562 11.8531 7.05937 11.5594C7.35312 11.2656 7.5 10.9125 7.5 10.5C7.5 10.0875 7.35312 9.73438 7.05937 9.44063C6.76562 9.14688 6.4125 9 6 9C5.5875 9 5.23438 9.14688 4.94063 9.44063C4.64688 9.73438 4.5 10.0875 4.5 10.5C4.5 10.9125 4.64688 11.2656 4.94063 11.5594C5.23438 11.8531 5.5875 12 6 12V12M3.75 5.25H8.25V3.75C8.25 3.125 8.03125 2.59375 7.59375 2.15625C7.15625 1.71875 6.625 1.5 6 1.5C5.375 1.5 4.84375 1.71875 4.40625 2.15625C3.96875 2.59375 3.75 3.125 3.75 3.75V5.25V5.25"
        fill="currentColor"
      />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 17 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8.25 9C9.1875 9 9.98438 8.67188 10.6406 8.01562C11.2969 7.35938 11.625 6.5625 11.625 5.625C11.625 4.6875 11.2969 3.89062 10.6406 3.23438C9.98438 2.57812 9.1875 2.25 8.25 2.25C7.3125 2.25 6.51562 2.57812 5.85938 3.23438C5.20312 3.89062 4.875 4.6875 4.875 5.625C4.875 6.5625 5.20312 7.35938 5.85938 8.01562C6.51562 8.67188 7.3125 9 8.25 9V9M8.25 7.65C7.6875 7.65 7.20938 7.45312 6.81563 7.05937C6.42188 6.66562 6.225 6.1875 6.225 5.625C6.225 5.0625 6.42188 4.58438 6.81563 4.19063C7.20938 3.79688 7.6875 3.6 8.25 3.6C8.8125 3.6 9.29062 3.79688 9.68437 4.19063C10.0781 4.58438 10.275 5.0625 10.275 5.625C10.275 6.1875 10.0781 6.66562 9.68437 7.05937C9.29062 7.45312 8.8125 7.65 8.25 7.65V7.65M8.25 11.25C6.425 11.25 4.7625 10.7406 3.2625 9.72188C1.7625 8.70312 0.675 7.3375 0 5.625C0.675 3.9125 1.7625 2.54688 3.2625 1.52813C4.7625 0.509375 6.425 0 8.25 0C10.075 0 11.7375 0.509375 13.2375 1.52813C14.7375 2.54688 15.825 3.9125 16.5 5.625C15.825 7.3375 14.7375 8.70312 13.2375 9.72188C11.7375 10.7406 10.075 11.25 8.25 11.25V11.25M8.25 9.75C9.6625 9.75 10.9594 9.37812 12.1406 8.63437C13.3219 7.89062 14.225 6.8875 14.85 5.625C14.225 4.3625 13.3219 3.35938 12.1406 2.61562C10.9594 1.87187 9.6625 1.5 8.25 1.5C6.8375 1.5 5.54063 1.87187 4.35938 2.61562C3.17812 3.35938 2.275 4.3625 1.65 5.625C2.275 6.8875 3.17812 7.89062 4.35938 8.63437C5.54063 9.37812 6.8375 9.75 8.25 9.75V9.75"
        fill="currentColor"
      />
    </svg>
  );
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 17 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1 1L16 13M7.25 3.15C7.575 3.05 7.9125 3 8.25 3C9.6625 3 10.9594 3.37187 12.1406 4.11562C13.3219 4.85938 14.225 5.8625 14.85 7.125C14.4 7.95 13.8375 8.66875 13.1625 9.28125M4.4 3.9125C3.0875 4.7375 2.0375 5.80833 1.25 7.125C1.925 8.4375 2.8625 9.45937 4.0625 10.1906C5.2625 10.9219 6.65833 11.2875 8.25 11.2875C9.175 11.2875 10.075 11.1406 10.95 10.8469M6.825 5.325C6.525 5.6625 6.375 6.0625 6.375 6.525C6.375 7.0375 6.55937 7.475 6.92812 7.8375C7.29687 8.2 7.7375 8.38125 8.25 8.38125C8.7125 8.38125 9.1125 8.23125 9.45 7.93125"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4.65833 7.90833L8.47708 4.08958L7.71875 3.33125L4.65833 6.39167L3.11458 4.84792L2.35625 5.60625L4.65833 7.90833V7.90833M5.41667 10.8333C4.66736 10.8333 3.96319 10.6911 3.30417 10.4068C2.64514 10.1224 2.07188 9.73646 1.58438 9.24896C1.09687 8.76146 0.710938 8.18819 0.426562 7.52917C0.142187 6.87014 0 6.16597 0 5.41667C0 4.66736 0.142187 3.96319 0.426562 3.30417C0.710938 2.64514 1.09687 2.07188 1.58438 1.58438C2.07188 1.09687 2.64514 0.710938 3.30417 0.426562C3.96319 0.142187 4.66736 0 5.41667 0C6.16597 0 6.87014 0.142187 7.52917 0.426562C8.18819 0.710938 8.76146 1.09687 9.24896 1.58438C9.73646 2.07188 10.1224 2.64514 10.4068 3.30417C10.6911 3.96319 10.8333 4.66736 10.8333 5.41667C10.8333 6.16597 10.6911 6.87014 10.4068 7.52917C10.1224 8.18819 9.73646 8.76146 9.24896 9.24896C8.76146 9.73646 8.18819 10.1224 7.52917 10.4068C6.87014 10.6911 6.16597 10.8333 5.41667 10.8333V10.8333M5.41667 9.75C6.62639 9.75 7.65104 9.33021 8.49063 8.49063C9.33021 7.65104 9.75 6.62639 9.75 5.41667C9.75 4.20694 9.33021 3.18229 8.49063 2.34271C7.65104 1.50312 6.62639 1.08333 5.41667 1.08333C4.20694 1.08333 3.18229 1.50312 2.34271 2.34271C1.50312 3.18229 1.08333 4.20694 1.08333 5.41667C1.08333 6.62639 1.50312 7.65104 2.34271 8.49063C3.18229 9.33021 4.20694 9.75 5.41667 9.75V9.75"
        fill="currentColor"
      />
    </svg>
  );
}

function AcademicCapIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6.875 11.25L2.5 8.875V5.125L0 3.75L6.875 0L13.75 3.75V8.75H12.5V4.4375L11.25 5.125V8.875L6.875 11.25V11.25M6.875 6.0625L11.1562 3.75L6.875 1.4375L2.59375 3.75L6.875 6.0625V6.0625M6.875 9.82812L10 8.14062V5.78125L6.875 7.5L3.75 5.78125V8.14062L6.875 9.82812V9.82812"
        fill="currentColor"
      />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4.05417 7.90417L7.35 4.60833L6.51875 3.77708L4.05417 6.24167L2.82917 5.01667L1.99792 5.84792L4.05417 7.90417V7.90417M4.66667 11.6667C3.31528 11.3264 2.19965 10.551 1.31979 9.34062C0.439931 8.13021 0 6.78611 0 5.30833V1.75L4.66667 0L9.33333 1.75V5.30833C9.33333 6.78611 8.8934 8.13021 8.01354 9.34062C7.13368 10.551 6.01806 11.3264 4.66667 11.6667V11.6667M4.66667 10.4417C5.67778 10.1208 6.51389 9.47917 7.175 8.51667C7.83611 7.55417 8.16667 6.48472 8.16667 5.30833V2.55208L4.66667 1.23958L1.16667 2.55208V5.30833C1.16667 6.48472 1.49722 7.55417 2.15833 8.51667C2.81944 9.47917 3.65556 10.1208 4.66667 10.4417V10.4417"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9.13125 6.75H0V5.25H9.13125L4.93125 1.05L6 0L12 6L6 12L4.93125 10.95L9.13125 6.75V6.75"
        fill="currentColor"
      />
    </svg>
  );
}
