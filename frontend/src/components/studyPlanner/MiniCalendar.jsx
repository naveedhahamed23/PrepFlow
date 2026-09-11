import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MiniCalendar({
  selectedDate,
  onSelectDate,
  tasks = [],
}) {
  // Parse month and year from selectedDate or local state
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(8); // 0-indexed (8 = September)

  const monthName = new Date(currentYear, currentMonth, 1).toLocaleDateString(
    "en-US",
    { month: "short", year: "numeric" }
  );

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Generate calendar grid
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const totalDaysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const daysGrid = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    daysGrid.push(null);
  }
  for (let d = 1; d <= totalDaysInMonth; d++) {
    daysGrid.push(d);
  }

  // Activity indicators map for current month
  const taskDatesMap = {};
  tasks.forEach((t) => {
    if (t.date) {
      const [y, m, d] = t.date.split("-").map(Number);
      if (y === currentYear && m - 1 === currentMonth) {
        if (!taskDatesMap[d]) taskDatesMap[d] = new Set();
        taskDatesMap[d].add(t.category);
      }
    }
  });

  return (
    <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4 shadow-sm">
      {/* Month Navigation */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-white">Calendar</h3>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-text-muted mr-1">
            {monthName}
          </span>
          <button
            onClick={handlePrevMonth}
            className="flex h-6 w-6 items-center justify-center rounded-md border border-[#1E2D45] bg-[#070C16] text-text-muted hover:text-white"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={handleNextMonth}
            className="flex h-6 w-6 items-center justify-center rounded-md border border-[#1E2D45] bg-[#070C16] text-text-muted hover:text-white"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-text-muted mb-2">
        {WEEKDAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {daysGrid.map((day, idx) => {
          if (!day) {
            return <div key={`empty-${idx}`} className="h-8" />;
          }

          // Check if this cell matches selectedDate
          const dateFormatted = `${currentYear}-${(currentMonth + 1)
            .toString()
            .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
          const isSelected = selectedDate === dateFormatted;

          // Categories for activity dots
          const categories = Array.from(taskDatesMap[day] || []);

          return (
            <button
              key={day}
              onClick={() => onSelectDate(dateFormatted)}
              className={cn(
                "relative flex h-8 flex-col items-center justify-center rounded-lg text-xs font-semibold transition-all",
                isSelected
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-text-muted hover:bg-white/5 hover:text-white"
              )}
            >
              <span>{day}</span>

              {/* Activity indicator dots */}
              {categories.length > 0 && (
                <div className="absolute bottom-1 flex gap-0.5">
                  {categories.includes("DSA") && (
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                  )}
                  {categories.includes("Aptitude") && (
                    <span className="h-1 w-1 rounded-full bg-blue-400" />
                  )}
                  {categories.includes("Interview") && (
                    <span className="h-1 w-1 rounded-full bg-orange-400" />
                  )}
                  {categories.some((c) => !["DSA", "Aptitude", "Interview"].includes(c)) && (
                    <span className="h-1 w-1 rounded-full bg-purple-400" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend matching reference screenshot */}
      <div className="mt-3 flex items-center justify-between border-t border-[#1E2D45]/60 pt-2 text-[10px] text-text-muted">
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>DSA</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          <span>Aptitude</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
          <span>Interview</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
          <span>Other</span>
        </div>
      </div>
    </div>
  );
}
