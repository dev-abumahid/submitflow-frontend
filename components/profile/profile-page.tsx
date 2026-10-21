"use client";

import { useState } from "react";
import {
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@/components/dashboard/icons";

export type ProfileAccount = {
  name: string;
  email: string;
  initials: string;
  role: string;
  accountId: string;
  memberSince: string;
  passwordUpdated: string;
  workspace: string;
};

type Feedback = {
  tone: "success" | "error";
  message: string;
};

const strengthStyles = [
  "bg-slate-200",
  "bg-rose-500",
  "bg-amber-500",
  "bg-indigo-500",
  "bg-emerald-500",
];

const strengthLabels = ["—", "Weak", "Fair", "Good", "Strong"];

const strengthTextStyles = [
  "text-gray-500",
  "text-rose-600",
  "text-amber-600",
  "text-indigo-700",
  "text-emerald-600",
];

function getPasswordScore(password: string) {
  if (!password) return 0;

  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

export function ProfilePage({ account }: { account: ProfileAccount }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const passwordScore = getPasswordScore(newPassword);
  const passwordsMatch =
    confirmPassword.length > 0 && newPassword === confirmPassword;
  const passwordsDiffer =
    newPassword.length === 0 || currentPassword.length === 0
      ? true
      : newPassword !== currentPassword;

  const passwordChecks = [
    { label: "At least 8 characters", met: newPassword.length >= 8 },
    {
      label: "Uppercase and lowercase letters",
      met: /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword),
    },
    { label: "At least one number", met: /\d/.test(newPassword) },
    {
      label: "At least one special character",
      met: /[^A-Za-z0-9]/.test(newPassword),
    },
  ];

  const allChecksPassed = passwordChecks.every((check) => check.met);
  const isFormValid =
    currentPassword.length > 0 &&
    allChecksPassed &&
    passwordsDiffer &&
    passwordsMatch;

  const resetPasswordFields = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    setFeedback(null);

    if (!currentPassword) {
      setFeedback({
        tone: "error",
        message: "Enter your current password to continue.",
      });
      return;
    }

    if (!passwordsDiffer) {
      setFeedback({
        tone: "error",
        message: "Your new password must be different from your current password.",
      });
      return;
    }

    if (!allChecksPassed) {
      setFeedback({
        tone: "error",
        message: "Your new password does not meet all security requirements.",
      });
      return;
    }

    if (!passwordsMatch) {
      setFeedback({
        tone: "error",
        message: "The new passwords do not match.",
      });
      return;
    }

    resetPasswordFields();
    setAttempted(false);
    setFeedback({
      tone: "success",
      message:
        "Password updated successfully. Your other active sessions will be signed out.",
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-5">
      <section className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold leading-8 text-slate-900">
            Account Profile
          </h1>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium leading-4 tracking-tight text-gray-700">
            <span
              className="h-1.5 w-1.5 rounded-full bg-indigo-600"
              aria-hidden="true"
            />
            Account settings
          </span>
        </div>
        <p className="max-w-2xl text-sm font-normal leading-5 text-gray-700">
          Review your account details and update the password used to access
          SubmitFlow.
        </p>
      </section>

      <div className="grid gap-5 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start">
        <section
          aria-labelledby="profile-summary-heading"
          className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-700 text-lg font-semibold leading-6 text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
              {account.initials}
            </span>
            <div className="min-w-0">
              <h2
                id="profile-summary-heading"
                className="truncate text-lg font-semibold leading-6 text-slate-900"
              >
                {account.name}
              </h2>
              <p className="truncate text-xs font-normal leading-4 text-gray-700">
                {account.email}
              </p>
              <span className="mt-1.5 inline-flex rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold uppercase leading-4 tracking-wide text-indigo-700">
                {account.role}
              </span>
            </div>
          </div>

          <dl className="grid gap-3 border-t border-slate-100 pt-4 text-xs">
            <div className="flex items-center justify-between gap-3">
              <dt className="font-medium text-gray-700">Account ID</dt>
              <dd className="font-semibold text-slate-900">
                {account.accountId}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="font-medium text-gray-700">Workspace</dt>
              <dd className="text-right font-semibold text-slate-900">
                {account.workspace}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="font-medium text-gray-700">Member since</dt>
              <dd className="font-semibold text-slate-900">
                {account.memberSince}
              </dd>
            </div>
          </dl>

          <div className="rounded-xl bg-blue-50 p-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-700">
                <ShieldCheckIcon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold leading-4 text-slate-900">
                  Account protection active
                </p>
                <p className="text-[11px] leading-4 text-gray-700">
                  Password updated {account.passwordUpdated}
                </p>
              </div>
            </div>
          </div>

          <p className="flex items-start gap-1.5 text-[11px] leading-4 text-gray-700">
            <UserIcon className="mt-0.5 h-3 w-3 shrink-0 text-indigo-600" />
            Contact your program administrator if any profile details need to be
            corrected.
          </p>
        </section>

        <section
          aria-labelledby="change-password-heading"
          className="rounded-xl bg-white p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] sm:p-6"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
              <LockIcon className="h-5 w-5" />
            </span>
            <div>
              <h2
                id="change-password-heading"
                className="text-lg font-semibold leading-6 text-slate-900"
              >
                Change Password
              </h2>
              <p className="text-xs font-normal leading-5 text-gray-700">
                Choose a strong password you do not use for another account.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4 pt-5"
          >
            <PasswordField
              id="current-password"
              label="Current password"
              value={currentPassword}
              autoComplete="current-password"
              placeholder="Enter your current password"
              visible={showCurrent}
              onToggle={() => setShowCurrent((visible) => !visible)}
              onChange={(value) => {
                setCurrentPassword(value);
                setFeedback(null);
              }}
              invalid={attempted && currentPassword.length === 0}
              hint="Enter the password you currently use to sign in."
            />

            <div className="border-t border-slate-100 pt-4">
              <PasswordField
                id="new-password"
                label="New password"
                value={newPassword}
                autoComplete="new-password"
                placeholder="Create a strong new password"
                visible={showNew}
                onToggle={() => setShowNew((visible) => !visible)}
                onChange={(value) => {
                  setNewPassword(value);
                  setFeedback(null);
                }}
                invalid={attempted && !allChecksPassed}
                hint="Use at least 8 characters with a mix of letters, numbers, and symbols."
              />

              <div className="pt-3">
                <div className="flex items-center justify-between gap-3 text-xs leading-4">
                  <span className="font-medium text-gray-700">
                    Password strength
                  </span>
                  <span
                    className={`font-semibold ${strengthTextStyles[passwordScore]}`}
                  >
                    {strengthLabels[passwordScore]}
                  </span>
                </div>
                <div className="flex gap-1 pt-2" aria-hidden="true">
                  {[0, 1, 2, 3].map((index) => (
                    <span
                      key={index}
                      className={`h-1.5 flex-1 rounded-full ${
                        index < passwordScore
                          ? strengthStyles[passwordScore]
                          : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <div
                  id="password-requirements"
                  className="mt-3 grid gap-1.5 sm:grid-cols-2"
                >
                  {passwordChecks.map((check) => (
                    <p
                      key={check.label}
                      className={`flex items-center gap-1.5 text-[11px] leading-4 ${
                        check.met ? "text-emerald-600" : "text-gray-700"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                          check.met
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {check.met ? (
                          <CheckIcon className="h-2.5 w-2.5" />
                        ) : (
                          <span className="h-1 w-1 rounded-full bg-current" />
                        )}
                      </span>
                      {check.label}
                    </p>
                  ))}
                </div>
                {attempted && newPassword.length > 0 && !passwordsDiffer && (
                  <p className="pt-2 text-[11px] font-medium leading-4 text-rose-600">
                    Your new password must be different from your current
                    password.
                  </p>
                )}
              </div>
            </div>

            <PasswordField
              id="confirm-password"
              label="Confirm new password"
              value={confirmPassword}
              autoComplete="new-password"
              placeholder="Re-enter your new password"
              visible={showConfirm}
              onToggle={() => setShowConfirm((visible) => !visible)}
              onChange={(value) => {
                setConfirmPassword(value);
                setFeedback(null);
              }}
              invalid={
                attempted && confirmPassword.length > 0 && !passwordsMatch
              }
              hint={
                confirmPassword.length > 0 && !passwordsMatch
                  ? "Passwords do not match yet."
                  : "Re-enter the new password to confirm it."
              }
              hintTone={
                confirmPassword.length > 0 && !passwordsMatch
                  ? "error"
                  : "default"
              }
            />

            {feedback && (
              <p
                role={feedback.tone === "error" ? "alert" : "status"}
                className={`rounded-xl px-3 py-2.5 text-xs font-medium leading-5 ${
                  feedback.tone === "success"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {feedback.message}
              </p>
            )}

            <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-[11px] leading-4 text-gray-700">
                Updating your password signs out other active sessions.
              </p>
              <button
                type="submit"
                disabled={!isFormValid && attempted}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold leading-5 text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
              >
                <LockIcon className="h-4 w-4" />
                Update Password
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

function PasswordField({
  id,
  label,
  value,
  autoComplete,
  placeholder,
  visible,
  onToggle,
  onChange,
  invalid,
  hint,
  hintTone = "default",
}: {
  id: string;
  label: string;
  value: string;
  autoComplete: string;
  placeholder: string;
  visible: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
  invalid?: boolean;
  hint?: string;
  hintTone?: "default" | "error";
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase leading-4 tracking-tight text-slate-900"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required
          placeholder={placeholder}
          aria-invalid={invalid || undefined}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className={`w-full rounded-xl border bg-white px-3.5 py-2.5 pr-11 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:ring-2 ${
            invalid
              ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
              : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/30"
          }`}
        />
        <button
          type="button"
          onClick={onToggle}
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          aria-pressed={visible}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
        >
          {visible ? (
            <EyeOffIcon className="h-4 w-4" />
          ) : (
            <EyeIcon className="h-4 w-4" />
          )}
        </button>
      </div>
      {hint && (
        <p
          id={`${id}-hint`}
          className={`text-[11px] leading-4 ${
            hintTone === "error" ? "text-rose-600" : "text-gray-700"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
}
