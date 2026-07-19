import { useNavigate } from "react-router-dom";
import { CheckCircle2, Code2, Mic, FileText, Trophy, Plus, Play, FileEdit, Users } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { formatDate } from "../../utils/format";

const activityItems = [
  { icon: CheckCircle2, text: "Solved 'Merge Intervals'", time: "2h ago", color: "text-success" },
  { icon: Mic, text: "Completed Technical mock interview — scored 82%", time: "5h ago", color: "text-primary" },
  { icon: Trophy, text: "Moved up to rank #27 on the leaderboard", time: "1d ago", color: "text-warning" },
  { icon: Code2, text: "Solved 'LRU Cache'", time: "1d ago", color: "text-success" },
  { icon: FileText, text: "Updated resume — ATS score improved to 78", time: "3d ago", color: "text-primary" },
];

export function ActivityTimeline() {
  return (
    <Card>
      <h3 className="mb-4 text-sm font-semibold text-text">Activity Timeline</h3>
      <div className="space-y-5">
        {activityItems.map((item, i) => (
          <div key={i} className="relative flex gap-3 pl-1">
            {i !== activityItems.length - 1 && (
              <span className="absolute left-[13px] top-6 h-full w-px bg-bg-border" />
            )}
            <item.icon size={18} className={`shrink-0 ${item.color}`} />
            <div className="min-w-0 pb-1">
              <p className="text-sm text-text">{item.text}</p>
              <p className="mt-0.5 text-xs text-text-muted">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function UpcomingSchedule({ items }) {
  return (
    <Card>
      <h3 className="mb-4 text-sm font-semibold text-text">Upcoming Schedule</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-bg-border/60 px-3.5 py-2.5">
            <div className="min-w-0">
              <p className="truncate text-sm text-text">{item.title}</p>
              <p className="text-xs text-text-muted">{formatDate(item.date)}</p>
            </div>
            <Badge variant="primary" className="shrink-0">{item.category}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function QuickActions() {
  const navigate = useNavigate();
  const actions = [
    { icon: Plus, label: "Log Problem", path: "/app/dsa" },
    { icon: Play, label: "Start Mock", path: "/app/interview" },
    { icon: FileEdit, label: "Edit Resume", path: "/app/resume" },
    { icon: Users, label: "Leaderboard", path: "/app/leaderboard" },
  ];

  return (
    <Card>
      <h3 className="mb-4 text-sm font-semibold text-text">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={() => navigate(a.path)}
            className="flex flex-col items-center gap-2 rounded-xl border border-bg-border/60 py-4 text-xs font-medium text-text-muted transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
          >
            <a.icon size={18} />
            {a.label}
          </button>
        ))}
      </div>
    </Card>
  );
}
