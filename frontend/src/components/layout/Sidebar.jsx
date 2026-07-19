import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Code2, Calculator, FileText, Mic, Bot,
  CalendarDays, User, Settings, Trophy, BarChart3, Zap, ChevronsLeft, ChevronsRight,
} from "lucide-react";
import { cn } from "../../utils/cn";

const navItems = [
  { label: "Dashboard", path: "/app/dashboard", icon: LayoutDashboard },
  { label: "DSA Tracker", path: "/app/dsa", icon: Code2 },
  { label: "Aptitude", path: "/app/aptitude", icon: Calculator },
  { label: "Resume Builder", path: "/app/resume", icon: FileText },
  { label: "Mock Interview", path: "/app/interview", icon: Mic },
  { label: "AI Assistant", path: "/app/assistant", icon: Bot },
  { label: "Study Planner", path: "/app/planner", icon: CalendarDays },
  { label: "Analytics", path: "/app/analytics", icon: BarChart3 },
  { label: "Leaderboard", path: "/app/leaderboard", icon: Trophy },
];

const bottomItems = [
  { label: "Profile", path: "/app/profile", icon: User },
  { label: "Settings", path: "/app/settings", icon: Settings },
];

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <motion.aside
        animate={{ width: collapsed ? 76 : 248 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed z-50 flex h-screen flex-col border-r border-bg-border bg-bg-card/80 backdrop-blur-xl md:sticky md:top-0 md:translate-x-0",
          "transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-bg-border px-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-glow">
            <Zap size={16} className="text-white" />
          </div>
          {!collapsed && <span className="text-lg font-bold text-text">PrepFlow</span>}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive ? "bg-primary/10 text-primary" : "text-text-muted hover:bg-white/5 hover:text-text"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 h-6 w-1 rounded-r-full bg-primary"
                    />
                  )}
                  <item.icon size={18} className="shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-1 border-t border-bg-border px-3 py-4">
          {bottomItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive ? "bg-primary/10 text-primary" : "text-text-muted hover:bg-white/5 hover:text-text"
                )
              }
            >
              <item.icon size={18} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="hidden w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-white/5 hover:text-text md:flex"
          >
            {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
