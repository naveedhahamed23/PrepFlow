import { Code2, Calculator, Mic, CalendarDays, FileText, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

/* ─── Quick Actions Strip ─────────────────────────────────────── */
export function QuickActionsStrip() {
  const actions = [
    { label: "Solve a Problem", icon: Code2, bg: "bg-[#1D4ED8]", border: "border-[#2563EB]/40", hover: "hover:bg-[#2563EB]" },
    { label: "Take an Aptitude Test", icon: Calculator, bg: "bg-[#92400E]", border: "border-[#F59E0B]/30", hover: "hover:bg-[#B45309]" },
    { label: "Start Mock Interview", icon: Mic, bg: "bg-[#9D174D]", border: "border-[#EC4899]/30", hover: "hover:bg-[#BE185D]" },
    { label: "Plan My Study", icon: CalendarDays, bg: "bg-[#065F46]", border: "border-[#10B981]/30", hover: "hover:bg-[#047857]" },
    { label: "Edit Resume", icon: FileText, bg: "bg-[#4C1D95]", border: "border-[#8B5CF6]/30", hover: "hover:bg-[#6D28D9]" },
  ];

  return (
    <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="shrink-0">
          <h3 className="text-sm font-semibold text-[#F0F4FF]">Quick Actions</h3>
          <p className="text-[10px] text-[#4A6080] mt-0.5">Jump into your preparation</p>
        </div>
        <div className="flex flex-wrap gap-2 flex-1">
          {actions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={idx}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-white border transition-all hover:scale-105 active:scale-100 shrink-0 shadow-sm",
                  action.bg, action.border, action.hover
                )}
              >
                <Icon size={12} /> {action.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Recent Activity List ────────────────────────────────────── */
export function RecentActivityList({ activities }) {
  const icons = { Code2, Calculator, Mic, FileText, BookOpen: FileText };
  const iconBg = {
    success: "bg-[#22C55E]/15 text-[#22C55E]",
    warning: "bg-[#F59E0B]/15 text-[#F59E0B]",
    danger: "bg-[#EF4444]/15 text-[#EF4444]",
    primary: "bg-[#3B82F6]/15 text-[#3B82F6]",
    secondary: "bg-[#06B6D4]/15 text-[#06B6D4]",
  };

  return (
    <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4 h-full shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] card-hover">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#F0F4FF]">Recent Activity</h3>
        <button className="text-[10px] text-[#3B82F6] hover:text-[#60A5FA] font-medium transition-colors flex items-center gap-1">
          View All <ArrowRight size={10} />
        </button>
      </div>
      <div className="space-y-3">
        {activities.map(activity => {
          const Icon = icons[activity.icon] || Code2;
          return (
            <div key={activity.id} className="flex items-center gap-3">
              <div className={cn("flex h-6 w-6 items-center justify-center rounded-lg shrink-0", iconBg[activity.color])}>
                <Icon size={11} />
              </div>
              <p className="text-[10px] text-[#C8D8F0] font-medium flex-1 truncate">{activity.title}</p>
              <p className="text-[9px] text-[#4A6080] shrink-0 whitespace-nowrap">{activity.time}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Strengths + Areas to Improve ───────────────────────────── */
export function StrengthsWeaknesses({ strengths, areasToImprove }) {
  return (
    <>
      {/* Your Strengths */}
      <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4 h-full shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] card-hover">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#22C55E]/15">
            <ArrowUp size={12} className="text-[#22C55E]" />
          </div>
          <h3 className="text-sm font-semibold text-[#F0F4FF]">Your Strengths</h3>
        </div>
        <div className="space-y-3">
          {strengths.map((item, idx) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-[#22C55E]/10 shrink-0">
                <div className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-[#7B91B0] truncate pr-2">{item.name}</span>
                  <span className="text-[10px] font-semibold text-[#22C55E]">{item.value}%</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-[#1E2D45]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 0.7, delay: idx * 0.1 }}
                    className="h-full rounded-full bg-[#22C55E]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Areas to Improve */}
      <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4 h-full shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] card-hover">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#EF4444]/15">
            <ArrowDown size={12} className="text-[#EF4444]" />
          </div>
          <h3 className="text-sm font-semibold text-[#F0F4FF]">Areas to Improve</h3>
        </div>
        <div className="space-y-3">
          {areasToImprove.map((item, idx) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-[#EF4444]/10 shrink-0">
                <div className="h-1.5 w-1.5 rounded-full bg-[#EF4444]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-[#7B91B0] truncate pr-2">{item.name}</span>
                  <span className="text-[10px] font-semibold text-[#EF4444]">{item.value}%</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-[#1E2D45]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 0.7, delay: idx * 0.1 }}
                    className="h-full rounded-full bg-[#EF4444]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
