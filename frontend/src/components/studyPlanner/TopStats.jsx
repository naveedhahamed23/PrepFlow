import { motion } from "framer-motion";
import { CalendarCheck2, Clock, Flame, Target } from "lucide-react";

export default function TopStats({ tasks = [], goals = [], streakDays = 12 }) {
  // Compute today's tasks stats
  const totalTodayTasks = tasks.length;
  const completedTodayTasks = tasks.filter((t) => t.completed).length;
  const taskProgressPct =
    totalTodayTasks > 0
      ? Math.round((completedTodayTasks / totalTodayTasks) * 100)
      : 0;

  // Compute study time (mocked/calculated from tasks)
  const plannedHours = 6;
  const currentStudyHours = 4.33; // 4h 20m
  const studyTimePct = Math.round((currentStudyHours / plannedHours) * 100);

  // Compute goals stats
  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.completed || g.current >= g.target).length;
  const goalsPct =
    totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* CARD 1: Today's Progress */}
      <div className="relative overflow-hidden rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4 shadow-sm transition-all hover:border-blue-500/40">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-text-muted">Today&apos;s Progress</p>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-white">
                {completedTodayTasks} / {totalTodayTasks}
              </span>
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
            <CalendarCheck2 size={20} />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs font-semibold text-blue-400">
            <span>Progress</span>
            <span>{taskProgressPct}%</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#162238]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${taskProgressPct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
            />
          </div>
        </div>
      </div>

      {/* CARD 2: Study Time */}
      <div className="relative overflow-hidden rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4 shadow-sm transition-all hover:border-cyan-500/40">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-text-muted">Study Time</p>
            <p className="mt-1 text-2xl font-bold text-white">4h 20m</p>
            <p className="text-xs text-text-muted">of {plannedHours}h planned</p>
          </div>
          {/* Circular Progress Indicator */}
          <div className="relative flex h-14 w-14 items-center justify-center">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#162238]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-cyan-400 transition-all duration-1000 ease-out"
                strokeDasharray={`${studyTimePct}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-bold text-cyan-300">
              {studyTimePct}%
            </span>
          </div>
        </div>
      </div>

      {/* CARD 3: Current Streak */}
      <div className="relative overflow-hidden rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4 shadow-sm transition-all hover:border-orange-500/40">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-text-muted">Current Streak</p>
            <p className="mt-1 text-2xl font-bold text-white">{streakDays} days</p>
            <p className="mt-1 text-xs font-medium text-emerald-400">Keep it going!</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
            <Flame size={20} />
          </div>
        </div>
      </div>

      {/* CARD 4: Goals Completed */}
      <div className="relative overflow-hidden rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4 shadow-sm transition-all hover:border-purple-500/40">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-text-muted">Goals Completed</p>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-white">
                {completedGoals} / {totalGoals}
              </span>
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
            <Target size={20} />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs font-semibold text-purple-400">
            <span>Completion</span>
            <span>{goalsPct}%</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#162238]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${goalsPct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
