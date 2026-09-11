import { useState } from "react";
import { Menu, Search, Bell, Command, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCommandPalette } from "../../context/CommandPaletteContext";
import Avatar from "../ui/Avatar";
import NotificationCenter from "./NotificationCenter";

export default function Topbar({ onMenuClick }) {
  const { user } = useAuth();
  const { setOpen } = useCommandPalette();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-[#1A2840] px-3 backdrop-blur-xl md:px-5"
      style={{ backgroundColor: "rgba(8, 12, 20, 0.92)" }}
    >
      <button onClick={onMenuClick} className="rounded-lg p-2 text-[#7B91B0] hover:bg-[#0F1A30] hover:text-[#C8D8F0] md:hidden">
        <Menu size={20} />
      </button>

      {/* Search bar — dark navy with blue-tinted border */}
      <button
        onClick={() => setOpen(true)}
        className="hidden flex-1 max-w-md items-center gap-2 rounded-xl border border-[#1E3060] bg-[#090F1E] px-3.5 py-2 text-sm text-[#7B91B0] transition-colors hover:border-[#2563EB]/40 focus:outline-none md:flex"
      >
        <Search size={14} className="shrink-0" />
        <span className="flex-1 text-left text-[13px]">Search problems, topics, interviews...</span>
        <kbd className="flex items-center gap-0.5 rounded border border-[#1E2D45] bg-[#0D1424] px-1.5 py-0.5 text-[10px] text-[#4A6080]">
          <Command size={9} />K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-2 md:gap-2.5">
        {/* Mobile search */}
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 text-[#7B91B0] hover:bg-[#0F1A30] hover:text-[#C8D8F0] md:hidden"
        >
          <Search size={18} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className="relative rounded-lg p-2 text-[#7B91B0] hover:bg-[#0F1A30] hover:text-[#C8D8F0] transition-colors"
          >
            <Bell size={18} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#EF4444] ring-2 ring-[#080C14]" />
          </button>
          <NotificationCenter open={notifOpen} onClose={() => setNotifOpen(false)} />
        </div>

        {/* Streak badge — matches reference flame + count styling */}
        <div className="hidden items-center gap-1.5 rounded-xl border border-[#F59E0B]/25 bg-[#F59E0B]/10 px-3 py-1.5 text-xs font-semibold text-[#F59E0B] sm:flex">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B" stroke="none">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
          </svg>
          {user?.streak ?? 12} day streak
        </div>

        {/* User profile */}
        <button className="flex items-center gap-2 rounded-xl border border-[#1E2D45] bg-[#0D1424] px-2.5 py-1.5 transition-colors hover:border-[#2563EB]/30 hover:bg-[#0F1A30]">
          <Avatar src={user?.avatar} name={user?.name ?? "Naveedh"} size="sm" online />
          <span className="hidden text-xs font-medium text-[#C8D8F0] sm:block">
            {user?.name?.split(" ")[0] ?? "Naveedh"}
          </span>
          <ChevronDown size={12} className="text-[#4A6080]" />
        </button>
      </div>
    </header>
  );
}
