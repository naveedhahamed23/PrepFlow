import { motion } from "framer-motion";
import { Flame, Target, Trophy } from "lucide-react";

export default function LevelCard({ level, xp, maxXp, streak, goalsActive, rank }) {
  const progress = Math.min((xp / maxXp) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-4 flex h-full w-full flex-col justify-between shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] card-hover"
    >
      {/* Level header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4F46E5]/20 text-[#818cf8]">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-[#F0F4FF]">Level {level}</p>
            <p className="text-[10px] text-[#4A6080]">{xp.toLocaleString()} / {maxXp.toLocaleString()} XP</p>
          </div>
        </div>
      </div>

      {/* XP Progress bar */}
      <div className="mb-4">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1E2D45]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#818cf8] transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-0 divide-x divide-[#1E2D45]">
        <div className="flex flex-col items-center gap-0.5 pr-2">
          <div className="flex items-center gap-1 text-sm font-bold text-[#F0F4FF]">
            <Flame size={13} className="text-[#EF4444]" /> {streak}
          </div>
          <p className="text-[9px] uppercase tracking-wide text-[#4A6080]">Day Streak</p>
        </div>
        <div className="flex flex-col items-center gap-0.5 px-2">
          <div className="flex items-center gap-1 text-sm font-bold text-[#F0F4FF]">
            <Target size={13} className="text-[#C8D8F0]" /> {goalsActive}
          </div>
          <p className="text-[9px] uppercase tracking-wide text-[#4A6080]">Goals Active</p>
        </div>
        <div className="flex flex-col items-center gap-0.5 pl-2">
          <div className="flex items-center gap-1 text-sm font-bold text-[#F0F4FF]">
            <Trophy size={13} className="text-[#F59E0B]" /> #{rank}
          </div>
          <p className="text-[9px] uppercase tracking-wide text-[#4A6080]">Global Rank</p>
        </div>
      </div>
    </motion.div>
  );
}
