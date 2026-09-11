import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, LayoutGrid } from "lucide-react";
import Button from "../ui/Button";
import { cn } from "../../utils/cn";

export default function ViewAndDateBar({
  viewMode,
  setViewMode,
  selectedDate,
  setSelectedDate,
  onOpenAddTask,
}) {
  // Format date nicely: e.g. "September 11, 2026"
  const formattedDateStr = new Date(selectedDate + "T00:00:00").toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  const handlePrevDay = () => {
    const d = new Date(selectedDate + "T00:00:00");
    d.setDate(d.getDate() - 1);
    setSelectedDate(d.toISOString().split("T")[0]);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate + "T00:00:00");
    d.setDate(d.getDate() + 1);
    setSelectedDate(d.toISOString().split("T")[0]);
  };

  const handleTodayClick = () => {
    setSelectedDate("2026-09-11");
  };

  return (
    <div className="mb-6 flex flex-col items-stretch justify-between gap-4 rounded-xl border border-[#1E2D45] bg-[#0D1424] p-3 sm:flex-row sm:items-center">
      {/* Left: View Tabs */}
      <div className="flex items-center gap-1 rounded-lg bg-[#070C16] p-1 border border-[#1E2D45]/60">
        {[
          { id: "today", label: "Today", icon: Clock },
          { id: "week", label: "Week", icon: LayoutGrid },
          { id: "month", label: "Month", icon: CalendarIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = viewMode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-semibold transition-all",
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-text-muted hover:text-white hover:bg-white/5"
              )}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Middle: Date Navigation */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={handlePrevDay}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1E2D45] bg-[#070C16] text-text-muted hover:border-blue-500/50 hover:text-white transition-colors"
          title="Previous Day"
        >
          <ChevronLeft size={16} />
        </button>

        <span className="min-w-[150px] text-center text-sm font-bold text-white">
          {formattedDateStr}
        </span>

        <button
          onClick={handleNextDay}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1E2D45] bg-[#070C16] text-text-muted hover:border-blue-500/50 hover:text-white transition-colors"
          title="Next Day"
        >
          <ChevronRight size={16} />
        </button>

        {selectedDate !== "2026-09-11" && (
          <button
            onClick={handleTodayClick}
            className="ml-1 rounded-md border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-400 hover:bg-blue-500/20"
          >
            Today
          </button>
        )}
      </div>

      {/* Right: Add Task CTA */}
      <Button
        onClick={onOpenAddTask}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-md shadow-blue-600/20"
      >
        <Plus size={16} />
        <span>Add Task</span>
      </Button>
    </div>
  );
}
