import { motion } from "framer-motion";
import { Code2, BarChart3, Mic, FileText, CalendarDays } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function ProgressOverview({ data }) {
  const icons = {
    "DSA": Code2,
    "Aptitude": BarChart3,
    "Interviews": Mic,
    "Resume": FileText,
    "Study Consistency": CalendarDays
  };

  const donutData = [
    { name: "Done", value: data.overall },
    { name: "Left", value: 100 - data.overall }
  ];

  return (
    <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4 flex flex-col min-h-[260px] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] card-hover">
      {/* Header with overall donut */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-[#F0F4FF]">Preparation Progress</h3>
          <p className="text-xs text-[#7B91B0] mt-0.5">Overall Readiness</p>
        </div>
        <div className="relative h-14 w-14 flex items-center justify-center shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={donutData} innerRadius={22} outerRadius={28} startAngle={90} endAngle={-270} dataKey="value" stroke="none">
                <Cell fill="#06B6D4" />
                <Cell fill="#1E2D45" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-[#F0F4FF]">
            {data.overall}%
          </span>
        </div>
      </div>

      {/* Progress bars */}
      <div className="flex-1 flex flex-col justify-end space-y-3">
        {data.breakdown.map((item, index) => {
          const Icon = icons[item.name] || Code2;
          return (
            <div key={item.name} className="flex items-center gap-2.5">
              <div
                className="flex h-5 w-5 items-center justify-center rounded shrink-0"
                style={{ backgroundColor: `${item.color}18`, color: item.color }}
              >
                <Icon size={11} />
              </div>
              <div className="flex-1 min-w-0 flex items-center gap-2">
                <span className="w-[72px] truncate text-[10px] text-[#7B91B0] shrink-0">{item.name}</span>
                <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-[#1E2D45]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 0.8, delay: index * 0.08, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
                <span className="w-7 text-right text-[10px] font-semibold text-[#C8D8F0] shrink-0">{item.value}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
