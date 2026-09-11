import { RotateCcw, Check, Clock } from "lucide-react";
import Button from "../ui/Button";

export default function RevisionView({ problems = [], onMarkRevised, onViewProblem }) {
  const revisionDueProblems = problems.filter(
    (p) => p.revisionDueAt && new Date(p.revisionDueAt) <= new Date("2026-09-11T23:59:59")
  );

  return (
    <div className="space-y-4 min-w-0">
      <div>
        <h2 className="text-lg font-bold text-white">Revision Pipeline</h2>
        <p className="text-xs text-text-muted">
          Review problem solutions to solidify active recall and retention.
        </p>
      </div>

      {revisionDueProblems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#1E2D45] bg-[#0D1424]/50 p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            <Check size={24} />
          </div>
          <h3 className="mt-4 text-base font-bold text-white">
            All revisions up to date!
          </h3>
          <p className="mt-1 text-xs text-text-muted">
            No problems pending revision today. Keep solving new challenges!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {revisionDueProblems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-xl border border-amber-500/30 bg-[#0D1424] p-4 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md border border-[#1E2D45] bg-[#070C16] px-2 py-0.5 text-[10px] font-bold text-blue-400">
                    {item.topic}
                  </span>
                  <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                    <Clock size={11} /> Due Today
                  </span>
                </div>

                <h4
                  onClick={() => onViewProblem(item)}
                  className="mt-2.5 font-bold text-white text-sm hover:text-blue-400 cursor-pointer truncate"
                >
                  {item.title}
                </h4>
                <p className="text-[11px] text-text-muted mt-1 line-clamp-2">
                  {item.notes || "Practice active recall on solution approach."}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#1E2D45]/60 pt-3">
                <span className="text-[11px] font-medium text-text-muted">
                  {item.company}
                </span>

                <Button
                  onClick={() => onMarkRevised(item.id)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs px-3 py-1.5 rounded-lg"
                >
                  <RotateCcw size={13} className="mr-1 inline" />
                  Mark Revised
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
