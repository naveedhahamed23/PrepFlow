import { motion } from "framer-motion";
import { Flame, Clock, Target, Mic } from "lucide-react";
import Card from "../ui/Card";

export default function ProgressOverview({ data }) {
  const pct = data.overallProgress;
  const circumference = 2 * Math.PI * 42;
  const offset = pct == null ? circumference : circumference - (pct / 100) * circumference;

  const stats = [
    { icon: Flame, label: "Streak", value: `${data.studyStreak} days` },
    { icon: Clock, label: "Study time", value: `${data.studyMinutes} min` },
    { icon: Mic, label: "Interviews", value: data.interviewCount },
    { icon: Target, label: "Aptitude", value: data.aptitudeAverage == null ? "No data" : `${Math.round(data.aptitudeAverage)}%` },
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
            <span className="text-lg font-bold text-text">{pct == null ? "No data" : `${pct}%`}</span>
            <span className="text-[10px] text-text-muted">Overall progress</span>
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
