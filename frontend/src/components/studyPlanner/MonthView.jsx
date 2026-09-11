import { useState } from "react";
import { CATEGORIES } from "../../data/studyPlannerData";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function MonthView({ selectedDate, onSelectDate, tasks = [] }) {
  const today = new Date(selectedDate + "T00:00:00");
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Adjust for Monday start: Sun = 6, Mon = 0, etc.
  const adjustedFirstDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const cells = [];
  for (let i = 0; i < adjustedFirstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4 shadow-sm min-w-0">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-bold text-white">
          {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })} Planning Overview
        </h3>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-text-muted mb-2">
        {WEEKDAYS.map((d) => (
          <div key={d} className="pb-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {cells.map((dayNum, idx) => {
          if (!dayNum) {
            return <div key={`empty-${idx}`} className="h-16 rounded-lg bg-[#070C16]/30" />;
          }

          const formattedDateStr = `${year}-${(month + 1).toString().padStart(2, "0")}-${dayNum.toString().padStart(2, "0")}`;
          const isSelected = selectedDate === formattedDateStr;
          const dayTasks = tasks.filter((t) => t.date === formattedDateStr);

          return (
            <div
              key={dayNum}
              onClick={() => onSelectDate(formattedDateStr)}
              className={`flex h-20 cursor-pointer flex-col justify-between rounded-lg border p-2 text-xs transition-all ${
                isSelected
                  ? "border-blue-500 bg-blue-950/30 text-white font-bold"
                  : "border-[#1E2D45] bg-[#070C16] text-text-muted hover:border-blue-500/40 hover:text-white"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className={`text-xs ${isSelected ? "text-blue-400 font-bold" : "text-white"}`}>
                  {dayNum}
                </span>
                {dayTasks.length > 0 && (
                  <span className="rounded-full bg-blue-500/20 px-1.5 py-0.5 text-[10px] font-bold text-blue-300">
                    {dayTasks.length}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                {dayTasks.slice(0, 2).map((t) => {
                  const cat = CATEGORIES[t.category] || CATEGORIES.Other;
                  return (
                    <div
                      key={t.id}
                      className="truncate rounded px-1 text-[9px] font-semibold"
                      style={{ backgroundColor: cat.bg, color: cat.color }}
                    >
                      {t.title}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
