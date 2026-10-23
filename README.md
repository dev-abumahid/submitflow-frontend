# SubmitFlow — Project Submission & Review Platform

SubmitFlow is a streamlined project submission and mentor review platform built for bootcamps, courses, and educational institutions. It facilitates an end-to-end workflow where students submit their repository and live preview links, and mentors review, evaluate, and provide feedback through a centralized review console.

---

## 🚀 Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Styling**: Tailwind CSS v4, Lucide React icons
- **State Management & Server Cache**: [@tanstack/react-query](https://tanstack.com/query) v5
- **HTTP Client**: Axios with automatic JWT refresh token interceptor and credential management
- **Type Safety**: TypeScript


## ✨ Features

- **Role-Based Portals**:
  - **Student Dashboard**: Submit new projects (`name`, `gitRepoUrl`, `previewUrl`, `description`), track live status (`PENDING`, `IN_PROGRESS`, `APPROVED`, `REJECTED`), edit pending submissions, and read mentor feedback.
  - **Mentor Console**: Browse all cohort submissions with keyword search and status filters, open detailed reviews, change submission status, and record actionable feedback.
- **Session Persistence**: Automatic refresh token rotation on reload and 401 interception ensures users remain securely authenticated without sudden logouts.
- **Locked Edits**: Submissions are strictly locked from student edits once under review or decided, preserving grading integrity.
- **Interactive UI**: Responsive landing page with interactive simulator, animated workflow pipeline, and live status indicators.

---

## 🛠️ Project Setup

### Prerequisites
- **Node.js** >= 18.18.0 (Node 20+ recommended)
- **npm** >= 9.x (or `pnpm` / `yarn`)
- **PostgreSQL** instance (local Postgres or cloud like Neon / Supabase)

---


### 1. Frontend Setup

1. Open a new terminal and clone repository:
   ```bash
   git clone https://github.com/dev-abumahid/submitflow-frontend.git
   ```

2. Install dependencies:
   ```bash
   cd submitflow-frontend
   npm install
   ```

3. Configure environment variables:
   Create `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Verify the backend API endpoint:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. Start frontend development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Default Credentials

For quick local testing, you can use the seeded mentor credentials or register a student account:

| Role | Email | Password |
|---|---|---|
| **Mentor** | `mentor@gmail.com` | `12345678` |
| **Student** | Create your own via [`/signup`](http://localhost:3000/signup) | Configured on signup |

---

## 📜 Available Scripts

In the directory:

| Command | Description |
|---|---|
| `npm run dev` | Runs the Next.js app in development mode with Turbopack |
| `npm run build` | Builds the optimized production build |
| `npm run start` | Starts the production Next.js server |
| `npm run lint` | Runs ESLint checks across the project |

---

## 📂 Project Structure

```text
frontend/
├── app/                        # Next.js App Router pages and layouts
│   ├── (public)/               # Landing page, login, signup
│   ├── dashboard/              # Student dashboard & submission flows
│   ├── mentor/                 # Mentor review list & single project review
│   └── profile/                # User profile management
├── components/
│   ├── dashboard/              # Student components (submit, submissions table)
│   ├── layouts/                # Protected layouts (mentor/student)
│   ├── mentor/                 # Mentor components (reviews table, review details)
│   ├── shared/                 # Shared components (Navbar, buttons, etc.)
│   └── ui/                     # UI building blocks (home sections, auth)
├── context/
│   └── auth-context.tsx        # Auth state provider with persistence & token management
├── lib/
│   ├── api.ts                  # Axios client with 401 refresh-token interceptors
│   └── utils.ts                # Tailwind utility helpers (cn)
├── providers/
│   └── query-provider.tsx      # TanStack Query Client provider wrapper
├── types/
│   └── api.ts                  # TypeScript interfaces for API models & payloads
└── api.md                      # Backend REST API documentation
```
