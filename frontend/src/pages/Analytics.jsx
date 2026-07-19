import {
  PieChart, Pie, Cell, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";
import { ChartCard } from "../components/ui/Card";
import Heatmap from "../components/charts/Heatmap";
import { useFetch } from "../hooks/useFetch";
import analyticsService from "../services/analyticsService";

const tooltipStyle = { background: "#18181B", border: "1px solid #27272A", borderRadius: 8, fontSize: 12 };

export default function Analytics() {
  const { data: studyHours, loading: l1 } = useFetch(() => analyticsService.getStudyHoursTrend(), []);
  const { data: topicPerf, loading: l2 } = useFetch(() => analyticsService.getTopicPerformance(), []);
  const { data: revision, loading: l3 } = useFetch(() => analyticsService.getRevisionStats(), []);
  const { data: difficulty, loading: l4 } = useFetch(() => analyticsService.getDifficultyBreakdown(), []);
  const { data: progress, loading: l5 } = useFetch(() => analyticsService.getProgressOverTime(), []);
  const { data: heatmap, loading: l6 } = useFetch(() => analyticsService.getHeatmap(), []);

  const loading = l1 || l2 || l3 || l4 || l5 || l6;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Analytics</h1>
        <p className="mt-1 text-sm text-text-muted">Deep insights into where you're strong and where to focus.</p>
      </div>

      {loading ? (
        <div className="h-96 animate-pulse rounded-2xl bg-bg-card" />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <ChartCard title="Study Hours Trend" subtitle="Hours studied per month">
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={studyHours} margin={{ top: 6, right: 6, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                  <XAxis dataKey="month" stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="hours" stroke="#3B82F6" strokeWidth={2.5} dot={{ fill: "#3B82F6", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Difficulty Breakdown" subtitle="DSA problems by difficulty">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={difficulty} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                    {difficulty.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 12, color: "#A1A1AA" }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <ChartCard title="Topic Performance" subtitle="Composite score across prep areas">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={topicPerf} margin={{ top: 6, right: 6, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                  <XAxis dataKey="name" stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Revision Statistics" subtitle="Current revision pipeline status">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={revision} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                    {revision.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 12, color: "#A1A1AA" }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <ChartCard title="Progress Over Time" subtitle="Cumulative problems solved by category">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={progress} margin={{ top: 6, right: 6, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                <XAxis dataKey="week" stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12, color: "#A1A1AA" }} />
                <Line type="monotone" dataKey="dsa" name="DSA" stroke="#3B82F6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="aptitude" name="Aptitude" stroke="#60A5FA" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="core" name="Core CS" stroke="#F59E0B" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <Heatmap data={heatmap} />
        </>
      )}
    </div>
  );
}
