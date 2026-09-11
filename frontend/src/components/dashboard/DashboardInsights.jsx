import { useNavigate } from "react-router-dom";
import { Flag, Plus } from "lucide-react";
import Card from "../ui/Card";

export default function DashboardInsights({ data }) {
  const navigate = useNavigate();
  const goals = (data.todaysTasks || []).slice(0, 3);

  return (
    <Card className="min-h-[165px] rounded-xl p-3.5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-danger/10"><Flag size={15} className="text-danger" /></div><div><h3 className="text-sm font-semibold text-text">Upcoming Goals</h3><p className="text-xs text-text-muted">Set your goals and stay on track</p></div></div>
        <button onClick={() => navigate("/app/planner")} className="flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-xs font-medium text-primary-light transition-colors hover:bg-primary/20"><Plus size={14} /> Add Goal</button>
      </div>
      <div className="rounded-xl border border-dashed border-bg-border px-4 py-5">
        {goals.length ? <div className="space-y-3">{goals.map((goal) => <div key={goal.id} className="flex items-center justify-between gap-3 text-sm"><span className="truncate text-text">{goal.title}</span><span className="shrink-0 text-xs text-text-muted">{goal.done ? "Done" : "In progress"}</span></div>)}</div> : <div className="text-center"><p className="text-sm text-text">No goals set yet</p><p className="mt-1 text-xs text-text-muted">Add your first goal to start your journey!</p></div>}
      </div>
    </Card>
  );
}
