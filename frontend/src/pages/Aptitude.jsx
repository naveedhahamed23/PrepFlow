import { useState } from "react";
import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BarChart3, BookOpen, Brain, Calculator, CheckCircle2, Clock3, FileText, Hash, PlayCircle, Puzzle, Target, Users } from "lucide-react";
import Card, { ChartCard } from "../components/ui/Card";
import StatCard from "../components/dashboard/StatCard";
import Badge from "../components/ui/Badge";
import { SkeletonCard } from "../components/ui/Skeleton";
import { useFetch } from "../hooks/useFetch";
import aptitudeService from "../services/aptitudeService";
import { difficultyColor } from "../utils/format";

const icons = { Calculator, Brain, BookOpen, BarChart3, PuzzlePiece: Puzzle, Hash, Users, FileText };
const categories = ["All Topics", "Quant", "Reasoning", "Verbal"];

export default function Aptitude() {
  const { data: topics, loading } = useFetch(() => aptitudeService.getTopics(), []);
  const { data: analytics } = useFetch(() => aptitudeService.getAnalytics(), []);
  const { data: summary } = useFetch(() => aptitudeService.getSummary(), []);
  const [category, setCategory] = useState("All Topics");
  const visibleTopics = (topics || []).filter((topic) => category === "All Topics" || topic.category === category);
  const attempted = summary?.questionsAttempted ?? 0;
  const accuracy = summary?.averageAccuracy ?? 0;

  return (
    <div className="space-y-3">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div><div className="mb-2 flex items-center gap-2 text-[10px] text-text-muted"><span>Dashboard</span><span>›</span><span className="text-primary-light">Aptitude</span></div><h1 className="text-2xl font-bold leading-none tracking-tight text-text">Aptitude</h1><p className="mt-1.5 text-xs text-text-muted">Practice quant, reasoning, and verbal — all in one place.</p></div>
        <div className="aptitude-quote hidden max-w-[275px] rounded-xl border border-primary/20 px-4 py-2.5 text-[11px] italic leading-4 text-text-muted sm:block">“Discipline in practice,<br />confidence in results.”</div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Target} label="Questions Attempted" value={attempted} detail="Across all topics" delta={attempted ? "↑ this week" : undefined} color="success" />
        <StatCard icon={CheckCircle2} label="Average Accuracy" value={topics?.length ? `${accuracy}%` : "No data"} detail="Overall performance" color="primary" />
        <StatCard icon={BarChart3} label="Tests Completed" value={summary?.testsCompleted ?? 0} detail="Full aptitude tests" color="warning" />
        <StatCard icon={Clock3} label="Total Time Spent" value={`${Math.floor((summary?.studyMinutes ?? 0) / 60)}h ${(summary?.studyMinutes ?? 0) % 60}m`} detail="Practice time" color="primary" />
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1.7fr)_minmax(270px,0.75fr)]">
        <ChartCard title="Performance Overview" subtitle="Accuracy and questions attempted over time" className="min-h-[177px] rounded-xl p-3.5" action={<div className="rounded-lg border border-bg-border bg-bg px-2.5 py-1.5 text-[10px] text-text-muted">Last 30 Days ⌄</div>}>
          <ResponsiveContainer width="100%" height={112}><ComposedChart data={(analytics || []).map((point) => ({ ...point, attempted: 0 }))} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" stroke="#1c2a41" vertical={false} /><XAxis dataKey="topic" stroke="#71809c" fontSize={9} tickLine={false} axisLine={false} /><YAxis stroke="#71809c" fontSize={9} tickLine={false} axisLine={false} /><Tooltip contentStyle={{ background: "#111827", border: "1px solid #263653", borderRadius: 8, fontSize: 11 }} /><Bar dataKey="attempted" fill="#3182f6" barSize={18} radius={[3, 3, 0, 0]} /><Line type="monotone" dataKey="accuracy" stroke="#a855f7" strokeWidth={2} dot={{ fill: "#a855f7", r: 3 }} /></ComposedChart></ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Topic Strength Distribution" subtitle="Accuracy by category" className="min-h-[177px] rounded-xl p-3.5"><div className="flex h-[112px] items-center justify-center"><div className="relative flex h-24 w-24 items-center justify-center rounded-full" style={{ background: `conic-gradient(#22c55e ${accuracy}%, #3b82f6 ${accuracy}% 100%)` }}><div className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-bg-card"><span className="text-lg font-bold text-text">{topics?.length ? `${accuracy}%` : "0%"}</span><span className="text-[9px] text-text-muted">Overall</span></div></div><div className="ml-5 space-y-1.5 text-[10px] text-text-muted">{(analytics || []).slice(0, 4).map((point) => <div key={point.topic} className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-primary" />{point.topic}<span className="ml-auto pl-2 text-text">{point.accuracy}%</span></div>)}</div></div></ChartCard>
      </div>

      <div className="flex flex-wrap items-center gap-2"><div className="relative min-w-[210px] flex-1"><input placeholder="Search topics..." className="w-full rounded-xl border border-bg-border bg-bg-card px-3.5 py-2.5 text-xs text-text placeholder:text-text-muted/60 focus:border-primary focus:outline-none" /></div>{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`rounded-lg px-3 py-2 text-[11px] font-medium transition-colors ${category === item ? "bg-primary text-white" : "border border-bg-border text-text-muted hover:bg-bg-hover"}`}>{item}</button>)}<button className="ml-auto rounded-lg border border-bg-border px-3 py-2 text-[11px] text-text-muted">Sort by Progress ⌄</button></div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

        {visibleTopics.map((topic) => {
          const Icon = icons[topic.icon] || Calculator;
          const pct = Math.round((topic.completed / topic.total) * 100);
          return (
            <Card key={topic.id} className="flex min-h-[106px] flex-col rounded-xl p-3">
              <div className="flex items-start justify-between gap-2"><div className="flex min-w-0 items-center gap-2.5"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon size={16} /></div><h3 className="truncate text-xs font-semibold text-text">{topic.name}</h3></div>
                <Badge className={difficultyColor[topic.difficulty]}>{topic.difficulty}</Badge>
              </div>
              <p className="mt-3 flex justify-between text-[10px] text-text-muted">
                {topic.completed} / {topic.total} questions completed
                <span className="text-text">{pct}%</span>
              </p>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-bg-border">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${pct}%` }} />
              </div>
              <button className="mt-2.5 flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/5 py-1.5 text-[10px] font-medium text-primary-light transition-colors hover:bg-primary/10">
                <PlayCircle size={15} /> Practice Now
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
