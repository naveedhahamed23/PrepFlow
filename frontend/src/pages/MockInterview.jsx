import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { Code2, MessageCircle, Handshake, Network, PlayCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card, { ChartCard } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Table from "../components/ui/Table";
import { useFetch } from "../hooks/useFetch";
import interviewService from "../services/interviewService";
import { useToast } from "../context/ToastContext";
import { difficultyColor, formatDate } from "../utils/format";

const icons = { Code2, MessageCircle, Handshake, Network };

export default function MockInterview() {
  const { data: types, loading: typesLoading } = useFetch(() => interviewService.getInterviewTypes(), []);
  const { data: history, loading: historyLoading } = useFetch(() => interviewService.getHistory(), []);
  const { data: performance } = useFetch(() => interviewService.getPerformanceTrend(), []);
  const toast = useToast();
  const navigate = useNavigate();

  const startInterview = async (type) => {
    try {
      await interviewService.startInterview(type.id);
      toast.success(`${type.title} session started.`);
      navigate("/app/assistant");
    } catch {
      toast.error("Could not start interview. Try again.");
    }
  };

  const columns = [
    { key: "type", header: "Type", render: (r) => <Badge variant="primary">{r.type}</Badge> },
    { key: "date", header: "Date", render: (r) => formatDate(r.date) },
    { key: "duration", header: "Duration" },
    {
      key: "score",
      header: "Score",
      render: (r) => (
        <span className={`font-semibold ${r.score >= 80 ? "text-success" : r.score >= 60 ? "text-warning" : "text-danger"}`}>
          {r.score}/100
        </span>
      ),
    },
    { key: "feedback", header: "Feedback", render: (r) => <span className="text-text-muted">{r.feedback}</span> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Mock Interview</h1>
        <p className="mt-1 text-sm text-text-muted">Practice technical, behavioral, and HR rounds with instant feedback.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {typesLoading && Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-52 animate-pulse rounded-2xl bg-bg-card" />)}
        {types?.map((t) => {
          const Icon = icons[t.icon] || Code2;
          return (
            <Card key={t.id} className="flex flex-col">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon size={20} />
              </div>
              <Badge variant="default" className="mt-3 w-fit">{t.type}</Badge>
              <h3 className="mt-2 text-base font-semibold text-text">{t.title}</h3>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-text-muted">{t.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
                <span className="flex items-center gap-1"><Clock size={12} /> {t.duration}</span>
                <Badge className={difficultyColor[t.difficulty]}>{t.difficulty}</Badge>
              </div>
              <button
                onClick={() => startInterview(t)}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent py-2.5 text-sm font-semibold text-white shadow-glow"
              >
                <PlayCircle size={15} /> Start Interview
              </button>
            </Card>
          );
        })}
      </div>

      <ChartCard title="Performance Trend" subtitle="Average mock interview score over time">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={performance || []} margin={{ top: 6, right: 6, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
            <XAxis dataKey="month" stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "#18181B", border: "1px solid #27272A", borderRadius: 8, fontSize: 12 }} />
            <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2.5} dot={{ fill: "#3B82F6", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-text">Interview History</h3>
        {historyLoading ? (
          <div className="h-40 animate-pulse rounded-2xl bg-bg-card" />
        ) : (
          <Table columns={columns} data={history || []} />
        )}
      </div>
    </div>
  );
}
