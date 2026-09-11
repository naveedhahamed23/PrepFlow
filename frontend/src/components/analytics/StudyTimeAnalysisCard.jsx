import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { STUDY_TIME_DONUT_DATA } from "../../data/analyticsData";

export default function StudyTimeAnalysisCard({ totalStudyTime = "24h 30m" }) {
  return (
    <div className="flex flex-col h-full rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm min-w-0">
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-white">Study Time Analysis</h3>
        <p className="text-xs text-text-muted">Time spent on each area</p>
      </div>

      {/* Content Container - Vertically Balanced */}
      <div className="flex-1 flex flex-col justify-center min-w-0 mt-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full min-w-0">
          {/* Donut Chart with Center Text */}
          <div className="relative flex h-40 w-40 shrink-0 items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={STUDY_TIME_DONUT_DATA}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={48}
                  outerRadius={70}
                  paddingAngle={3}
                >
                  {STUDY_TIME_DONUT_DATA.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
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

            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-base font-black text-white">{totalStudyTime}</span>
              <span className="text-[10px] font-semibold text-text-muted">
                Total Study Time
              </span>
            </div>
          </div>

          {/* Category Breakdown Table */}
          <div className="w-full space-y-2 text-xs">
            {STUDY_TIME_DONUT_DATA.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-2 border-b border-[#1E2D45]/40 pb-1"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-semibold text-white truncate text-xs">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-text-muted text-[11px]">{item.time}</span>
                  <span className="font-bold text-white w-7 text-right text-xs">
                    {item.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
