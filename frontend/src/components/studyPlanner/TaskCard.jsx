import { useState } from "react";
import {
  Code,
  Calculator,
  Mic,
  FileText,
  Coffee,
  BookOpen,
  RotateCcw,
  CheckCircle2,
  Check,
  MoreVertical,
  Edit2,
  Trash2,
} from "lucide-react";
import { CATEGORIES } from "../../data/studyPlannerData";
import { cn } from "../../utils/cn";

const ICON_MAP = {
  Code,
  Calculator,
  Mic,
  FileText,
  Coffee,
  BookOpen,
  RotateCcw,
  CheckCircle: CheckCircle2,
};

export default function TaskCard({
  task,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const categoryConfig = CATEGORIES[task.category] || CATEGORIES.Other;
  const CategoryIcon = ICON_MAP[categoryConfig.iconName] || CheckCircle2;

  return (
    <div
      className={cn(
        "group relative flex items-center justify-between rounded-xl border bg-[#0D1424] p-3.5 transition-all hover:bg-[#111A2E]",
        task.completed
          ? "border-[#1E2D45]/60 opacity-80"
          : "border-[#1E2D45] hover:border-blue-500/40 shadow-sm"
      )}
      style={{
        borderLeftWidth: "4px",
        borderLeftColor: categoryConfig.color,
      }}
    >
      <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-2">
        {/* Category Icon */}
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
          style={{
            backgroundColor: categoryConfig.bg,
            color: categoryConfig.color,
            border: `1px solid ${categoryConfig.border}`,
          }}
        >
          <CategoryIcon size={18} />
        </div>

        {/* Task Details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4
              className={cn(
                "truncate text-sm font-semibold",
                task.completed ? "text-text-muted line-through" : "text-white"
              )}
            >
              {task.title}
            </h4>
          </div>
          {task.description && (
            <p className="truncate text-xs text-text-muted mt-0.5">
              {task.description}
            </p>
          )}
        </div>
      </div>

      {/* Right Section: Duration, Complete Toggle, Actions */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs font-medium text-text-muted">
          {task.duration}
        </span>

        {/* Toggle Checkbox */}
        <button
          onClick={() => onToggleComplete(task.id)}
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full transition-all",
            task.completed
              ? "bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20"
              : "border border-text-muted/40 hover:border-emerald-400 hover:bg-emerald-500/10 text-transparent"
          )}
          title={task.completed ? "Mark incomplete" : "Mark complete"}
        >
          <Check size={14} strokeWidth={3} className={task.completed ? "text-black" : "opacity-0"} />
        </button>

        {/* Actions Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-text-muted hover:bg-white/10 hover:text-white transition-colors"
          >
            <MoreVertical size={15} />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-8 z-30 min-w-[120px] rounded-lg border border-[#1E2D45] bg-[#070C16] p-1 shadow-xl">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onEditTask(task);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-xs text-text-muted hover:bg-white/10 hover:text-white"
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onDeleteTask(task.id);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10"
                >
                  <Trash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
