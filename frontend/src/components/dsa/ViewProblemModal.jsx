import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { ExternalLink, Bookmark, CheckCircle2, Circle, Calendar, Tag } from "lucide-react";

export default function ViewProblemModal({ problem, open, onClose, onToggleSolve, onToggleBookmark }) {
  if (!problem) return null;

  const externalUrl =
    problem.url ||
    `https://leetcode.com/problems/${problem.slug || problem.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}/`;

  const isSolved = problem.status === "Solved";

  return (
    <Modal open={open} onClose={onClose} title={problem.title} size="md">
      <div className="space-y-4 text-xs text-white">
        {/* Header Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#1E2D45] bg-[#070C16] p-3.5">
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-[#1E2D45] bg-[#0D1424] px-2.5 py-1 text-xs font-bold text-blue-400">
              {problem.topic}
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                problem.difficulty === "Easy"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : problem.difficulty === "Medium"
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
              }`}
            >
              {problem.difficulty}
            </span>
            <span className="text-text-muted font-medium">{problem.company}</span>
          </div>

          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:underline"
          >
            <span>Solve on LeetCode</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl border border-[#1E2D45] bg-[#070C16] p-3">
            <span className="text-text-muted font-medium block mb-1">Status</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleSolve(problem.id)}
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 font-bold ${
                  isSolved
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                    : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                }`}
              >
                {isSolved ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                <span>{problem.status}</span>
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-[#1E2D45] bg-[#070C16] p-3">
            <span className="text-text-muted font-medium block mb-1">Bookmark</span>
            <button
              onClick={() => onToggleBookmark(problem.id)}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-semibold ${
                problem.bookmarked
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                  : "bg-[#0D1424] text-text-muted border border-[#1E2D45]"
              }`}
            >
              <Bookmark size={14} className={problem.bookmarked ? "fill-amber-400" : ""} />
              <span>{problem.bookmarked ? "Bookmarked" : "Add Bookmark"}</span>
            </button>
          </div>
        </div>

        {/* Dates */}
        <div className="rounded-xl border border-[#1E2D45] bg-[#070C16] p-3 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-text-muted">Added On:</span>
            <span className="font-semibold">{problem.addedAt || "2026-09-10"}</span>
          </div>
          {problem.solvedAt && (
            <div className="flex justify-between">
              <span className="text-text-muted">Solved On:</span>
              <span className="font-semibold text-emerald-400">{problem.solvedAt}</span>
            </div>
          )}
          {problem.revisionDueAt && (
            <div className="flex justify-between">
              <span className="text-text-muted">Revision Due Date:</span>
              <span className="font-semibold text-amber-400">{problem.revisionDueAt}</span>
            </div>
          )}
        </div>

        {/* Notes */}
        {problem.notes && (
          <div className="rounded-xl border border-[#1E2D45] bg-[#070C16] p-3 space-y-1">
            <span className="font-bold text-blue-400">Notes & Key Learnings:</span>
            <p className="text-text-muted leading-relaxed">{problem.notes}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button variant="ghost" onClick={onClose} className="text-text-muted">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
