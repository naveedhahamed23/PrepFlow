import { useMemo } from "react";
import { ChartCard } from "../ui/Card";

const levelColors = ["#18181B", "#1e3a5f", "#2563EB", "#3B82F6", "#60A5FA"];

export default function Heatmap({ data }) {
  const weeks = useMemo(() => {
    const grouped = {};
    (data || []).forEach((d) => {
      grouped[d.week] = grouped[d.week] || [];
      grouped[d.week].push(d);
    });
    return Object.values(grouped);
  }, [data]);

  return (
    <ChartCard title="Study Heatmap" subtitle="Daily activity over the last 18 weeks">
      <div className="flex gap-1 overflow-x-auto pb-2">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) => (
              <div
                key={di}
                title={`${day.day}: ${day.value} activities`}
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: levelColors[day.value] || levelColors[0] }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-text-muted">
        Less
        {levelColors.map((c) => (
          <div key={c} className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: c }} />
        ))}
        More
      </div>
    </ChartCard>
  );
}
