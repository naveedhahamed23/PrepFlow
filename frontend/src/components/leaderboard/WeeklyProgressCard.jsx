import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { WEEKLY_PROGRESS_DATA } from "../../data/leaderboardData";

export default function WeeklyProgressCard() {
  const maxVal = Math.max(...WEEKLY_PROGRESS_DATA.map((d) => d.val));

  return (
    <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white">Weekly Progress</h3>
        <span className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/20">
          +18% <TrendingUp size={12} />
        </span>
      </div>

      {/* Bar Chart matching reference screenshot */}
      <div className="mt-5 flex h-28 items-end justify-between gap-2 border-b border-[#1E2D45] pb-2">
        {WEEKLY_PROGRESS_DATA.map((item, idx) => {
          const heightPct = Math.round((item.val / maxVal) * 100);
          const isHighlight = item.day === "Sun" || item.day === "Thu";

          return (
            <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${heightPct}%` }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" }}
                className={`w-full rounded-t-sm transition-all ${
                  isHighlight
                    ? "bg-blue-500 shadow-sm shadow-blue-500/40"
                    : "bg-blue-600/30 hover:bg-blue-500/50"
                }`}
              />
              <span className="text-[10px] font-semibold text-text-muted">
                {item.day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Encouraging Banner */}
      <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
          <TrendingUp size={16} />
        </div>
        <div>
          <p className="text-xs font-bold text-white">You&apos;re more active this week!</p>
          <p className="text-[11px] text-text-muted">Keep it up!</p>
        </div>
      </div>
    </div>
  );
}
