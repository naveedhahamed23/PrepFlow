import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCheck, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import userService from "../../services/userService";

const ICONS = { warning: AlertTriangle, success: CheckCircle2, info: Info };
const COLORS = { warning: "text-warning", success: "text-success", info: "text-primary" };

export default function NotificationCenter({ open, onClose }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (open) {
      userService.getNotifications().then(({ data }) => setItems(data));
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="glass-strong absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-bg-border shadow-card sm:w-96"
          >
            <div className="flex items-center justify-between border-b border-bg-border px-4 py-3">
              <h4 className="text-sm font-semibold text-text">Notifications</h4>
              <button className="flex items-center gap-1 text-xs text-primary hover:underline">
                <CheckCheck size={12} /> Mark all read
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {items.map((n) => {
                const Icon = ICONS[n.type] || Info;
                return (
                  <div
                    key={n.id}
                    className={`flex gap-3 border-b border-bg-border/60 px-4 py-3 last:border-0 hover:bg-white/5 ${
                      !n.read && "bg-primary/[0.03]"
                    }`}
                  >
                    <Icon size={16} className={`mt-0.5 shrink-0 ${COLORS[n.type]}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-text">{n.title}</p>
                      <p className="mt-0.5 text-xs text-text-muted line-clamp-2">{n.message}</p>
                      <p className="mt-1 text-[11px] text-text-muted/70">{n.time}</p>
                    </div>
                    {!n.read && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
