import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "../../utils/cn";

export default function MetricCard({ icon: Icon, title, value, detail, delta, progress, goal, colorClass, iconClass, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4 flex h-full flex-col justify-between shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] card-hover"
    >
      {/* Icon + label row */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", iconClass)}>
          <Icon size={17} />
        </div>
        <span className="text-xs font-semibold text-[#C8D8F0]">{title}</span>
      </div>

      {/* Value + delta */}
      <div className="flex items-end justify-between mb-1">
        <p className="text-2xl font-bold text-[#F0F4FF] leading-none">{value}</p>
        <div className="flex items-center gap-0.5 text-[11px] font-bold text-[#22C55E] mb-0.5">
          <ArrowUp size={11} strokeWidth={3} /> {delta}
        </div>
      </div>

      <p className="text-[11px] text-[#7B91B0] mb-4 leading-tight">{detail}</p>

      {/* Progress bar */}
      <div className="mt-auto">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-[#1E2D45] mb-1.5">
          <div className={cn("h-full rounded-full", colorClass)} style={{ width: `${progress}%` }} />
        </div>
        <p className="text-[10px] text-[#4A6080]">{goal}</p>
      </div>
    </motion.div>
  );
}
