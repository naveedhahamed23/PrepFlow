import { useState } from "react";
import { Menu, Search, Bell, Command } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCommandPalette } from "../../context/CommandPaletteContext";
import Avatar from "../ui/Avatar";
import NotificationCenter from "./NotificationCenter";

export default function Topbar({ onMenuClick }) {
  const { user } = useAuth();
  const { setOpen } = useCommandPalette();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-bg-border bg-bg/80 px-4 backdrop-blur-xl md:px-6">
      <button onClick={onMenuClick} className="rounded-lg p-2 text-text-muted hover:bg-white/5 md:hidden">
        <Menu size={20} />
      </button>

      <button
        onClick={() => setOpen(true)}
        className="hidden flex-1 max-w-sm items-center gap-2 rounded-xl border border-bg-border bg-bg-card px-3.5 py-2 text-sm text-text-muted hover:bg-bg-hover md:flex"
      >
        <Search size={15} />
        <span className="flex-1 text-left">Search PrepFlow...</span>
        <kbd className="flex items-center gap-0.5 rounded border border-bg-border px-1.5 py-0.5 text-[10px]">
          <Command size={10} />K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 text-text-muted hover:bg-white/5 md:hidden"
        >
          <Search size={18} />
        </button>

        <div className="relative">
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className="relative rounded-lg p-2 text-text-muted hover:bg-white/5 hover:text-text"
          >
            <Bell size={18} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger ring-2 ring-bg" />
          </button>
          <NotificationCenter open={notifOpen} onClose={() => setNotifOpen(false)} />
        </div>

        <div className="hidden items-center gap-2 rounded-xl border border-bg-border bg-bg-card px-2.5 py-1.5 text-xs text-text-muted sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-warning" />
          {user?.streak ?? 0} day streak
        </div>

        <Avatar src={user?.avatar} name={user?.name} size="sm" online />
      </div>
    </header>
  );
}
