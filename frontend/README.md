# PrepFlow

An AI-powered placement preparation platform — DSA tracking, aptitude practice,
resume ATS scoring, mock interviews, an AI assistant, a study planner, analytics,
and a leaderboard. Fully frontend, running on mock data, architected to plug
into a Spring Boot REST API later with minimal changes.

## Tech Stack

React 19 · Vite · Tailwind CSS · React Router · Framer Motion · Recharts ·
Lucide Icons · Axios · React Hook Form

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:5173. Log in / register with **any** email and a
6+ character password — auth is fully mocked, no real backend required.

## Project Structure

```
src/
  components/   Reusable UI (ui/), layout (sidebar, topbar, footer),
                and page-specific pieces (dashboard/, dsa/, ai/, landing/, charts/)
  pages/        One file per route (Dashboard, DSATracker, Aptitude, ...)
  layouts/      PublicLayout, AuthLayout, AppLayout (sidebar + topbar shell)
  context/      AuthContext, ToastContext, CommandPaletteContext
  hooks/        useFetch, useDebounce, useMediaQuery
  services/     Axios-based API layer (see below)
  data/         Realistic mock JSON used by the services
  utils/        Formatting & className helpers
```

## Connecting to a Real Spring Boot Backend

Every service file in `src/services/` is already written against a single
shared Axios instance (`src/services/api.js`) with the exact response shape
(`{ data, status }`) a real Axios call returns. Right now each function has:

```js
const USE_MOCK = true;

getProblems: async (filters) => {
  if (USE_MOCK) return mockResponse(dsaProblems);
  return api.get("/dsa/problems", { params: filters });
}
```

To go live against Spring Boot:

1. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to your backend,
   e.g. `http://localhost:8080/api`.
2. In each service file, flip `USE_MOCK` to `false` (or delete the mock
   branch entirely) — the real `api.get/post/put/delete` calls underneath
   are already wired to the correct REST-style endpoint paths, documented
   as a comment above each function.
3. `src/services/api.js` already attaches a `Bearer` token from
   `localStorage` on every request and clears it on a `401`, so once your
   Spring Security config issues JWTs on `/auth/login`, nothing else in the
   app needs to change.

No page or component talks to Axios directly — they only ever call service
functions, so this swap never touches UI code.

## Notes

- Auth (`ProtectedRoute`) is a **frontend-only** guard based on a token in
  `localStorage`; it does not verify anything server-side until you wire up
  real auth.
- All charts, tables, and stats currently render seeded mock data from
  `src/data/`.
- `Ctrl/Cmd + K` opens the command palette from anywhere inside `/app/*`.
