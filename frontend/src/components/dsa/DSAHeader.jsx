import { motion } from "framer-motion";
import { Plus, LayoutGrid, Layers, Building2, RotateCcw, Bookmark } from "lucide-react";
import Button from "../ui/Button";
import { cn } from "../../utils/cn";

export default function DSAHeader({
  activeTab,
  setActiveTab,
  onOpenAddModal,
}) {
  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutGrid },
    { id: "topics", label: "Topics", icon: Layers },
    { id: "companies", label: "Companies", icon: Building2 },
    { id: "revision", label: "Revision", icon: RotateCcw },
    { id: "bookmarks", label: "Bookmarks", icon: Bookmark },
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* Header Banner matching reference screenshot */}
      <div className="relative flex flex-col justify-between gap-4 rounded-2xl border border-[#1E2D45] bg-[#0B132B]/80 p-5 backdrop-blur-md md:flex-row md:items-center">
        {/* Background SVG Aesthetic */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-40">
          <svg
            className="absolute right-0 top-0 h-full w-auto max-w-none text-blue-900/30"
            viewBox="0 0 600 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="500" cy="50" r="40" fill="#3B82F6" fillOpacity="0.25" />
            <path d="M350 200L440 80L520 200H350Z" fill="url(#dsaMountain1)" />
            <path d="M450 200L520 110L600 200H450Z" fill="url(#dsaMountain2)" />
            <defs>
              <linearGradient id="dsaMountain1" x1="435" y1="80" x2="435" y2="200" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1E3A8A" stopOpacity="0.8" />
                <stop offset="1" stopColor="#0B132B" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="dsaMountain2" x1="525" y1="110" x2="525" y2="200" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2563EB" stopOpacity="0.6" />
                <stop offset="1" stopColor="#0B132B" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
            <span>Dashboard</span>
            <span>&gt;</span>
            <span className="text-blue-400 font-semibold">DSA Tracker</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            DSA Tracker
          </h1>
          <p className="text-xs text-text-muted sm:text-sm">
            Track, analyze, and master your DSA journey. Every problem counts.
          </p>
        </div>

        {/* Motivational Banner */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 min-w-[220px] rounded-xl border border-blue-500/20 bg-blue-950/40 p-3.5 backdrop-blur-md"
        >
          <p className="text-xs italic text-blue-200">
            &ldquo;Solve today,
            <br />a stronger tomorrow.&rdquo;
          </p>
          <div className="mt-2 h-0.5 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
        </motion.div>
      </div>

      {/* Navigation Tabs Bar & Add Problem Button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-[#1E2D45] bg-[#0D1424] p-2.5">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-1 min-w-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-all",
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

        {/* Add Problem Action Button */}
        <Button
          onClick={onOpenAddModal}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-md shadow-blue-600/20 shrink-0"
        >
          <Plus size={16} />
          <span>Add Problem</span>
        </Button>
      </div>
    </div>
  );
}
