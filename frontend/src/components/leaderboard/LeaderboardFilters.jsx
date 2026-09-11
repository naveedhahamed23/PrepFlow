import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { cn } from "../../utils/cn";

export default function LeaderboardFilters({
  activeFilter,
  setActiveFilter,
  activePeriod,
  setActivePeriod,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-[#1E2D45] bg-[#0D1424] p-3">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 min-w-0">
        {/* Scope Filters */}
        <div className="flex items-center gap-1 rounded-lg bg-[#070C16] p-1 border border-[#1E2D45]/60">
          {[
            { id: "global", label: "Global" },
            { id: "friends", label: "Friends" },
            { id: "college", label: "College" },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-semibold transition-all",
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-text-muted hover:text-white hover:bg-white/5"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Separator */}
        <div className="hidden sm:block h-6 w-px bg-[#1E2D45]" />

        {/* Period Filters */}
        <div className="flex items-center gap-1 rounded-lg bg-[#070C16] p-1 border border-[#1E2D45]/60">
          {[
            { id: "weekly", label: "Weekly" },
            { id: "monthly", label: "Monthly" },
            { id: "allTime", label: "All Time" },
          ].map((tab) => {
            const isActive = activePeriod === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePeriod(tab.id)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-semibold transition-all",
                  isActive
                    ? "bg-blue-600/30 border border-blue-500/50 text-blue-300 font-bold"
                    : "text-text-muted hover:text-white hover:bg-white/5"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort Dropdown */}
      <div className="relative flex items-center gap-2 self-start sm:self-auto">
        <span className="text-xs font-medium text-text-muted hidden md:inline">
          Sort by
        </span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none rounded-lg border border-[#1E2D45] bg-[#070C16] px-3.5 py-1.5 pr-8 text-xs font-semibold text-white focus:border-blue-500 focus:outline-none cursor-pointer"
          >
            <option value="xp">Sort by XP</option>
            <option value="problems">Sort by Problems</option>
            <option value="hours">Sort by Study Time</option>
            <option value="interviews">Sort by Interviews</option>
            <option value="streak">Sort by Streak</option>
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted"
          />
        </div>
      </div>
    </div>
  );
}
