import { useState } from "react";
import { Code, Calculator, FileText, Mic, Calendar } from "lucide-react";
import DeadlinesModal from "./DeadlinesModal";

const DEADLINE_ICONS = {
  DSA: { icon: Code, bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20" },
  Aptitude: { icon: Calculator, bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  Resume: { icon: FileText, bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
  Interview: { icon: Mic, bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
};

export default function UpcomingDeadlinesCard({
  deadlines = [],
  onAddDeadline,
  onToggleDeadlineComplete,
  onDeleteDeadline,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Upcoming Deadlines</h3>
          <button
            onClick={() => setModalOpen(true)}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            View All
          </button>
        </div>

        {deadlines.length === 0 ? (
          <div className="mt-3 py-4 text-center text-xs text-text-muted">
            No upcoming deadlines.
          </div>
        ) : (
          <div className="mt-3 space-y-2.5">
            {deadlines.slice(0, 4).map((item) => {
              const cfg = DEADLINE_ICONS[item.category] || DEADLINE_ICONS.DSA;
              const IconComp = cfg.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => setModalOpen(true)}
                  className="flex cursor-pointer items-center justify-between rounded-xl border border-[#1E2D45] bg-[#070C16]/60 p-2.5 transition-all hover:bg-[#111A2E]"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${cfg.bg} ${cfg.text}`}
                    >
                      <IconComp size={16} />
                    </div>
                    <p className="truncate text-xs font-medium text-white">
                      {item.title}
                    </p>
                  </div>
                  <span className="shrink-0 text-[11px] font-semibold text-rose-400">
                    {item.daysLeft} days left
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <DeadlinesModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        deadlines={deadlines}
        onAddDeadline={onAddDeadline}
        onToggleDeadlineComplete={onToggleDeadlineComplete}
        onDeleteDeadline={onDeleteDeadline}
      />
    </>
  );
}
