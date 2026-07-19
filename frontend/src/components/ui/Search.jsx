import { Search as SearchIcon, X } from "lucide-react";

export default function Search({ value, onChange, placeholder = "Search...", className }) {
  return (
    <div className={`relative ${className || ""}`}>
      <SearchIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-bg-border bg-bg-card py-2.5 pl-10 pr-9 text-sm text-text placeholder:text-text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
