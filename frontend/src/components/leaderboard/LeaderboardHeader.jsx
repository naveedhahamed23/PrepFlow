import { motion } from "framer-motion";

export default function LeaderboardHeader() {
  return (
    <div className="relative mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-[#1E2D45] bg-[#0B132B]/80 p-5 backdrop-blur-md md:flex-row md:items-center">
      {/* Background SVG Aesthetic matching reference */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-40">
        <svg
          className="absolute right-0 top-0 h-full w-auto max-w-none text-blue-900/30"
          viewBox="0 0 600 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="500" cy="50" r="40" fill="#3B82F6" fillOpacity="0.2" />
          <path
            d="M350 200L440 80L520 200H350Z"
            fill="url(#lbMountain1)"
          />
          <path
            d="M450 200L520 110L600 200H450Z"
            fill="url(#lbMountain2)"
          />
          <defs>
            <linearGradient
              id="lbMountain1"
              x1="435"
              y1="80"
              x2="435"
              y2="200"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1E3A8A" stopOpacity="0.8" />
              <stop offset="1" stopColor="#0B132B" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient
              id="lbMountain2"
              x1="525"
              y1="110"
              x2="525"
              y2="200"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2563EB" stopOpacity="0.6" />
              <stop offset="1" stopColor="#0B132B" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 space-y-1">
        <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
          <span>Dashboard</span>
          <span>&gt;</span>
          <span className="text-blue-400 font-semibold">Leaderboard</span>
        </div>
        <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          <span>🏆 Leaderboard</span>
        </h1>
        <p className="text-xs text-text-muted sm:text-sm">
          Compete, stay consistent, and grow together.
        </p>
      </div>

      {/* Motivational Banner matching reference */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative z-10 min-w-[240px] rounded-xl border border-blue-500/20 bg-blue-950/40 p-3.5 backdrop-blur-md"
      >
        <p className="text-xs italic text-blue-200">
          &ldquo;A little progress each day
          <br />
          leads to big results.&rdquo;
        </p>
        <div className="mt-2 h-0.5 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
      </motion.div>
    </div>
  );
}
