import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Activity } from "lucide-react";
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
  const isEmpty = !data?.some((point) => point.value > 0);

  return (
    <ChartCard title="Preparation Activity" subtitle="Track your consistency over time" className="min-h-[237px] p-3.5">
      <div className="relative h-[165px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 6, right: 6, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSolved" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
          <XAxis dataKey="label" stroke="#71809c" fontSize={10} tickLine={false} axisLine={false} />
          <YAxis stroke="#71809c" fontSize={10} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2.5} fill="url(#colorSolved)" />
        </AreaChart>
      </ResponsiveContainer>
      {isEmpty && <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-1"><Activity size={24} className="mb-2 text-primary/70" /><p className="text-xs font-semibold text-text">No activity yet</p><p className="mt-1 max-w-[220px] text-center text-[10px] leading-4 text-text-muted">Start solving problems, taking mocks, or studying to see your progress here.</p></div>}
      </div>
    </ChartCard>
  );
}
