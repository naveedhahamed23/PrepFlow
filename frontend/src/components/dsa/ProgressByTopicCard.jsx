import { motion } from "framer-motion";

export default function ProgressByTopicCard({ topicStats = [], onSelectTopic }) {
  const getPercentageColor = (pct) => {
    if (pct >= 50) return "text-emerald-400 font-bold";
    if (pct >= 40) return "text-amber-400 font-bold";
    return "text-orange-500 font-bold";
  };

  return (
    <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm min-w-0">
      {/* Header & Controls */}
      <div className="flex items-center justify-between border-b border-[#1E2D45]/60 pb-3">
        <div>
          <h3 className="text-base font-bold text-white">Progress by Topic</h3>
          <p className="text-xs text-text-muted">Solved vs total problems per topic</p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-text-muted">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" /> Solved
          </span>
          <span className="flex items-center gap-1.5 text-text-muted">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-700" /> Total
          </span>
        </div>
      </div>

      {/* Topic List with Progress Bars matching reference screenshot */}
      <div className="mt-4 space-y-3.5">
        {topicStats.map((item) => (
          <div
            key={item.topic}
            onClick={() => onSelectTopic && onSelectTopic(item.topic)}
            className="group cursor-pointer space-y-1 transition-all hover:bg-white/5 p-1 rounded-lg"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white group-hover:text-blue-400 w-36 truncate">
                {item.topic}
              </span>

              {/* Progress bar container */}
              <div className="flex-1 mx-4 h-2.5 overflow-hidden rounded-full bg-[#162238] relative">
                {/* Total background bar */}
                <div className="absolute inset-0 bg-[#162238]" />

                {/* Solved blue bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400 relative z-10"
                />
              </div>

              {/* Counts & Percentage */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-text-muted text-[11px] w-12 text-right">
                  {item.solved} / {item.total}
                </span>
                <span className={`w-10 text-right ${getPercentageColor(item.percentage)}`}>
                  {item.percentage}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
