import { Bookmark, ExternalLink, Trash2 } from "lucide-react";
import Button from "../ui/Button";

export default function BookmarksView({ problems = [], onToggleBookmark, onViewProblem }) {
  const bookmarkedProblems = problems.filter((p) => p.bookmarked);

  return (
    <div className="space-y-4 min-w-0">
      <div>
        <h2 className="text-lg font-bold text-white">Bookmarked Problems</h2>
        <p className="text-xs text-text-muted">
          Your saved high-priority problems for quick revision
        </p>
      </div>

      {bookmarkedProblems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#1E2D45] bg-[#0D1424]/50 p-12 text-center">
          <Bookmark size={28} className="text-text-muted mb-2" />
          <h3 className="text-base font-bold text-white">No bookmarked problems.</h3>
          <p className="text-xs text-text-muted mt-1">
            Click the bookmark icon on any problem in the table to save it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarkedProblems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md border border-[#1E2D45] bg-[#070C16] px-2 py-0.5 text-[10px] font-bold text-blue-400">
                    {item.topic}
                  </span>
                  <button
                    onClick={() => onToggleBookmark(item.id)}
                    className="text-amber-400 hover:text-amber-300"
                    title="Remove Bookmark"
                  >
                    <Bookmark size={16} className="fill-amber-400" />
                  </button>
                </div>

                <h4
                  onClick={() => onViewProblem(item)}
                  className="mt-2.5 font-bold text-white text-sm hover:text-blue-400 cursor-pointer truncate"
                >
                  {item.title}
                </h4>
                <p className="text-[11px] text-text-muted mt-1 line-clamp-2">
                  {item.notes || "Bookmarked problem for revision."}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#1E2D45]/60 pt-3">
                <span className="text-[11px] font-semibold text-text-muted">
                  {item.company}
                </span>

                <Button
                  onClick={() => onViewProblem(item)}
                  className="bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white font-semibold text-xs px-3 py-1 rounded-lg"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
