import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function TodayTasks({ tasks, onToggle }) {

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text">Today&apos;s Tasks</h3>
        <span className="text-xs text-text-muted">
          {doneCount}/{tasks.length} done
        </span>
      </div>
      <div className="space-y-2.5">
        <AnimatePresence>
          {tasks.length === 0 ? <p className="text-sm text-text-muted">No tasks scheduled for today.</p> : tasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 rounded-xl border border-bg-border/60 px-3.5 py-2.5"
            >
              <button
                onClick={() => onToggle(task)}
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                  task.done ? "border-primary bg-primary" : "border-bg-border"
                }`}
              >
                {task.done && <Check size={12} className="text-white" />}
              </button>
              <div className="min-w-0 flex-1">
                <p className={`truncate text-sm ${task.done ? "text-text-muted line-through" : "text-text"}`}>
                  {task.title}
                </p>
                <p className="text-xs text-text-muted">{task.duration ? `${task.duration} min` : "Duration not set"}</p>
              </div>
              <Badge variant="default">{task.subject || "Study"}</Badge>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
}
