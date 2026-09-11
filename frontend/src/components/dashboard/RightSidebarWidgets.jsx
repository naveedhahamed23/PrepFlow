import { ArrowRight, Code2, Calculator, Mic, FileText, Flame, Lightbulb } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

/* ─── Today's Progress ─────────────────────────────────────────── */
export function TodaysProgress({ data }) {
  const pieData = data.tasks.map(t => ({ name: t.name, value: t.completed, color: t.color }));
  const totalValue = pieData.reduce((acc, curr) => acc + curr.value, 0);
  if (totalValue < data.total) {
    pieData.push({ name: "Remaining", value: data.total - totalValue, color: "#1E2D45" });
  }

  return (
    <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] card-hover">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-semibold text-[#F0F4FF]">Today&apos;s Progress</h3>
        <span className="text-[10px] text-[#4A6080]">Thu, Sep 11</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Donut */}
        <div className="relative h-[88px] w-[88px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={30}
                outerRadius={42}
                dataKey="value"
                stroke="#0D1424"
                strokeWidth={2}
                paddingAngle={1}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-[#F0F4FF] leading-none">{data.completed}/{data.total}</span>
            <span className="text-[9px] text-[#4A6080] mt-0.5">Tasks done</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-1.5">
          {data.tasks.map(task => (
            <div key={task.name} className="flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: task.color }} />
                <span className="text-[#7B91B0]">{task.name}</span>
              </div>
              <span className="text-[#C8D8F0] font-medium">{task.completed}/{task.total}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Next Best Action ─────────────────────────────────────────── */
export function NextBestAction() {
  return (
    <div className="rounded-xl border border-[#F59E0B]/20 bg-[#0D1424] p-4 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] card-hover"
      style={{ backgroundImage: "linear-gradient(135deg, rgba(13,20,36,1) 0%, rgba(16,22,45,1) 100%)" }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F59E0B]/15 shrink-0">
          <Lightbulb size={15} className="text-[#F59E0B]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <h3 className="text-xs font-bold text-[#F0F4FF]">Next Best Action</h3>
            <ArrowRight size={12} className="text-[#4A6080] shrink-0" />
          </div>
          <p className="text-[10px] text-[#7B91B0] leading-relaxed">
            Your interview practice is lagging behind. Take a 30-minute mock interview today.
          </p>
        </div>
      </div>
      <button className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(37,99,235,0.4)]">
        Start Mock Interview <ArrowRight size={13} />
      </button>
    </div>
  );
}

/* ─── Upcoming Goals ───────────────────────────────────────────── */
export function UpcomingGoals({ goals }) {
  const icons = { Code2, Calculator, Mic, FileText, Flame };
  const iconBg = {
    primary: "bg-[#3B82F6]/15 text-[#3B82F6]",
    danger: "bg-[#EF4444]/15 text-[#EF4444]",
    warning: "bg-[#F59E0B]/15 text-[#F59E0B]",
  };
  const barColor = {
    primary: "#3B82F6",
    danger: "#EF4444",
    warning: "#F59E0B",
  };

  return (
    <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] card-hover">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#F0F4FF]">Upcoming Goals</h3>
        <button className="text-[10px] text-[#3B82F6] hover:text-[#60A5FA] font-medium transition-colors">View All</button>
      </div>

      <div className="space-y-3.5">
        {goals.map(goal => {
          const Icon = icons[goal.icon] || Code2;
          const pct = Math.min((goal.progress / goal.total) * 100, 100);

          return (
            <div key={goal.id} className="flex gap-2.5 items-center">
              <div className={cn("flex h-6 w-6 items-center justify-center rounded-lg shrink-0", iconBg[goal.color])}>
                <Icon size={11} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[10px] font-medium text-[#C8D8F0] truncate pr-2">{goal.title}</p>
                  <p className="text-[9px] text-[#06B6D4] whitespace-nowrap shrink-0">Due in {goal.dueIn}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-[#4A6080] w-10 shrink-0">{goal.progress}/{goal.total}</span>
                  <div className="flex-1 h-1 overflow-hidden rounded-full bg-[#1E2D45]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: barColor[goal.color] }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Promo Card ───────────────────────────────────────────────── */
export function PromoCard() {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-[#1E2D45] p-4 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]"
      style={{
        background: "linear-gradient(135deg, #080E20 0%, #0C1530 50%, #0A1028 100%)",
      }}
    >
      {/* Mountain SVG */}
      <div className="absolute bottom-0 right-0 opacity-70">
        <svg viewBox="0 0 160 80" width="140" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L40 40L65 58L100 20L135 48L160 30L160 80Z" fill="#1E3A8A" opacity="0.8" />
          <path d="M0 80L30 55L60 68L90 38L120 58L160 40L160 80Z" fill="#1E40AF" opacity="0.6" />
          {/* Flag */}
          <circle cx="130" cy="39" r="3" fill="#EC4899" opacity="0.9" />
        </svg>
      </div>

      <div className="relative z-10">
        <p className="text-[11px] italic text-[#7B91B0] leading-relaxed max-w-[140px]">
          &quot;You are closer to your dream job than you think.&quot;
        </p>
        <button className="mt-3 group flex items-center gap-1.5 rounded-lg border border-[#3B82F6]/25 bg-[#3B82F6]/10 px-3 py-1.5 text-[10px] font-semibold text-[#60A5FA] transition-all hover:bg-[#3B82F6]/20">
          Keep Going <ArrowRight size={10} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
