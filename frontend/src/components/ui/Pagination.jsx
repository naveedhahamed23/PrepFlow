import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <div className="flex items-center justify-center gap-1.5">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="rounded-lg border border-bg-border p-2 text-text-muted hover:bg-bg-hover disabled:opacity-40"
      >
        <ChevronLeft size={14} />
      </button>
      {pages.map((p, i) => (
        <div key={p} className="flex items-center gap-1.5">
          {i > 0 && pages[i - 1] !== p - 1 && <span className="text-text-muted">…</span>}
          <button
            onClick={() => onChange(p)}
            className={cn(
              "h-8 w-8 rounded-lg text-sm font-medium",
              p === page ? "bg-primary text-white" : "text-text-muted hover:bg-bg-hover"
            )}
          >
            {p}
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="rounded-lg border border-bg-border p-2 text-text-muted hover:bg-bg-hover disabled:opacity-40"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
