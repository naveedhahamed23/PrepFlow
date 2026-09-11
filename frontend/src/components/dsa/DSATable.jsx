import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Eye,
  Edit2,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Trash2,
  Check,
} from "lucide-react";
import { cn } from "../../utils/cn";

export default function DSATable({
  problems = [],
  totalCount = 180,
  currentPage = 1,
  pageSize = 6,
  onPageChange,
  onViewProblem,
  onEditProblem,
  onDeleteProblem,
  onToggleSolve,
  onToggleBookmark,
}) {
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [activeMenuId, setActiveMenuId] = useState(null);

  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const pagedProblems = problems.slice(startIndex, startIndex + pageSize);

  const toggleSelectAll = () => {
    if (selectedIds.size === pagedProblems.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(pagedProblems.map((p) => p.id)));
    }
  };

  const toggleSelectRow = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const getDifficultyBadge = (diff) => {
    if (diff === "Easy")
      return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
    if (diff === "Medium")
      return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
    return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
  };

  return (
    <div className="rounded-2xl border border-[#1E2D45] bg-[#0D1424] shadow-sm min-w-0">
      {/* Table Container */}
      <div className="w-full overflow-x-auto custom-scrollbar">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#1E2D45] text-text-muted font-semibold bg-[#070C16]/60">
              <th className="py-3.5 pl-4 pr-2 w-10">
                <input
                  type="checkbox"
                  checked={
                    pagedProblems.length > 0 &&
                    selectedIds.size === pagedProblems.length
                  }
                  onChange={toggleSelectAll}
                  className="rounded border-[#1E2D45] bg-[#070C16] text-blue-600 focus:ring-0 cursor-pointer"
                />
              </th>
              <th className="py-3.5 px-3 font-semibold">Problem</th>
              <th className="py-3.5 px-3 font-semibold">Topic</th>
              <th className="py-3.5 px-3 font-semibold">Difficulty</th>
              <th className="py-3.5 px-3 font-semibold">Company</th>
              <th className="py-3.5 px-3 font-semibold">Status</th>
              <th className="py-3.5 px-3 font-semibold">Added On</th>
              <th className="py-3.5 pr-4 pl-3 font-semibold text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#1E2D45]/60 text-white">
            {pagedProblems.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-text-muted text-xs">
                  No problems match your search or filter.
                </td>
              </tr>
            ) : (
              pagedProblems.map((row) => {
                const isSelected = selectedIds.has(row.id);
                const isSolved = row.status === "Solved";

                return (
                  <tr
                    key={row.id}
                    className={cn(
                      "transition-colors hover:bg-white/5",
                      isSelected && "bg-blue-950/20"
                    )}
                  >
                    {/* Checkbox */}
                    <td className="py-3.5 pl-4 pr-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectRow(row.id)}
                        className="rounded border-[#1E2D45] bg-[#070C16] text-blue-600 focus:ring-0 cursor-pointer"
                      />
                    </td>

                    {/* Problem Title */}
                    <td className="py-3.5 px-3">
                      <div
                        onClick={() => onViewProblem(row)}
                        className="flex items-center gap-2 cursor-pointer group min-w-0"
                      >
                        <span
                          className={cn(
                            "font-bold text-white group-hover:text-blue-400 transition-colors truncate max-w-[240px]",
                            isSolved && "text-blue-200"
                          )}
                        >
                          {row.title}
                        </span>
                        {row.bookmarked && (
                          <Bookmark size={13} className="text-amber-400 shrink-0 fill-amber-400" />
                        )}
                      </div>
                    </td>

                    {/* Topic */}
                    <td className="py-3.5 px-3">
                      <span className="inline-flex rounded-md border border-[#1E2D45] bg-[#070C16] px-2.5 py-1 text-[11px] font-medium text-blue-300">
                        {row.topic}
                      </span>
                    </td>

                    {/* Difficulty */}
                    <td className="py-3.5 px-3">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold",
                          getDifficultyBadge(row.difficulty)
                        )}
                      >
                        {row.difficulty}
                      </span>
                    </td>

                    {/* Company */}
                    <td className="py-3.5 px-3">
                      <span className="font-semibold text-text-muted text-[11px]">
                        {row.company}
                      </span>
                    </td>

                    {/* Status Pill */}
                    <td className="py-3.5 px-3">
                      <button
                        onClick={() => onToggleSolve(row.id)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer",
                          isSolved
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                        )}
                      >
                        {isSolved ? (
                          <>
                            <CheckCircle2 size={13} />
                            <span>Solved</span>
                          </>
                        ) : (
                          <>
                            <Circle size={13} />
                            <span>Tracked</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Added On Date */}
                    <td className="py-3.5 px-3 text-text-muted text-[11px]">
                      {row.addedAt}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 pr-4 pl-3 text-center">
                      <div className="relative flex items-center justify-center gap-1">
                        {/* Eye / View */}
                        <button
                          onClick={() => onViewProblem(row)}
                          className="rounded-lg p-1.5 text-text-muted hover:bg-white/10 hover:text-white transition-colors"
                          title="View Details"
                        >
                          <Eye size={15} />
                        </button>

                        {/* Pencil / Edit */}
                        <button
                          onClick={() => onEditProblem(row)}
                          className="rounded-lg p-1.5 text-text-muted hover:bg-white/10 hover:text-white transition-colors"
                          title="Edit Problem"
                        >
                          <Edit2 size={14} />
                        </button>

                        {/* More Vertical */}
                        <div className="relative">
                          <button
                            onClick={() =>
                              setActiveMenuId(activeMenuId === row.id ? null : row.id)
                            }
                            className="rounded-lg p-1.5 text-text-muted hover:bg-white/10 hover:text-white transition-colors"
                          >
                            <MoreVertical size={15} />
                          </button>

                          {activeMenuId === row.id && (
                            <>
                              <div
                                className="fixed inset-0 z-20"
                                onClick={() => setActiveMenuId(null)}
                              />
                              <div className="absolute right-0 top-8 z-30 min-w-[130px] rounded-xl border border-[#1E2D45] bg-[#070C16] p-1.5 shadow-2xl space-y-0.5 text-left">
                                <button
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    onToggleSolve(row.id);
                                  }}
                                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-text-muted hover:bg-white/10 hover:text-white"
                                >
                                  <Check size={13} />
                                  <span>{isSolved ? "Mark Tracked" : "Mark Solved"}</span>
                                </button>
                                <button
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    onToggleBookmark(row.id);
                                  }}
                                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-text-muted hover:bg-white/10 hover:text-white"
                                >
                                  <Bookmark size={13} />
                                  <span>{row.bookmarked ? "Unbookmark" : "Bookmark"}</span>
                                </button>
                                <button
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    onDeleteProblem(row.id);
                                  }}
                                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10"
                                >
                                  <Trash2 size={13} />
                                  <span>Delete</span>
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer matching reference screenshot */}
      <div className="flex flex-col items-center justify-between gap-3 border-t border-[#1E2D45] p-4 sm:flex-row text-xs text-text-muted">
        <div>
          Showing {totalCount > 0 ? startIndex + 1 : 0}–
          {Math.min(startIndex + pageSize, totalCount)} of {totalCount} problems
        </div>

        {/* Page numbers */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#1E2D45] bg-[#070C16] text-text-muted hover:text-white disabled:opacity-40"
          >
            <ChevronLeft size={14} />
          </button>

          {[1, 2, 3, 4, 5].map((pNum) => (
            <button
              key={pNum}
              onClick={() => onPageChange(pNum)}
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-lg font-semibold text-xs transition-all",
                currentPage === pNum
                  ? "bg-blue-600 text-white font-bold"
                  : "border border-[#1E2D45] bg-[#070C16] text-text-muted hover:text-white"
              )}
            >
              {pNum}
            </button>
          ))}

          <span className="px-1 text-text-muted">...</span>

          <button
            onClick={() => onPageChange(totalPages)}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-lg font-semibold text-xs border border-[#1E2D45] bg-[#070C16] text-text-muted hover:text-white",
              currentPage === totalPages && "bg-blue-600 text-white"
            )}
          >
            {totalPages}
          </button>

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#1E2D45] bg-[#070C16] text-text-muted hover:text-white disabled:opacity-40"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
