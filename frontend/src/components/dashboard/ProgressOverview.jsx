import { motion } from "framer-motion";
import { Trophy, Flame, Clock, Target } from "lucide-react";
import Card from "../ui/Card";

export default function ProgressOverview({ user }) {
  const xpToNextLevel = 10000;
  const pct = Math.min(100, Math.round((user.xp / xpToNextLevel) * 100));
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (pct / 100) * circumference;

  const stats = [
    { icon: Trophy, label: "Rank", value: `#${user.rank}` },
    { icon: Flame, label: "Streak", value: `${user.streak} days` },
    { icon: Clock, label: "Hours Studied", value: user.hoursStudied },
    { icon: Target, label: "Revision Due", value: user.revisionDue },
  ];

  return (
    <Card>
      <h3 className="mb-5 text-sm font-semibold text-text">Progress Overview</h3>
      <div className="flex items-center gap-6">
        <div className="relative h-28 w-28 shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#27272A" strokeWidth="8" />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-text">Lv.{user.level}</span>
            <span className="text-[10px] text-text-muted">{user.xp} XP</span>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-bg-border/60 px-3 py-2.5">
              <s.icon size={14} className="text-primary" />
              <p className="mt-1.5 text-base font-semibold text-text">{s.value}</p>
              <p className="text-[11px] text-text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
