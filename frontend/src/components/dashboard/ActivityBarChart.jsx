import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[#1E2D45] bg-[#0A1020] px-3 py-2 text-xs shadow-xl">
      <p className="mb-1.5 text-[#7B91B0] font-medium">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 py-0.5">
          <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-[#C8D8F0]">{entry.name}: <span className="font-semibold text-[#F0F4FF]">{entry.value}</span></span>
        </div>
      ))}
    </div>
  );
}

const renderLegend = (props) => {
  const { payload } = props;
  return (
    <ul className="flex items-center justify-center flex-wrap gap-3 mt-2">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center gap-1.5 text-[10px] text-[#7B91B0]">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
          {entry.value}
        </li>
      ))}
    </ul>
  );
};

const TABS = ["7 Days", "30 Days", "3 Months", "1 Year"];

export default function ActivityBarChart({ data }) {
  return (
    <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4 flex flex-col min-h-[260px] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] card-hover">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <div>
          <h3 className="text-sm font-semibold text-[#F0F4FF]">Preparation Activity</h3>
          <p className="mt-0.5 text-xs text-[#7B91B0]">Your learning journey over time</p>
        </div>
        {/* Timeframe selector — matches reference tab strip */}
        <div className="flex shrink-0 rounded-lg border border-[#1E2D45] bg-[#090F1E] p-0.5">
          {TABS.map((tab, idx) => (
            <button
              key={tab}
              className={`px-2.5 py-1 text-[10px] font-medium rounded-md transition-colors ${
                idx === 0
                  ? "bg-[#2563EB] text-white shadow-[0_0_8px_rgba(37,99,235,0.5)]"
                  : "text-[#7B91B0] hover:text-[#C8D8F0]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 mt-3 min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 0, left: -28, bottom: 0 }} barGap={1} barCategoryGap={12}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" vertical={false} />
            <XAxis dataKey="label" stroke="#4A6080" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#4A6080" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(37,99,235,0.08)", rx: 4 }} />
            <Legend content={renderLegend} verticalAlign="bottom" height={28} />
            <Bar dataKey="dsa" name="DSA" fill="#3B82F6" radius={[2, 2, 0, 0]} />
            <Bar dataKey="aptitude" name="Aptitude" fill="#F59E0B" radius={[2, 2, 0, 0]} />
            <Bar dataKey="interview" name="Interview" fill="#EC4899" radius={[2, 2, 0, 0]} />
            <Bar dataKey="study" name="Study" fill="#10B981" radius={[2, 2, 0, 0]} />
            <Bar dataKey="others" name="Others" fill="#8B5CF6" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
