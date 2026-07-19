import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ChartCard } from "../ui/Card";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-lg border border-bg-border px-3 py-2 text-xs">
      <p className="text-text-muted">{label}</p>
      <p className="font-semibold text-text">{payload[0].value} problems</p>
    </div>
  );
}

export default function WeeklyChart({ data }) {
  return (
    <ChartCard title="Weekly Coding Activity" subtitle="Problems solved per day">
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 6, right: 6, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSolved" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
          <XAxis dataKey="day" stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="solved" stroke="#3B82F6" strokeWidth={2.5} fill="url(#colorSolved)" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
