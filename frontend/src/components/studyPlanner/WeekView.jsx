import { useState } from "react";
import { CATEGORIES } from "../../data/studyPlannerData";
import Badge from "../ui/Badge";
import { GripVertical, Plus } from "lucide-react";

const DAYS = [
  { key: "Mon", label: "Monday", date: "2026-09-07" },
  { key: "Tue", label: "Tuesday", date: "2026-09-08" },
  { key: "Wed", label: "Wednesday", date: "2026-09-09" },
  { key: "Thu", label: "Thursday", date: "2026-09-10" },
  { key: "Fri", label: "Friday", date: "2026-09-11" },
  { key: "Sat", label: "Saturday", date: "2026-09-12" },
  { key: "Sun", label: "Sunday", date: "2026-09-13" },
];

export default function WeekView({ tasks = [], onOpenAddTask, onSelectDate }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 min-w-0">
      {DAYS.map((dayObj) => {
        const dayTasks = tasks.filter((t) => t.date === dayObj.date);
        return (
          <div
            key={dayObj.key}
            className="flex min-h-[260px] flex-col rounded-xl border border-[#1E2D45] bg-[#0D1424] p-3 transition-colors hover:border-blue-500/30 min-w-0"
          >
            <div className="mb-3 flex items-center justify-between border-b border-[#1E2D45]/60 pb-2">
              <span className="text-xs font-bold text-white">{dayObj.label}</span>
              <button
                onClick={() => {
                  onSelectDate(dayObj.date);
                  onOpenAddTask();
                }}
                className="text-text-muted hover:text-blue-400"
                title="Add task to day"
              >
                <Plus size={14} />
              </button>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto max-h-[300px] pr-0.5">
              {dayTasks.length === 0 ? (
                <p className="py-4 text-center text-[11px] text-text-muted italic">No tasks</p>
              ) : (
                dayTasks.map((t) => {
                  const categoryConfig = CATEGORIES[t.category] || CATEGORIES.Other;
                  return (
                    <div
                      key={t.id}
                      className="rounded-lg border border-[#1E2D45] bg-[#070C16] p-2 text-xs transition-all hover:border-blue-500/40"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span
                          className="rounded px-1.5 py-0.5 text-[10px] font-bold"
                          style={{
                            backgroundColor: categoryConfig.bg,
                            color: categoryConfig.color,
                          }}
                        >
                          {t.category}
                        </span>
                        <span className="text-[10px] text-text-muted">{t.startTime}</span>
                      </div>
                      <p className={`font-semibold truncate ${t.completed ? "line-through text-text-muted" : "text-white"}`}>
                        {t.title}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
