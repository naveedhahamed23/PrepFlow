import { Plus, CalendarX } from "lucide-react";
import TaskCard from "./TaskCard";

export default function TimelineSchedule({
  tasks = [],
  selectedDate,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onOpenAddTask,
}) {
  // Filter tasks for selected date
  const filteredTasks = tasks.filter((t) => t.date === selectedDate);

  // Sort tasks by startTime
  const sortedTasks = [...filteredTasks].sort((a, b) =>
    a.startTime.localeCompare(b.startTime)
  );

  return (
    <div className="flex flex-col gap-4">
      {sortedTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#1E2D45] bg-[#0D1424]/50 p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
            <CalendarX size={24} />
          </div>
          <h3 className="mt-3 text-sm font-semibold text-white">
            No tasks planned for this day.
          </h3>
          <p className="mt-1 text-xs text-text-muted">
            Add a study session, practice drill, or break to stay on track.
          </p>
          <button
            onClick={onOpenAddTask}
            className="mt-4 flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-500"
          >
            <Plus size={15} />
            <span>Add Task</span>
          </button>
        </div>
      ) : (
        <div className="relative space-y-4">
          {sortedTasks.map((task) => (
            <div key={task.id} className="flex gap-3 sm:gap-4 items-start min-w-0">
              {/* Time Label */}
              <div className="w-12 sm:w-14 shrink-0 pt-3 text-xs font-semibold text-text-muted">
                {task.startTime}
              </div>

              {/* Task Content Card */}
              <div className="flex-1 min-w-0">
                <TaskCard
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onEditTask={onEditTask}
                  onDeleteTask={onDeleteTask}
                />
              </div>
            </div>
          ))}

          {/* "+ Add a new task" Button at bottom */}
          <button
            onClick={onOpenAddTask}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#1E2D45] bg-[#070C16]/60 py-3 text-xs font-semibold text-text-muted hover:border-blue-500/50 hover:bg-blue-500/5 hover:text-blue-400 transition-all"
          >
            <Plus size={15} />
            <span>Add a new task</span>
          </button>
        </div>
      )}
    </div>
  );
}
