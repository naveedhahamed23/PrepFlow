import { useState, useMemo } from "react";
import { Sparkles, Calendar } from "lucide-react";

const BLUE_INTENSITY_SCALE = [
  "#162238", // Level 0: No activity (dark navy)
  "#1E3A5F", // Level 1: Very low
  "#2563EB", // Level 2: Low
  "#3B82F6", // Level 3: Medium
  "#60A5FA", // Level 4: High
  "#93C5FD", // Level 5: Very high (strongest electric blue)
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ConsistencyHeatmapCard({ heatmapData }) {
  const [hoveredDay, setHoveredDay] = useState(null);

  const daysList = heatmapData?.days || [];
  const totalActivities = heatmapData?.totalActivities || 0;
  const isNewUser = daysList.length === 0 || totalActivities === 0;

  // Group days into columns by week index (0..N-1) and rows by dayOfWeekIndex (0..6)
  const { weeksColumns, monthHeaderLabels } = useMemo(() => {
    if (!daysList || daysList.length === 0) {
      return { weeksColumns: [], monthHeaderLabels: [] };
    }

    const cols = [];
    let currentWeek = [];
    const months = [];

    daysList.forEach((dayItem, idx) => {
      currentWeek.push(dayItem);

      // Track month labels when a month changes at the start of a week
      if (
        dayItem.dayOfWeekIndex === 0 &&
        (months.length === 0 || months[months.length - 1].name !== dayItem.monthName)
      ) {
        months.push({
          name: dayItem.monthName,
          colIndex: cols.length,
        });
      }

      if (dayItem.dayOfWeekIndex === 6 || idx === daysList.length - 1) {
        cols.push(currentWeek);
        currentWeek = [];
      }
    });

    return { weeksColumns: cols, monthHeaderLabels: months };
  }, [daysList]);

  return (
    <div className="flex flex-col h-full rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white">Consistency Heatmap</h3>
          <p className="text-xs text-text-muted">
            Your daily activity over the last {heatmapData?.weeksCount || 12} weeks
          </p>
        </div>
        {totalActivities > 0 && (
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-bold text-blue-400">
            {totalActivities} Total Actions
          </span>
        )}
      </div>

      {/* Main Graph Content Area */}
      <div className="flex-1 flex flex-col justify-center min-w-0 mt-3">
        {isNewUser ? (
          <div className="flex flex-col items-center justify-center py-8 text-center rounded-xl border border-dashed border-[#1E2D45] bg-[#070C16]/50">
            <Calendar size={28} className="text-text-muted mb-2" />
            <p className="text-xs font-semibold text-white">No activity recorded yet.</p>
            <p className="text-[11px] text-text-muted mt-1">
              Start preparing to build your daily activity streak.
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Tooltip on Hover */}
            {hoveredDay && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none rounded-xl border border-[#1E2D45] bg-[#070C16] px-3 py-2 text-xs shadow-2xl space-y-0.5 text-center min-w-[160px]">
                <p className="font-bold text-white text-[11px]">
                  {hoveredDay.formattedDate}
                </p>
                {hoveredDay.totalActivities > 0 ? (
                  <div className="text-[10px] text-blue-300 font-medium">
                    <span>{hoveredDay.totalActivities} preparation actions</span>
                    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-text-muted mt-0.5">
                      {hoveredDay.breakdown.dsa > 0 && (
                        <span>• {hoveredDay.breakdown.dsa} DSA</span>
                      )}
                      {hoveredDay.breakdown.aptitude > 0 && (
                        <span>• {hoveredDay.breakdown.aptitude} Aptitude</span>
                      )}
                      {hoveredDay.breakdown.interviews > 0 && (
                        <span>• {hoveredDay.breakdown.interviews} Interview</span>
                      )}
                      {hoveredDay.breakdown.studyPlanner > 0 && (
                        <span>• {hoveredDay.breakdown.studyPlanner} Study</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-[10px] text-text-muted">No activity</p>
                )}
              </div>
            )}

            {/* GitHub-Style Contribution Graph */}
            <div className="overflow-x-auto custom-scrollbar pb-2">
              <div className="min-w-[340px]">
                {/* Month Labels Header */}
                <div className="ml-7 flex text-[10px] font-semibold text-text-muted mb-1.5 h-3">
                  {monthHeaderLabels.map((m) => (
                    <span
                      key={`${m.name}-${m.colIndex}`}
                      style={{
                        marginLeft: `${m.colIndex * 15}px`,
                        position: "absolute",
                      }}
                    >
                      {m.name}
                    </span>
                  ))}
                </div>

                {/* Contribution Grid */}
                <div className="flex gap-1.5 mt-3">
                  {/* Weekday labels */}
                  <div className="flex flex-col justify-between text-[10px] font-semibold text-text-muted py-0.5 pr-1 shrink-0">
                    {WEEKDAYS.map((d, i) => (
                      <span key={d} className="h-3 leading-none">
                        {i % 2 === 0 ? d : ""}
                      </span>
                    ))}
                  </div>

                  {/* Columns (Weeks) */}
                  <div className="flex gap-1 flex-1">
                    {weeksColumns.map((weekDays, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-1">
                        {weekDays.map((dayItem) => {
                          const bg =
                            BLUE_INTENSITY_SCALE[dayItem.intensity] ||
                            BLUE_INTENSITY_SCALE[0];
                          return (
                            <div
                              key={dayItem.date}
                              onMouseEnter={() => setHoveredDay(dayItem)}
                              onMouseLeave={() => setHoveredDay(null)}
                              className="h-3 w-3 rounded-[2px] transition-transform hover:scale-125 cursor-pointer"
                              style={{ backgroundColor: bg }}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend matching GitHub style */}
      <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] font-semibold text-text-muted border-t border-[#1E2D45]/40 pt-2">
        <span>Less</span>
        {BLUE_INTENSITY_SCALE.map((color, i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-[2px]"
            style={{ backgroundColor: color }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
