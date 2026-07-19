import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

export default function Modal({ open, onClose, title, children, size = "md", footer }) {
  const sizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn("glass-strong relative w-full rounded-2xl border border-bg-border p-6 shadow-card", sizes[size])}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text">{title}</h3>
              <button onClick={onClose} className="rounded-lg p-1.5 text-text-muted hover:bg-white/5 hover:text-text">
                <X size={18} />
              </button>
            </div>
            <div>{children}</div>
            {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function Drawer({ open, onClose, title, children, side = "right" }) {
  const slideFrom = side === "right" ? { x: "100%" } : { x: "-100%" };
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={slideFrom}
            animate={{ x: 0 }}
            exit={slideFrom}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "glass-strong relative ml-auto flex h-full w-full max-w-md flex-col border-l border-bg-border p-6",
              side === "left" && "mr-auto ml-0 border-l-0 border-r"
            )}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text">{title}</h3>
              <button onClick={onClose} className="rounded-lg p-1.5 text-text-muted hover:bg-white/5 hover:text-text">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
