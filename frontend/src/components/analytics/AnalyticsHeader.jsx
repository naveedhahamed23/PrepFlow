import { motion } from "framer-motion";
import { ChevronDown, Calendar } from "lucide-react";

export default function AnalyticsHeader({ timeRange, setTimeRange }) {
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
          <path d="M350 200L440 80L520 200H350Z" fill="url(#anMountain1)" />
          <path d="M450 200L520 110L600 200H450Z" fill="url(#anMountain2)" />
          <defs>
            <linearGradient
              id="anMountain1"
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
              id="anMountain2"
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
          <span className="text-blue-400 font-semibold">Analytics</span>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Analytics
        </h1>
        <p className="text-xs text-text-muted sm:text-sm">
          Understand your preparation. Find weak areas. Improve faster.
        </p>
      </div>

      {/* Time Range Selector & Motivational Banner */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Time Range Dropdown */}
        <div className="relative">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="appearance-none rounded-xl border border-[#1E2D45] bg-[#070C16] px-4 py-2 pr-9 text-xs font-bold text-white focus:border-blue-500 focus:outline-none cursor-pointer shadow-sm"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
        </div>

        {/* Motivational Banner matching reference */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="min-w-[200px] rounded-xl border border-blue-500/20 bg-blue-950/40 p-3 backdrop-blur-md"
        >
          <p className="text-xs italic text-blue-200">
            &ldquo;Progress is a series
            <br />
            of small wins.&rdquo;
          </p>
          <div className="mt-1.5 h-0.5 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
        </motion.div>
      </div>
    </div>
  );
}
