import { mentorSubmissions, type Submission } from "@/components/mentor/data";
import { mentorProfile } from "@/components/mentor/profile";

export type StackChip = {
  label: string;
  dot: string;
};

export type Deliverable = {
  title: string;
  path: string;
  description: string;
};

export type TopologyNode = {
  label: string;
  caption: string;
  tone: "neutral" | "active" | "success";
};

export type DiffLine = {
  kind: "context" | "add" | "remove";
  text: string;
};

export type RubricCriterion = {
  title: string;
  hint: string;
  score: number;
  max: number;
  note: string;
};

export type ProjectDetail = {
  milestoneNumber: number;
  milestoneTitle: string;
  batch: string;
  submittedLabel: string;
  repositoryLabel: string;
  repositoryUrl: string;
  previewLabel: string;
  previewUrl: string;
  previewStatus: string;
  commitLabel: string;
  tests: string;
  coverage: string;
  vulnerabilities: string;
  services: string;
  bundle: string;
  stack: StackChip[];
  releaseLabel: string;
  abstract: string;
  latency: string;
  topology: TopologyNode[];
  deliverables: Deliverable[];
  diff: {
    file: string;
    additions: number;
    removals: number;
    hunk: string;
    lines: DiffLine[];
  };
  testing: {
    dockerCommand: string;
    stressCommand: string;
    description: string;
  };
  rubric: RubricCriterion[];
  review: {
    intro: string;
    commendations: string;
    recommendation: string;
  };
};

type MilestonePlan = {
  title: string;
  deliverables: Deliverable[];
};

const milestonePlans: MilestonePlan[] = [
  {
    title: "Microservices & Real-time sync",
    deliverables: [
      {
        title: "Event-driven RPC & Message Serialization",
        path: "pkg/rpc/broker.ts",
        description:
          "Protobuf schema defined with strict payload validations; zero packets dropped under a 3.5k concurrent message test run.",
      },
      {
        title: "Bi-directional WebSocket Broadcast with Heartbeat",
        path: "services/sync-ws/",
        description:
          "Client state reconciliation uses operational transformation for delta board movements with automatic 5s ping/pong keepalive.",
      },
      {
        title: "Docker Compose with 3 Isolated Replicas & Health Probes",
        path: "docker-compose.prod.yml",
        description:
          "Traefik reverse proxy configured with dynamic port round-robin balancing across three isolated application nodes.",
      },
    ],
  },
  {
    title: "Identity & Access Control",
    deliverables: [
      {
        title: "OAuth 2.0 Authorization Code Exchange",
        path: "services/auth/src/oauth.ts",
        description:
          "PKCE verifier rotation and short-lived access tokens are enforced across every callback boundary.",
      },
      {
        title: "Role-aware Policy Enforcement Middleware",
        path: "pkg/policy/guard.ts",
        description:
          "Policy decisions are centralized with explicit deny-by-default rules and typed request context.",
      },
      {
        title: "Immutable Session Audit Trail",
        path: "services/auth/src/audit.ts",
        description:
          "Authentication events are appended to an immutable stream with actor, device, and IP metadata.",
      },
    ],
  },
  {
    title: "Analytics & Cohort Insights",
    deliverables: [
      {
        title: "Streaming Metric Aggregation Pipeline",
        path: "services/analytics/src/rollup.ts",
        description:
          "Windowed aggregations process event batches without blocking the primary transactional workload.",
      },
      {
        title: "Interactive Cohort Dashboard Widgets",
        path: "apps/web/components/metrics/",
        description:
          "Responsive widgets expose trends, comparisons, and empty states with accessible keyboard controls.",
      },
      {
        title: "Scheduled CSV & PDF Report Export",
        path: "services/reports/src/export.ts",
        description:
          "Exports are generated in a background worker with deterministic snapshots and download expiry.",
      },
    ],
  },
  {
    title: "Payments & Billing",
    deliverables: [
      {
        title: "Idempotent Checkout Intent Handler",
        path: "services/billing/src/intent.ts",
        description:
          "Duplicate checkout attempts are collapsed using idempotency keys and a persisted intent lifecycle.",
      },
      {
        title: "Signed Webhook Reconciliation Worker",
        path: "services/billing/src/webhook.ts",
        description:
          "Provider webhooks are signature-verified, deduplicated, and replayed safely after transient failures.",
      },
      {
        title: "Tokenized Payment Method Vault",
        path: "pkg/vault/tokenize.ts",
        description:
          "Sensitive payment details never touch the application database; only provider tokens are retained.",
      },
    ],
  },
  {
    title: "Search & Discovery",
    deliverables: [
      {
        title: "Typo-tolerant Query Planner",
        path: "services/search/src/query.ts",
        description:
          "Queries are normalized, tokenized, and expanded against a fuzzy synonym dictionary before ranking.",
      },
      {
        title: "Incremental Vector Index Synchronizer",
        path: "services/search/src/sync.ts",
        description:
          "Index updates are queued per document revision and applied without rebuilding the full corpus.",
      },
      {
        title: "Relevance Guardrails & Result Caching",
        path: "services/search/src/rank.ts",
        description:
          "Ranking weights are bounded, cache keys include filters, and stale results expire automatically.",
      },
    ],
  },
  {
    title: "Deployment & Observability",
    deliverables: [
      {
        title: "Blue/Green Release Orchestrator",
        path: "infra/release/controller.ts",
        description:
          "Release traffic switches only after the green environment passes readiness and smoke checks.",
      },
      {
        title: "Structured Logging & Trace Propagation",
        path: "pkg/observability/trace.ts",
        description:
          "Every request carries a trace identifier across gateway, worker, and persistence boundaries.",
      },
      {
        title: "Automated Rollback Health Gates",
        path: "infra/health/gates.ts",
        description:
          "Error-rate and latency thresholds trigger an automatic rollback with a full incident snapshot.",
      },
    ],
  },
];

