import Card from "../ui/Card";

export default function DashboardInsights({ data }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <h3 className="mb-4 text-sm font-semibold text-text">Preparation Progress</h3>
        <div className="space-y-3">
          {data.progressBySection.map((section) => (
            <div key={section.section} className="grid grid-cols-[6rem_1fr_auto] items-center gap-3 text-sm">
              <span className="text-text-muted">{section.section}</span>
              <div className="h-2 overflow-hidden rounded-full bg-bg-border">
                <div className="h-full rounded-full bg-primary" style={{ width: `${section.progress ?? 0}%` }} />
              </div>
              <span className="text-xs text-text-muted">
                {section.progress == null ? `${section.activityCount} activities` : `${section.progress}%`}
              </span>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h3 className="mb-2 text-sm font-semibold text-text">Next Best Action</h3>
        <p className="text-sm text-text-muted">
          {data.weakAreas.length ? `No activity recorded yet for ${data.weakAreas[0]}.` : "Keep building on your recorded activity."}
        </p>
        <p className="mt-4 text-xs text-text-muted">Recommendations will appear when enough activity history exists.</p>
      </Card>
      <Card className="lg:col-span-2">
        <h3 className="mb-4 text-sm font-semibold text-text">Preparation Streak</h3>
        <div className="grid grid-cols-7 gap-1.5 sm:grid-cols-14">
          {data.monthlyActivity.map((point) => (
            <div key={point.label} title={`${point.label}: ${point.value} activities`} className={`h-4 rounded-sm ${point.value ? "bg-primary" : "bg-bg-border"}`} />
          ))}
        </div>
      </Card>
      <Card>
        <h3 className="mb-2 text-sm font-semibold text-text">Areas to Improve</h3>
        {data.weakAreas.length ? <p className="text-sm text-text-muted">{data.weakAreas.join(", ")}</p> : <p className="text-sm text-text-muted">Not enough data yet.</p>}
      </Card>
    </div>
  );
}
