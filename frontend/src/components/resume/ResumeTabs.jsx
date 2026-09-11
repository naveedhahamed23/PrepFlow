import { motion } from "framer-motion";
import { Wrench, BarChart2, LayoutTemplate, Mail, Folder } from "lucide-react";
import { cn } from "../../utils/cn";

const tabs = [
  { id: "build", label: "Build & Edit", icon: Wrench, active: true },
  { id: "analyze", label: "Analyze", icon: BarChart2 },
  { id: "templates", label: "Templates", icon: LayoutTemplate },
  { id: "cover-letter", label: "Cover Letter", icon: Mail, badge: "New" },
  { id: "my-resumes", label: "My Resumes", icon: Folder },
];

export default function ResumeTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id || (tab.active && !activeTab);
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-lg overflow-hidden border",
              isActive
                ? "text-primary border-primary/50 bg-primary/10 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                : "text-text-muted border-bg-border/60 bg-bg-card hover:bg-bg-hover hover:text-text hover:border-bg-border"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="resume-tab-active"
                className="absolute inset-0 bg-primary/5"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <tab.icon size={16} className={isActive ? "text-primary" : "text-text-muted"} />
            <span className="relative z-10">{tab.label}</span>
            {tab.badge && (
              <span className="relative z-10 ml-1 rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-400 border border-indigo-500/30">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