const stackDots = [
  "bg-indigo-600",
  "bg-blue-500",
  "bg-violet-500",
  "bg-slate-600",
  "bg-rose-600",
  "bg-indigo-500",
];

const contextDiffLines: DiffLine[] = [
  { kind: "context", text: "const redis = new Redis(process.env.REDIS_URL);" },
  { kind: "remove", text: "- await redis.subscribe('board:general_updates');" },
  {
    kind: "remove",
    text: "- redis.on('message', (channel, msg) => broadcast(msg));",
  },
  {
    kind: "add",
    text: "+ // Optimized Multi-Tenant Redis Shard Fanout",
  },
  {
    kind: "add",
    text: "+ await redis.psubscribe('tenant:*:workspace:events');",
  },
  {
    kind: "add",
    text: "+ redis.on('pmessage', async (pattern, channel, payload) => {",
  },
  {
    kind: "add",
    text: "+ const { tenantId, event, timestamp } = JSON.parse(payload);",
  },
  {
    kind: "add",
    text: "+ await auditMetricsCollector.record(tenantId, event, timestamp);",
  },
  {
    kind: "add",
    text: "+ socketServer.to(`room:${tenantId}`).emit('sync', payload);",
  },
  { kind: "add", text: "+ });" },
  {
    kind: "context",
    text: "logger.info('Gateway consumer registered successfully');",
  },
];

function milestonePlanFor(index: number) {
  return milestonePlans[index % milestonePlans.length];
}

function releaseVersion(version: string) {
  return version.endsWith(".0") ? version : `${version}.0`;
}

function buildStack(submission: Submission) {
  const [primary, secondary] = submission.stack.split(" · ");
  const candidates = [
    primary,
    secondary,
    "WebSocket / Socket.io",
    "Docker Compose (3 Nodes)",
    "Redis 7.2 Pub/Sub",
    "Prisma ORM & Postgres",
  ].filter((label): label is string => Boolean(label));

  return Array.from(new Set(candidates)).map((label, index) => ({
    label,
    dot: stackDots[index % stackDots.length],
  }));
}

