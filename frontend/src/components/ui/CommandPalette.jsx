import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search, LayoutDashboard, Code2, Calculator, FileText, Mic, Bot,
  CalendarDays, User, Settings, Trophy, BarChart3,
} from "lucide-react";

const commands = [
  { label: "Go to Dashboard", path: "/app/dashboard", icon: LayoutDashboard, group: "Navigate" },
  { label: "Go to DSA Tracker", path: "/app/dsa", icon: Code2, group: "Navigate" },
  { label: "Go to Aptitude", path: "/app/aptitude", icon: Calculator, group: "Navigate" },
  { label: "Go to Resume Builder", path: "/app/resume", icon: FileText, group: "Navigate" },
  { label: "Go to Mock Interview", path: "/app/interview", icon: Mic, group: "Navigate" },
  { label: "Go to AI Assistant", path: "/app/assistant", icon: Bot, group: "Navigate" },
  { label: "Go to Study Planner", path: "/app/planner", icon: CalendarDays, group: "Navigate" },
  { label: "Go to Leaderboard", path: "/app/leaderboard", icon: Trophy, group: "Navigate" },
  { label: "Go to Analytics", path: "/app/analytics", icon: BarChart3, group: "Navigate" },
  { label: "Go to Profile", path: "/app/profile", icon: User, group: "Navigate" },
  { label: "Go to Settings", path: "/app/settings", icon: Settings, group: "Navigate" },
];

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const filtered = useMemo(
    () => commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActive(0);
    }
  }, [open]);

  useEffect(() => {
    function handleKey(e) {
      if (!open) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      }
      if (e.key === "Enter" && filtered[active]) {
        navigate(filtered[active].path);
        onClose();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, filtered, active, navigate, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="glass-strong relative w-full max-w-lg overflow-hidden rounded-2xl border border-bg-border shadow-card mx-4"
          >
            <div className="flex items-center gap-3 border-b border-bg-border px-4 py-3.5">
              <Search size={16} className="text-text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Search pages, actions..."
                className="flex-1 bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none"
              />
              <kbd className="rounded border border-bg-border px-1.5 py-0.5 text-[10px] text-text-muted">ESC</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-text-muted">No matches found.</p>
              )}
              {filtered.map((cmd, i) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={cmd.path}
                    onClick={() => {
                      navigate(cmd.path);
                      onClose();
                    }}
                    onMouseEnter={() => setActive(i)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                      i === active ? "bg-primary/10 text-primary" : "text-text hover:bg-white/5"
                    }`}
                  >
                    <Icon size={16} />
                    {cmd.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
