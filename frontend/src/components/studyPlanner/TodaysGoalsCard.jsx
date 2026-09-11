import { useState } from "react";
import { CheckCircle2, Circle, Check } from "lucide-react";
import { motion } from "framer-motion";
import ManageGoalsModal from "./ManageGoalsModal";
import { cn } from "../../utils/cn";

export default function TodaysGoalsCard({
  goals = [],
  onToggleGoalComplete,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
}) {
  const [manageModalOpen, setManageModalOpen] = useState(false);

  return (
    <>
      <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Today&apos;s Goals</h3>
          <button
            onClick={() => setManageModalOpen(true)}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            Manage Goals
          </button>
        </div>

        {goals.length === 0 ? (
          <div className="mt-4 py-6 text-center text-xs text-text-muted">
            <p>No goals yet.</p>
            <button
              onClick={() => setManageModalOpen(true)}
              className="mt-2 text-blue-400 underline font-medium"
            >
              Create Goal
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-3.5">
            {goals.map((goal) => {
              const isDone = goal.completed || goal.current >= goal.target;
              const pct = Math.min(
                100,
                Math.round((goal.current / goal.target) * 100)
              );

              return (
                <div key={goal.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      {/* Checkbox */}
                      <button
                        onClick={() => onToggleGoalComplete(goal.id)}
                        className={cn(
                          "flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full transition-all",
                          isDone
                            ? "bg-blue-600 text-white"
                            : "border border-text-muted/40 hover:border-blue-400"
                        )}
                      >
                        {isDone && <Check size={11} strokeWidth={3} />}
                      </button>

                      <span
                        className={cn(
                          "truncate font-medium",
                          isDone ? "text-text-muted line-through" : "text-white"
                        )}
                      >
                        {goal.title}
                      </span>
                    </div>

                    <span className="shrink-0 text-xs font-semibold text-text-muted">
                      {goal.current} / {goal.target}
                    </span>
                  </div>

                  {/* Progress bar if goal has fractional/step progress */}
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#162238]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className={cn(
                        "h-full rounded-full",
                        isDone
                          ? "bg-emerald-500"
                          : "bg-gradient-to-r from-blue-600 to-indigo-400"
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ManageGoalsModal
        open={manageModalOpen}
        onClose={() => setManageModalOpen(false)}
        goals={goals}
        onAddGoal={onAddGoal}
        onUpdateGoal={onUpdateGoal}
        onDeleteGoal={onDeleteGoal}
      />
    </>
  );
}