function buildRubric(index: number): RubricCriterion[] {
  const scores = [
    Math.max(18, 24 - (index % 4)),
    Math.max(22, 29 - (index % 5)),
    Math.max(18, 23 - (index % 4)),
    Math.max(15, 20 - (index % 3)),
  ];

  return [
    {
      title: "Architecture & Microservices",
      hint: "Decoupling, Redis messaging, reliability",
      score: scores[0],
      max: 25,
      note: "Clear ownership boundaries and durable message contracts across service edges.",
    },
    {
      title: "Test Suite & Concurrency",
      hint: "Unit, stress coverage, zero race condition",
      score: scores[1],
      max: 30,
      note: "Coverage is healthy and concurrency tests exercise the critical write paths.",
    },
    {
      title: "Code Documentation & API Spec",
      hint: "OpenAPI 3.1 definitions, typed schemas",
      score: scores[2],
      max: 25,
      note: "Typed contracts are present; a few event payloads could use richer examples.",
    },
    {
      title: "Deployment & Reliability",
      hint: "Container cluster, live preview deploy",
      score: scores[3],
      max: 20,
      note: "Preview deployment is stable with sensible health checks and restart policies.",
    },
  ];
}

export function buildProjectDetail(submission: Submission): ProjectDetail {
  const index = Math.max(
    0,
    mentorSubmissions.findIndex((item) => item.id === submission.id),
  );
  const plan = milestonePlanFor(index);
  const milestoneNumber = (index % milestonePlans.length) + 1;
  const firstName = submission.student.name.split(" ")[0];
  const projectSlug = submission.id.replace(/[^a-z0-9]+/g, "-");
  const scoreRubric = buildRubric(index);
  const stack = buildStack(submission);

  if (submission.id === "taskflow") {
    return {
      milestoneNumber: 4,
      milestoneTitle: "Microservices & Real-time sync",
      batch: "Batch 2026-Fall",
      submittedLabel: `${submission.submittedDate} (${submission.relativeDate})`,
      repositoryLabel: "alexm/taskflow-v2",
      repositoryUrl: "https://github.com/alexm/taskflow-v2",
      previewLabel: "taskflow.vercel.app",
      previewUrl: "https://taskflow.vercel.app",
      previewStatus: "200 OK",
      commitLabel: submission.commit,
      tests: "36/36 Tests Passed",
      coverage: "98% Cov",
      vulnerabilities: "0 Vuln",
      services: "6 Services Active",
      bundle: "4.8 MB bundle",
      stack: [
        { label: "Next.js 14 (App Router)", dot: "bg-indigo-600" },
        { label: "TypeScript 5.3", dot: "bg-indigo-500" },
        { label: "WebSocket / Socket.io", dot: "bg-violet-500" },
        { label: "Docker Compose (3 Nodes)", dot: "bg-slate-600" },
        { label: "Redis 7.2 Pub/Sub", dot: "bg-rose-600" },
        { label: "Prisma ORM & Postgres", dot: "bg-indigo-500" },
      ],
      releaseLabel: "Student Release Notes v1.4.0",
      abstract:
        "For Milestone #4, our team separated monolithic state management into three autonomous containerized microservices: Auth/Session Gateway, Real-Time Event Broker (Redis + Socket.io), and the Persistence Engine.\nConcurrency testing simulated 5,000 parallel collaborative card mutations without data collisions using optimistic locking in Prisma and Redis stream fan-outs.",
      latency: "End-to-End Latency: 14ms (p99)",
      topology: [
        { label: "Client Web", caption: "Next.js UI", tone: "neutral" },
        { label: "API Gateway", caption: "Reverse Proxy", tone: "active" },
        { label: "Redis PubSub", caption: "Event Stream", tone: "neutral" },
        { label: "PostgreSQL", caption: "Prisma Engine", tone: "success" },
      ],
      deliverables: milestonePlans[0].deliverables,
      diff: {
        file: "services/event-gateway/src/subscriber.ts",
        additions: 412,
        removals: 86,
        hunk: "@@ -34,11 +34,19 @@ export async function initSubscriber() {",
        lines: contextDiffLines,
      },
      testing: {
        dockerCommand: "docker compose up --build -d",
        stressCommand: "npm run test:stress",
        description:
          "will provision 3 node replicas along with a local Redis instance on port 6379. Run the stress command to trigger the k6 load generator.",
      },
      rubric: [
        {
          title: "Architecture & Microservices",
          hint: "Decoupling, Redis messaging, reliability",
          score: 24,
          max: 25,
          note: "Superb decoupling; clear interface segregation between gateway and worker nodes.",
        },
        {
          title: "Test Suite & Concurrency",
          hint: "Unit, stress coverage, zero race condition",
          score: 29,
          max: 30,
          note: "98% coverage verified via CI; stress test passed without lock contention.",
        },
        {
          title: "Code Documentation & API Spec",
          hint: "OpenAPI 3.1 definitions, typed schemas",
          score: 23,
          max: 25,
          note: "README is comprehensive. A few WebSocket broadcast event payloads lack schema descriptions.",
        },
        {
          title: "Deployment & Reliability",
          hint: "Docker 3-replica cluster, live Vercel deploy",
          score: 20,
          max: 20,
          note: "Flawless staging deployment with healthy replica failover recovery.",
        },
      ],
      review: {
        intro:
          `Alex, exceptional work on Milestone #4. Your decision to partition the WebSocket gateway from the core persistence layer ensures that high-volume collaborative traffic won’t throttle transactional mutations.`,
        commendations:
          "Commendations:\n- Outstanding load test telemetry with sub-20ms broadcast latency.\n- Clean container configuration using multi-stage Alpine builds.",
        recommendation:
          "Recommendation for Final Capstone:\n- Add automatic Dead Letter Queue (DLQ) processing for unhandled Redis sync messages before enterprise submission.",
      },
    };
  }

  const passedTests = 30 + ((index * 5) % 7);
  const coverage = 93 + ((index * 3) % 6);
  const bundle = (2.8 + (index % 9) * 0.2).toFixed(1);
  const services = 4 + (index % 4);
  const latency = 10 + (index % 9);
  const planLower = plan.title.toLowerCase();

  return {
    milestoneNumber,
    milestoneTitle: plan.title,
    batch: "Batch 2026-Fall",
    submittedLabel: `${submission.submittedDate} (${submission.relativeDate})`,
    repositoryLabel: submission.repo.replace(/^github\.com\//, ""),
    repositoryUrl: `https://${submission.repo}`,
    previewLabel: submission.liveUrl,
    previewUrl: `https://${submission.liveUrl}`,
    previewStatus: "200 OK",
    commitLabel: submission.commit,
    tests: `${passedTests}/36 Tests Passed`,
    coverage: `${coverage}% Cov`,
    vulnerabilities: index % 11 === 0 ? "1 Vuln" : "0 Vuln",
    services: `${services} Services Active`,
    bundle: `${bundle} MB bundle`,
    stack,
    releaseLabel: `Student Release Notes ${releaseVersion(submission.version)}`,
    abstract: `For Milestone #${milestoneNumber}, ${firstName} delivered ${projectSlug} as a focused ${planLower} increment.\nThe implementation splits responsibilities across independently deployable services, with typed contracts, observable failure handling, and a repeatable local environment. A 5,000 event concurrency run completed without data collisions, and the staged preview remained responsive throughout validation.`,
    latency: `End-to-End Latency: ${latency}ms (p99)`,
    topology: [
      { label: "Client Web", caption: "Next.js UI", tone: "neutral" },
      { label: "API Gateway", caption: "Reverse Proxy", tone: "active" },
      { label: "Redis PubSub", caption: "Event Stream", tone: "neutral" },
      { label: "PostgreSQL", caption: "Prisma Engine", tone: "success" },
    ],
    deliverables: plan.deliverables,
    diff: {
      file: `services/${projectSlug}/src/subscriber.ts`,
      additions: 318 + ((index * 17) % 140),
      removals: 54 + ((index * 11) % 60),
      hunk: "@@ -34,11 +34,19 @@ export async function initSubscriber() {",
      lines: contextDiffLines,
    },
    testing: {
      dockerCommand: "docker compose up --build -d",
      stressCommand: "npm run test:stress",
      description:
        "will provision 3 node replicas along with a local Redis instance on port 6379. Run the stress command to trigger the k6 load generator.",
    },
    rubric: scoreRubric,
    review: {
      intro: `${firstName}, this is a well-scoped ${planLower} submission. The service boundaries are easy to follow and the deployment path is reproducible from a clean checkout.`,
      commendations:
        "Commendations:\n- Clear separation between transport, domain, and persistence concerns.\n- Test coverage exercises the highest-risk mutation paths.",
      recommendation:
        "Recommendation for Final Capstone:\n- Add failure-injection coverage for upstream timeouts and partial writes before enterprise submission.",
    },
  };
}

export const projectDetailAdvisor = mentorProfile.name;
