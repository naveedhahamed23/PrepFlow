import { motion } from "framer-motion";
import {
  Target,
  Code,
  Calculator,
  MessageSquare,
  FileText,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";

export default function TopMetricCards({ metrics }) {
  if (!metrics) return null;

  const cards = [
    {
      id: "overall",
      title: "Overall Preparation Score",
      value: `${metrics.overallScore}%`,
      change: metrics.overallChange,
      subtitle: `Better than ${metrics.overallPercentile}% of PrepFlow users`,
      icon: Target,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "hover:border-blue-500/40",
      barColor: "from-blue-600 to-blue-400",
      showPercentileText: true,
    },
    {
      id: "dsa",
      title: "DSA Progress",
      value: `${metrics.dsaProgress}%`,
      change: metrics.dsaChange,
      subtitle: `${metrics.dsaSolved} problems solved`,
      icon: Code,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "hover:border-purple-500/40",
      barColor: "from-purple-600 to-purple-400",
      pct: metrics.dsaProgress,
    },
    {
      id: "aptitude",
      title: "Aptitude Accuracy",
      value: `${metrics.aptitudeAccuracy}%`,
      change: metrics.aptitudeChange,
      subtitle: `${metrics.aptitudeTests} tests completed`,
      icon: Calculator,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "hover:border-amber-500/40",
      barColor: "from-amber-600 to-amber-400",
      pct: metrics.aptitudeAccuracy,
    },
    {
      id: "interview",
      title: "Interview Performance",
      value: `${metrics.interviewPerf}%`,
      change: metrics.interviewChange,
      subtitle: `${metrics.interviewCount} mock interviews`,
      icon: MessageSquare,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
      border: "hover:border-pink-500/40",
      barColor: "from-pink-600 to-pink-400",
      pct: metrics.interviewPerf,
    },
    {
      id: "resume",
      title: "Resume Score",
      value: `${metrics.resumeScore}%`,
      change: metrics.resumeChange,
      subtitle: "ATS score",
      icon: FileText,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "hover:border-cyan-500/40",
      barColor: "from-cyan-600 to-cyan-400",
      pct: metrics.resumeScore,
    },
    {
      id: "study",
      title: "Study Consistency",
      value: `${metrics.studyConsistency}%`,
      change: metrics.studyChange,
      subtitle: `${metrics.studySessions} study sessions`,
      icon: BookOpen,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "hover:border-yellow-500/40",
      barColor: "from-yellow-600 to-yellow-400",
      pct: metrics.studyConsistency,
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 min-w-0">
      {cards.map((card) => {
        const IconComp = card.icon;
        return (
          <div
            key={card.id}
            className={`relative overflow-hidden rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4 shadow-sm transition-all ${card.border}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#070C16] border border-[#1E2D45]/60">
                <IconComp size={18} className={card.color} />
              </div>
              <span className="flex items-center text-xs font-bold text-emerald-400">
                <ArrowUpRight size={13} className="mr-0.5" />
                {card.change}
              </span>
            </div>

            <div className="mt-3">
              <p className="text-[11px] font-medium text-text-muted truncate">
                {card.title}
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-white mt-0.5">
                {card.value}
              </h3>
            </div>

            {/* Bottom Section: Progress bar or description */}
            <div className="mt-3">
              <p className="text-[11px] text-text-muted truncate">
                {card.subtitle}
              </p>
              {!card.showPercentileText && (
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#162238]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${card.pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${card.barColor}`}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
