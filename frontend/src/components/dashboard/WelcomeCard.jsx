import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export default function WelcomeCard({ userName, streak }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/15 via-bg-card to-bg-card p-6 sm:p-8"
    >
      <div className="pointer-events-none absolute -top-16 right-0 h-56 w-56 rounded-full bg-primary/20 blur-[90px]" />
      <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-text sm:text-3xl">
            Welcome back, {userName?.split(" ")[0] || "Student"}
          </h2>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-text-muted">
            <Flame size={15} className="text-warning" />
            You&apos;re on a {streak ?? 0}-day streak.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
