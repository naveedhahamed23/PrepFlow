import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import { Calculator, Brain, BookOpen, BarChart3, Puzzle, Hash, Users, FileText, PlayCircle } from "lucide-react";
import Card, { ChartCard } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { SkeletonCard } from "../components/ui/Skeleton";
import { useFetch } from "../hooks/useFetch";
import aptitudeService from "../services/aptitudeService";
import { difficultyColor } from "../utils/format";

const icons = { Calculator, Brain, BookOpen, BarChart3, PuzzlePiece: Puzzle, Hash, Users, FileText };

export default function Aptitude() {
  const { data: topics, loading } = useFetch(() => aptitudeService.getTopics(), []);
  const { data: analytics } = useFetch(() => aptitudeService.getAnalytics(), []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Aptitude</h1>
        <p className="mt-1 text-sm text-text-muted">Practice quant, reasoning, and verbal — all in one place.</p>
      </div>

      <ChartCard title="Accuracy by Category" subtitle="Your performance across aptitude categories">
        <ResponsiveContainer width="100%" height={260}>
          <RadarChart data={analytics || []}>
            <PolarGrid stroke="#27272A" />
            <PolarAngleAxis dataKey="topic" stroke="#A1A1AA" fontSize={12} />
            <PolarRadiusAxis stroke="#27272A" tick={false} axisLine={false} />
            <Radar dataKey="accuracy" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.35} />
          </RadarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

        {topics?.map((topic) => {
          const Icon = icons[topic.icon] || Calculator;
          const pct = Math.round((topic.completed / topic.total) * 100);
          return (
            <Card key={topic.id} className="flex flex-col">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={20} />
                </div>
                <Badge className={difficultyColor[topic.difficulty]}>{topic.difficulty}</Badge>
              </div>
              <h3 className="mt-4 text-base font-semibold text-text">{topic.name}</h3>
              <p className="mt-1 text-xs text-text-muted">
                {topic.completed} / {topic.total} questions completed
              </p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-bg-border">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${pct}%` }} />
              </div>
              <button className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-bg-border py-2.5 text-sm font-medium text-text transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary">
                <PlayCircle size={15} /> Practice Now
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
