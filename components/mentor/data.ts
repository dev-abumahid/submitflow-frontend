export type SubmissionStatus = "Pending" | "Approved" | "Rejected";

export type SubmissionTone =
  | "indigo"
  | "blue"
  | "rose"
  | "emerald"
  | "amber"
  | "violet";

export type Submission = {
  id: string;
  project: string;
  code: string;
  version: string;
  ticket: string;
  branch: string;
  commit: string;
  summary: string;
  repo: string;
  liveUrl: string;
  stack: string;
  student: {
    name: string;
    email: string;
    initials: string;
  };
  submittedDate: string;
  relativeDate: string;
  submittedTime: string;
  status: SubmissionStatus;
  icon: "grid" | "code" | "layers" | "file";
  tone: SubmissionTone;
  avatarTone: SubmissionTone;
};

const seededSubmissions: Submission[] = [
  {
    id: "taskflow",
    project: "TaskFlow",
    code: "TF",
    version: "v1.4",
    ticket: "#SF-8492",
    branch: "main",
    commit: "#4f8b2a1",
    summary: "Kanban & Milestone Engine",
    repo: "github.com/alex-m/taskflow",
    liveUrl: "taskflow-demo.vercel.app",
    stack: "React · TypeScript",
    student: {
      name: "Alex Morgan",
      email: "alex.morgan@example.com",
      initials: "AM",
    },
    submittedDate: "Oct 18, 2026",
    relativeDate: "3 days ago",
    submittedTime: "14:32 EST",
    status: "Pending",
    icon: "grid",
    tone: "indigo",
    avatarTone: "amber",
  },
  {
    id: "devboard",
    project: "DevBoard",
    code: "DB",
    version: "v2.0",
    ticket: "#SF-7319",
    branch: "release-prod",
    commit: "#a81c3d2",
    summary: "Developer Metrics Dashboard",
    repo: "github.com/schen/devboard",
    liveUrl: "devboard-demo.vercel.app",
    stack: "Vue · Node.js",
    student: {
      name: "Sarah Chen",
      email: "sarah.chen@example.com",
      initials: "SC",
    },
    submittedDate: "Oct 17, 2026",
    relativeDate: "4 days ago",
    submittedTime: "09:18 EST",
    status: "Approved",
    icon: "code",
    tone: "blue",
    avatarTone: "violet",
  },
  {
    id: "shopnest",
    project: "ShopNest",
    code: "SN",
    version: "v0.9",
    ticket: "#SF-6102",
    branch: "feat-stripe",
    commit: "#c47e19b",
    summary: "Multi-vendor Commerce Core",
    repo: "github.com/jwilson/shopnest",
    liveUrl: "shopnest-demo.vercel.app",
    stack: "Next.js · Stripe",
    student: {
      name: "James Wilson",
      email: "james.wilson@example.com",
      initials: "JW",
    },
    submittedDate: "Oct 16, 2026",
    relativeDate: "5 days ago",
    submittedTime: "16:04 EST",
    status: "Rejected",
    icon: "layers",
    tone: "rose",
    avatarTone: "blue",
  },
  {
    id: "codetrack",
    project: "CodeTrack",
    code: "CT",
    version: "v1.1",
    ticket: "#SF-5541",
    branch: "staging",
    commit: "#b29d54e",
    summary: "Algorithmic Complexity Analyzer",
    repo: "github.com/edavis/codetrack",
    liveUrl: "codetrack-demo.vercel.app",
    stack: "Go · PostgreSQL",
    student: {
      name: "Emma Davis",
      email: "emma.davis@example.com",
      initials: "ED",
    },
    submittedDate: "Oct 15, 2026",
    relativeDate: "6 days ago",
    submittedTime: "11:47 EST",
    status: "Pending",
    icon: "file",
    tone: "indigo",
    avatarTone: "emerald",
  },
  {
    id: "learnhub",
    project: "LearnHub",
    code: "LH",
    version: "v3.2",
    ticket: "#SF-4890",
    branch: "main",
    commit: "#e73f018",
    summary: "Interactive Peer Learning Community",
    repo: "github.com/nbrown/learnhub",
    liveUrl: "learnhub-demo.vercel.app",
    stack: "React Native · Firebase",
    student: {
      name: "Noah Brown",
      email: "noah.brown@example.com",
      initials: "NB",
    },
    submittedDate: "Oct 14, 2026",
    relativeDate: "7 days ago",
    submittedTime: "08:05 EST",
    status: "Approved",
    icon: "grid",
    tone: "blue",
    avatarTone: "violet",
  },
];

const firstNames = [
  "Ava",
  "Liam",
  "Mia",
  "Ethan",
  "Zoe",
  "Lucas",
  "Isla",
  "Mason",
  "Aria",
  "Leo",
  "Nora",
  "Owen",
  "Ruby",
  "Caleb",
  "Ivy",
  "Julian",
];

const lastNames = [
  "Patel",
  "Kim",
  "Garcia",
  "Nguyen",
  "Taylor",
  "Martinez",
  "Clark",
  "Lewis",
];

const projectSeeds = [
  "FoodFleet",
  "MedSync",
  "StudySphere",
  "FinLedger",
  "PathFinder",
  "GreenGrid",
  "InsightAI",
  "Evently",
  "BookNook",
  "TravelMate",
  "FitPulse",
  "CivicLoop",
  "Shelfly",
  "CampusCart",
  "NoteWave",
  "BudgetBuddy",
];

