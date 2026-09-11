import { motion } from "framer-motion";
import { Check, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";

function CircularProgress({ score, status }) {
  const scoreColor = score >= 80 ? "#22C55E" : score >= 60 ? "#F59E0B" : "#EF4444";
  const circumference = 2 * Math.PI * 46;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-32 w-32 drop-shadow-[0_0_15px_rgba(34,197,94,0.2)]">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#1E293B" strokeWidth="8" />
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke={scoreColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-text">{score}</span>
            <span className="text-sm text-text-muted">/100</span>
          </div>
          <span className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">ATS Score</span>
        </div>
      </div>
      <div className="mt-4 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
        <CheckCircle2 size={12} className="text-emerald-500" />
        <span className="text-xs font-medium text-emerald-500">{status}</span>
      </div>
    </div>
  );
}

function CategoryBar({ label, score }) {
  const getColors = (val) => {
    if (val >= 90) return "bg-emerald-500 border-emerald-500/30 text-emerald-400";
    if (val >= 80) return "bg-primary border-primary/30 text-primary";
    if (val >= 70) return "bg-indigo-500 border-indigo-500/30 text-indigo-400";
    return "bg-amber-500 border-amber-500/30 text-amber-400";
  };
  
  const colors = getColors(score);
  
  return (
    <div className="flex items-center gap-3">
      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border bg-bg-card ${colors.split(' ')[2] === 'text-emerald-400' || colors.split(' ')[2] === 'text-primary' ? 'border-indigo-500/30' : 'border-bg-border/60'}`}>
        <Check size={10} className={colors.split(' ')[2]} />
      </div>
      <div className="w-24 text-xs text-text-muted shrink-0">{label}</div>
      <div className="flex-1 h-2 rounded-full bg-bg-card border border-bg-border/60 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${colors.split(' ')[0]}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
      <div className="w-6 text-right text-xs font-medium text-text">{score}</div>
    </div>
  );
}

export function ResumeAnalysis({ analysis }) {
  if (!analysis) return null;

  return (
    <Card className="mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-lg font-bold text-text">Resume Analysis</h2>
          <p className="text-sm text-text-muted mt-1">Here's how your resume performs and where you can improve.</p>
        </div>
        <Button size="sm" variant="secondary" icon={RefreshCw}>
          Re-analyze
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_1fr] gap-8 items-center">
        {/* ATS Score */}
        <div className="flex justify-center md:justify-start px-4">
          <CircularProgress score={analysis.atsScore} status={analysis.matchStatus} />
        </div>

        {/* Category Scores */}
        <div className="space-y-3 border-t md:border-t-0 md:border-l border-bg-border/50 pt-6 md:pt-0 md:pl-8">
          {Object.entries(analysis.categoryScores).map(([key, value]) => (
            <CategoryBar key={key} label={key} score={value} />
          ))}
        </div>

        {/* Strengths & Weaknesses */}
        <div className="space-y-3">
          <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 size={14} className="text-emerald-500" />
              </div>
              <h4 className="font-semibold text-emerald-500 text-sm">Strengths</h4>
            </div>
            <ul className="space-y-2 text-xs text-emerald-200/70">
              {analysis.strengths.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-emerald-500/50 mt-0.5 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-950/20 border border-rose-900/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-rose-500/20 flex items-center justify-center">
                <AlertTriangle size={14} className="text-rose-500" />
              </div>
              <h4 className="font-semibold text-rose-500 text-sm">Areas to Improve</h4>
            </div>
            <ul className="space-y-2 text-xs text-rose-200/70">
              {analysis.improvements.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <AlertTriangle size={10} className="text-rose-500/50 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}
