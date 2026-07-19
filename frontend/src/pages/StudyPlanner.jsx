import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, LayoutGrid, Target, GripVertical } from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { weeklyPlanner as initialPlanner, monthlyGoals } from "../data/planner";
import { useFetch } from "../hooks/useFetch";
import plannerService from "../services/plannerService";
import { cn } from "../utils/cn";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const categoryColor = {
  DSA: "primary", Aptitude: "warning", "Core CS": "default", Interview: "danger", Revision: "success", Resume: "default",
};

function WeeklyBoard() {
  const [board, setBoard] = useState(initialPlanner);
  const [dragItem, setDragItem] = useState(null);

  const onDrop = (day) => {
    if (!dragItem) return;
    setBoard((prev) => {
      const next = { ...prev };
      next[dragItem.day] = next[dragItem.day].filter((_, i) => i !== dragItem.index);
      next[day] = [...next[day], dragItem.task];
      return next;
    });
    setDragItem(null);
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-7">
      {days.map((day) => (
        <div
          key={day}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => onDrop(day)}
          className="min-h-[220px] rounded-2xl border border-bg-border bg-bg-card p-3"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-muted">{day}</p>
          <div className="space-y-2">
            {board[day]?.map((task, i) => (
              <div
                key={i}
                draggable
                onDragStart={() => setDragItem({ day, index: i, task })}
                className="cursor-grab rounded-xl border border-bg-border/60 bg-bg px-3 py-2.5 text-xs active:cursor-grabbing"
              >
                <div className="mb-1.5 flex items-center gap-1.5 text-text-muted">
                  <GripVertical size={11} />
                  <Badge variant={categoryColor[task.category]}>{task.category}</Badge>
                </div>
                <p className="text-text">{task.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MonthlyCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text">
          {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h3>
      </div>
      <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] text-text-muted">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="pb-1 font-medium">{d}</div>
        ))}
        {cells.map((day, i) => (
          <div
            key={i}
            className={cn(
              "flex h-10 items-center justify-center rounded-lg text-xs",
              day === today.getDate() ? "bg-gradient-to-br from-primary to-accent font-bold text-white" : "text-text hover:bg-bg-hover",
              !day && "invisible"
            )}
          >
            {day}
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function StudyPlanner() {
  const [view, setView] = useState("weekly");
  const { data: todayTasks } = useFetch(() => plannerService.getTodayTasks(), []);
  const { data: upcoming } = useFetch(() => plannerService.getUpcomingTasks(), []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-text">Study Planner</h1>
          <p className="mt-1 text-sm text-text-muted">Plan your week and drag tasks between days.</p>
        </div>
        <div className="flex rounded-xl border border-bg-border p-1">
          {[
            { key: "weekly", icon: LayoutGrid, label: "Weekly" },
            { key: "monthly", icon: CalendarDays, label: "Monthly" },
          ].map((v) => (
            <button
              key={v.key}
              onClick={() => setView(v.key)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium",
                view === v.key ? "bg-primary text-white" : "text-text-muted hover:text-text"
              )}
            >
              <v.icon size={13} /> {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <h3 className="mb-4 text-sm font-semibold text-text">Today</h3>
          <div className="space-y-2.5">
            {todayTasks?.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-xl border border-bg-border/60 px-3 py-2.5 text-sm">
                <span className={t.done ? "text-text-muted line-through" : "text-text"}>{t.title}</span>
                <Badge variant={categoryColor[t.category]}>{t.category}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-sm font-semibold text-text">Upcoming</h3>
          <div className="space-y-2.5">
            {upcoming?.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-xl border border-bg-border/60 px-3 py-2.5 text-sm">
                <span className="text-text">{t.title}</span>
                <Badge variant={categoryColor[t.category]}>{t.category}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-2">
            <Target size={15} className="text-primary" />
            <h3 className="text-sm font-semibold text-text">Monthly Goals</h3>
          </div>
          <div className="space-y-4">
            {monthlyGoals.map((g) => {
              const pct = Math.round((g.progress / g.target) * 100);
              return (
                <div key={g.id}>
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="text-text">{g.title}</span>
                    <span className="text-text-muted">{g.progress}/{g.target}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-border">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {view === "weekly" ? <WeeklyBoard /> : <MonthlyCalendar />}
    </div>
  );
}
