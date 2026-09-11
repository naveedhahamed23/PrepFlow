import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import DetailedTopicModal from "./DetailedTopicModal";
import { TOPIC_PERFORMANCE_DATA } from "../../data/analyticsData";
import { cn } from "../../utils/cn";

export default function TopicStrengthCard({ onNavigateToCategory }) {
  const [activeTab, setActiveTab] = useState("DSA"); // "DSA" | "Aptitude" | "Interview"
  const [modalOpen, setModalOpen] = useState(false);

  const topics = TOPIC_PERFORMANCE_DATA[activeTab] || TOPIC_PERFORMANCE_DATA.DSA;

  return (
    <>
      <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm min-w-0">
        {/* Header & Tabs */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-bold text-white">
              Topic Strength vs Weakness
            </h3>
            <p className="text-xs text-text-muted">Performance across all topics</p>
          </div>

          {/* Category Tabs matching screenshot */}
          <div className="flex items-center gap-1 rounded-lg bg-[#070C16] p-1 border border-[#1E2D45]/60 self-start sm:self-auto">
            {["DSA", "Aptitude", "Interview"].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "rounded-md px-3 py-1 text-xs font-semibold transition-all",
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-text-muted hover:text-white hover:bg-white/5"
                  )}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress List matching reference screenshot */}
        <div className="mt-4 space-y-3">
          {topics.map((t) => (
            <div key={t.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">{t.name}</span>
                <span className="font-bold text-white">{t.score}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#162238]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${t.score}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: t.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Action Link */}
        <div className="mt-4 text-center border-t border-[#1E2D45]/60 pt-3">
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>View Detailed Topic Analysis</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <DetailedTopicModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        category={activeTab}
        onNavigateToCategory={onNavigateToCategory}
      />
    </>
  );
}
