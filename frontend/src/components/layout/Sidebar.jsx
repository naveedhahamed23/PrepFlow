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
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          // Deep navy sidebar with blue atmospheric gradient — matches reference
          "fixed z-50 flex h-screen flex-col md:sticky md:top-0 md:translate-x-0",
          "border-r border-[#1A2840]",
          "transition-transform duration-300 overflow-hidden",
          // Sidebar background: slightly lighter than body, with blue atmosphere
          "bg-[#080E1E]",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(37,99,235,0.08) 0%, transparent 40%), linear-gradient(180deg, transparent 60%, rgba(15,30,70,0.3) 100%)",
        }}
      >
        {/* Logo area */}
        <div className="flex h-14 shrink-0 items-center gap-2.5 border-b border-[#1A2840] px-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#2563EB] shadow-[0_0_16px_rgba(59,130,246,0.5)]">
            <Zap size={16} className="text-white" />
          </div>
          {!collapsed && <span className="text-base font-bold text-[#F0F4FF] tracking-tight">PrepFlow</span>}
        </div>

        {/* Nav items */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-all duration-150",
                  isActive
                    // Active: solid blue pill with glow — matches reference exactly
                    ? "bg-[#2563EB] text-white shadow-[0_0_12px_rgba(37,99,235,0.5)]"
                    : "text-[#7B91B0] hover:bg-[#0F1A30] hover:text-[#C8D8F0]"
                )
              }
            >
              <item.icon size={16} className="shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Motivational card — navy with mountain SVG */}
        {!collapsed && (
          <div className="mx-3 mb-3 overflow-hidden rounded-xl relative sidebar-promo p-3">
            <p className="relative z-10 text-[11px] font-medium leading-4 text-[#C8D8F0]">
              Small steps every day lead to big placements.
            </p>
            <div className="absolute -bottom-1 -right-1 opacity-60">
              <svg width="72" height="48" viewBox="0 0 72 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 48L36 16L52 32L65 20L80 48H12Z" fill="#1E3A8A" />
                <path d="M0 48L18 28L32 40L50 10L72 48H0Z" fill="#2563EB" opacity="0.7" />
              </svg>
            </div>
          </div>
        )}

        {/* Profile / Settings / Collapse */}
        <div className="space-y-0.5 border-t border-[#1A2840] px-2 py-3">
          {bottomItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-all",
                  isActive
                    ? "bg-[#2563EB] text-white shadow-[0_0_12px_rgba(37,99,235,0.5)]"
                    : "text-[#7B91B0] hover:bg-[#0F1A30] hover:text-[#C8D8F0]"
                )
              }
            >
              <item.icon size={16} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="hidden w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-[#7B91B0] hover:bg-[#0F1A30] hover:text-[#C8D8F0] md:flex transition-colors"
          >
            {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