const stacks = [
  "React · TypeScript",
  "Next.js · Prisma",
  "Vue · Node.js",
  "React Native · Firebase",
  "Svelte · Supabase",
  "Angular · NestJS",
  "Go · PostgreSQL",
  "Python · Django",
  "Swift · CoreData",
  "Kotlin · Room",
  "Next.js · Stripe",
  "Rust · Axum",
];

const iconCycle: Submission["icon"][] = ["grid", "code", "layers", "file"];
const toneCycle: SubmissionTone[] = [
  "indigo",
  "blue",
  "rose",
  "emerald",
  "amber",
];
const today = Date.UTC(2026, 9, 21);
const day = 24 * 60 * 60 * 1000;
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const statusPattern: SubmissionStatus[] = [
  "Approved",
  "Pending",
  "Approved",
  "Rejected",
  "Approved",
  "Pending",
  "Approved",
  "Approved",
];

function buildGeneratedSubmissions() {
  const remaining: SubmissionStatus[] = [];
  const remainingCounts: Record<SubmissionStatus, number> = {
    Pending: 32,
    Approved: 74,
    Rejected: 17,
  };
  let patternIndex = 0;

  while (remaining.length < 123) {
    const status = statusPattern[patternIndex % statusPattern.length];
    patternIndex += 1;

    if (remainingCounts[status] === 0) continue;

    remainingCounts[status] -= 1;
    remaining.push(status);
  }

  return remaining.map((status, index) => {
    const submissionIndex = index + seededSubmissions.length;
    const firstName = firstNames[index % firstNames.length];
    const lastName = lastNames[Math.floor(index / firstNames.length)];
    const project = projectSeeds[index % projectSeeds.length];
    const projectSlug = project.toLowerCase();
    const branch = ["main", "develop", "staging", "release-prod", "feat-ui"][
      index % 5
    ];
    const submittedAt = new Date(
      Date.UTC(2026, 9, 18) - (7 + Math.floor(index / 2)) * day,
    );
    const daysAgo = Math.round((today - submittedAt.getTime()) / day);
    const handle = `${firstName}${lastName}`
      .toLowerCase()
      .replace(/[^a-z]/g, "");

    return {
      id: `${projectSlug}-${submissionIndex}`,
      project,
      code: project.slice(0, 2).toUpperCase(),
      version: `v${1 + (index % 3)}.${index % 10}`,
      ticket: `#SF-${7100 + ((index * 37) % 2800)}`,
      branch,
      commit: `#${((index + 1) * 2654435761).toString(16).slice(0, 7)}`,
      summary: `${stacks[index % stacks.length].split(" · ")[0]} milestone build`,
      repo: `github.com/${handle}/${projectSlug}`,
      liveUrl: `${projectSlug}-demo.vercel.app`,
      stack: stacks[index % stacks.length],
      student: {
        name: `${firstName} ${lastName}`,
        email: `${firstName}.${lastName}@example.com`.toLowerCase(),
        initials: `${firstName[0]}${lastName[0]}`,
      },
      submittedDate: dateFormatter.format(submittedAt),
      relativeDate:
        daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`,
      submittedTime: ["08:05 EST", "10:22 EST", "13:47 EST", "16:14 EST"][
        index % 4
      ],
      status,
      icon: iconCycle[index % iconCycle.length],
      tone: toneCycle[index % toneCycle.length],
      avatarTone: toneCycle[(index + 2) % toneCycle.length],
    } satisfies Submission;
  });
}

export const mentorSubmissions: Submission[] = [
  ...seededSubmissions,
  ...buildGeneratedSubmissions(),
];

export function findMentorSubmission(id: string) {
  return mentorSubmissions.find((submission) => submission.id === id);
}

export const cohortTotal = mentorSubmissions.length;

export const cohortCounts = mentorSubmissions.reduce(
  (counts, submission) => {
    counts[submission.status] += 1;
    return counts;
  },
  { Pending: 0, Approved: 0, Rejected: 0 } as Record<SubmissionStatus, number>,
);

export const reviewPipeline = [
  {
    label: "Approved",
    value: cohortCounts.Approved,
    color: "bg-indigo-600",
    dot: "bg-indigo-600",
    pill: "bg-blue-50 text-slate-900",
  },
  {
    label: "Pending",
    value: cohortCounts.Pending,
    color: "bg-gray-600",
    dot: "bg-gray-600",
    pill: "bg-blue-50 text-slate-900",
  },
  {
    label: "Rejected",
    value: cohortCounts.Rejected,
    color: "bg-red-700",
    dot: "bg-red-700",
    pill: "bg-rose-200 text-red-800",
  },
] as const;

export const reviewTabs: {
  label: string;
  value: "All" | SubmissionStatus;
}[] = [
  { label: "All", value: "All" },
  { label: "Pending", value: "Pending" },
  { label: "Approved", value: "Approved" },
  { label: "Rejected", value: "Rejected" },
];

export function statusCount(status: "All" | SubmissionStatus) {
  return status === "All" ? cohortTotal : cohortCounts[status];
}

export function formatPercent(value: number) {
  return `${((value / cohortTotal) * 100).toFixed(1)}%`;
}
