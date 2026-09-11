import { Trophy, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LeaderboardComparisonCard({ percentile = 68 }) {
  const navigate = useNavigate();
  const topPercentile = 100 - percentile; // e.g. 100 - 68 = 32%

  return (
    <div className="relative overflow-hidden rounded-xl border border-blue-500/30 bg-gradient-to-br from-[#0B1530] via-[#101B3B] to-[#1A1438] p-5 shadow-lg flex flex-col justify-between min-w-0">
      {/* Background SVG Mountain / Flag aesthetic matching reference */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl opacity-30">
        <svg
          className="absolute right-0 bottom-0 h-full w-auto max-w-none text-purple-600/30"
          viewBox="0 0 300 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M180 150L240 60L300 150H180Z" fill="url(#lbGrad1)" />
          <path d="M220 150L270 80L320 150H220Z" fill="url(#lbGrad2)" />
          <defs>
            <linearGradient id="lbGrad1" x1="240" y1="60" x2="240" y2="150" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="1" stopColor="#0D1424" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="lbGrad2" x1="270" y1="80" x2="270" y2="150" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EC4899" stopOpacity="0.6" />
              <stop offset="1" stopColor="#0D1424" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 space-y-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
          <Trophy size={20} />
        </div>

        <div>
          <h3 className="text-base font-extrabold text-white">
            You&apos;re in the top {topPercentile}%!
          </h3>
          <p className="text-xs text-text-muted mt-1 leading-relaxed">
            Keep going! You&apos;re performing better than {percentile}% of PrepFlow users.
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate("/app/leaderboard")}
        className="relative z-10 mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-600/30 hover:from-blue-500 hover:to-purple-500 transition-all"
      >
        <span>View Leaderboard</span>
        <ArrowRight size={15} />
      </button>
    </div>
  );
}
