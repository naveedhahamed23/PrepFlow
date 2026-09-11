import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ChevronDown } from "lucide-react";

const CATEGORY_COLORS = {
  dsa: "#3B82F6",
  aptitude: "#F97316",
  interview: "#EC4899",
  study: "#10B981",
  others: "#8B5CF6",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-[#1E2D45] bg-[#070C16] p-3 shadow-xl text-xs space-y-1">
        <p className="font-bold text-white mb-1.5">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 capitalize text-text-muted">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}
            </span>
            <span className="font-bold text-white">{entry.value} hrs / tasks</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ActivityOverviewCard({ data, timeRange, setTimeRange }) {
  return (
    <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm min-w-0">
      {/* Card Header & Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-white">Activity Overview</h3>
          <p className="text-xs text-text-muted">
            Your preparation activity over time
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Legend matching reference screenshot */}
          <div className="hidden flex-wrap items-center gap-3 text-xs md:flex">
            <span className="flex items-center gap-1 text-text-muted">
              <span className="h-2 w-2 rounded-full bg-[#3B82F6]" /> DSA
            </span>
            <span className="flex items-center gap-1 text-text-muted">
              <span className="h-2 w-2 rounded-full bg-[#F97316]" /> Aptitude
            </span>
            <span className="flex items-center gap-1 text-text-muted">
              <span className="h-2 w-2 rounded-full bg-[#EC4899]" /> Interview
            </span>
            <span className="flex items-center gap-1 text-text-muted">
              <span className="h-2 w-2 rounded-full bg-[#10B981]" /> Study
            </span>
            <span className="flex items-center gap-1 text-text-muted">
              <span className="h-2 w-2 rounded-full bg-[#8B5CF6]" /> Others
            </span>
          </div>

          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none rounded-lg border border-[#1E2D45] bg-[#070C16] px-3 py-1.5 pr-7 text-xs font-semibold text-white focus:border-blue-500 focus:outline-none cursor-pointer"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <ChevronDown
              size={12}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted"
            />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-5 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
            barGap={3}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={[0, 6]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="dsa" name="DSA" fill={CATEGORY_COLORS.dsa} radius={[3, 3, 0, 0]} />
            <Bar dataKey="aptitude" name="Aptitude" fill={CATEGORY_COLORS.aptitude} radius={[3, 3, 0, 0]} />
            <Bar dataKey="interview" name="Interview" fill={CATEGORY_COLORS.interview} radius={[3, 3, 0, 0]} />
            <Bar dataKey="study" name="Study" fill={CATEGORY_COLORS.study} radius={[3, 3, 0, 0]} />
            <Bar dataKey="others" name="Others" fill={CATEGORY_COLORS.others} radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
