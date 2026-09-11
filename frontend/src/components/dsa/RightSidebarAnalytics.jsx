import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

const TOPIC_DONUT_COLORS = [
  "#3B82F6", // Arrays (blue)
  "#10B981", // Strings (green)
  "#06B6D4", // Linked Lists (cyan)
  "#F59E0B", // Trees (amber)
  "#EF4444", // Graphs (red)
  "#A855F7", // DP (purple)
  "#64748B", // Others (slate)
];

const TOPIC_DONUT_DATA = [
  { name: "Arrays", value: 20 },
  { name: "Strings", value: 15 },
  { name: "Linked Lists", value: 10 },
  { name: "Trees", value: 8 },
  { name: "Graphs", value: 7 },
  { name: "DP", value: 6 },
  { name: "Others", value: 34 },
];

export default function RightSidebarAnalytics({ stats }) {
  const solvedCount = stats?.solvedCount ?? 142;
  const easyCount = stats?.difficultyBreakdown?.easy ?? 62;
  const mediumCount = stats?.difficultyBreakdown?.medium ?? 54;
  const hardCount = stats?.difficultyBreakdown?.hard ?? 26;

  const companies = stats?.companyDistribution || [
    { company: "Google", count: 28 },
    { company: "Amazon", count: 24 },
    { company: "Microsoft", count: 18 },
    { company: "Meta", count: 12 },
    { company: "Others", count: 60 },
  ];

  const companyColors = {
    Google: "bg-rose-500",
    Amazon: "bg-amber-500",
    Microsoft: "bg-blue-500",
    Meta: "bg-purple-500",
    Others: "bg-[#162238]",
  };

  return (
    <div className="space-y-6 min-w-0">
      {/* 1. Topic Distribution Card (Donut Chart) */}
      <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm min-w-0">
        <div>
          <h3 className="text-base font-bold text-white">Topic Distribution</h3>
          <p className="text-xs text-text-muted">Your solved problems by topic</p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 min-w-0">
          {/* Donut Chart with Center Text */}
          <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={TOPIC_DONUT_DATA}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={42}
                  outerRadius={65}
                  paddingAngle={3}
                >
                  {TOPIC_DONUT_DATA.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={TOPIC_DONUT_COLORS[index % TOPIC_DONUT_COLORS.length]}
                      stroke="#0D1424"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#070C16",
                    borderColor: "#1E2D45",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Text matching reference screenshot */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-lg font-black text-white">{solvedCount}</span>
              <span className="text-[10px] font-semibold text-text-muted">
                Solved
              </span>
            </div>
          </div>

          {/* Donut Legend Table */}
          <div className="space-y-1.5 text-[11px] min-w-0 flex-1 pl-2">
            {TOPIC_DONUT_DATA.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: TOPIC_DONUT_COLORS[idx] }}
                  />
                  <span className="text-text-muted truncate">{item.name}</span>
                </div>
                <span className="font-bold text-white ml-2">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Difficulty Breakdown Card */}
      <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm min-w-0 space-y-3">
        <div>
          <h3 className="text-sm font-bold text-white">Difficulty Breakdown</h3>
        </div>

        <div className="space-y-2.5 text-xs">
          {/* Easy */}
          <div className="space-y-1">
            <div className="flex justify-between font-semibold">
              <span className="text-emerald-400">Easy</span>
              <span className="text-white">{easyCount}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#162238]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (easyCount / solvedCount) * 100)}%` }}
                transition={{ duration: 0.6 }}
                className="h-full rounded-full bg-emerald-500"
              />
            </div>
          </div>

          {/* Medium */}
          <div className="space-y-1">
            <div className="flex justify-between font-semibold">
              <span className="text-amber-400">Medium</span>
              <span className="text-white">{mediumCount}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#162238]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (mediumCount / solvedCount) * 100)}%` }}
                transition={{ duration: 0.6 }}
                className="h-full rounded-full bg-amber-500"
              />
            </div>
          </div>

          {/* Hard */}
          <div className="space-y-1">
            <div className="flex justify-between font-semibold">
              <span className="text-rose-400">Hard</span>
              <span className="text-white">{hardCount}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#162238]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (hardCount / solvedCount) * 100)}%` }}
                transition={{ duration: 0.6 }}
                className="h-full rounded-full bg-rose-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Company Distribution Card */}
      <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm min-w-0 space-y-3">
        <div>
          <h3 className="text-sm font-bold text-white">Company Distribution</h3>
        </div>

        <div className="space-y-2 text-xs">
          {companies.slice(0, 5).map((comp) => {
            const barBg = companyColors[comp.company] || "bg-blue-600";
            return (
              <div key={comp.company} className="flex items-center justify-between gap-3">
                <span className="w-20 font-semibold text-text-muted truncate">
                  {comp.company}
                </span>

                <div className="flex-1 h-2 overflow-hidden rounded-full bg-[#162238]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (comp.count / 60) * 100)}%` }}
                    transition={{ duration: 0.6 }}
                    className={`h-full rounded-full ${barBg}`}
                  />
                </div>

                <span className="w-8 text-right font-bold text-white">{comp.count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
