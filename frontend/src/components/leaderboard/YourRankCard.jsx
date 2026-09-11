import Avatar from "../ui/Avatar";
import { motion } from "framer-motion";

export default function YourRankCard({ currentUser }) {
  if (!currentUser) return null;

  const xpCurrent = currentUser.xp || 1980;
  const xpTarget = currentUser.nextLevelXp || 2200;
  const xpPct = Math.min(100, Math.round((xpCurrent / xpTarget) * 100));

  return (
    <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm min-w-0">
      {/* Header matching screenshot */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white">Your Rank</h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-black text-white">#4</span>
          <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/30">
            Top 1%
          </span>
        </div>
      </div>

      {/* User Info Avatar & Level */}
      <div className="mt-4 flex flex-col items-center text-center">
        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-blue-500/20">
            <Avatar
              src={currentUser.avatar}
              name={currentUser.displayName || currentUser.username}
              size="lg"
            />
          </div>
          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-[#0D1424]" />
        </div>

        <h4 className="mt-2.5 text-base font-bold text-white">
          {currentUser.displayName || currentUser.username}
        </h4>
        <p className="text-xs text-text-muted">{currentUser.college || "VIT Chennai"}</p>

        {/* Level Badge */}
        <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-0.5 text-xs font-bold text-purple-300">
          ⭐ Level {currentUser.level || 14}
        </span>

        {/* XP Progress Bar */}
        <div className="mt-3 w-full">
          <div className="flex justify-between text-[11px] font-semibold text-text-muted mb-1">
            <span>Progress to Lvl {(currentUser.level || 14) + 1}</span>
            <span className="text-blue-400">
              {xpCurrent.toLocaleString()} / {xpTarget.toLocaleString()} XP
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#162238]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpPct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-500"
            />
          </div>
        </div>
      </div>

      {/* 4 Stat Tiles matching screenshot */}
      <div className="mt-5 grid grid-cols-4 gap-2 border-t border-[#1E2D45] pt-4 text-center">
        <div>
          <span className="block text-sm font-extrabold text-white">
            {currentUser.problemsSolved || 142}
          </span>
          <span className="text-[10px] font-medium text-text-muted">Problems</span>
        </div>

        <div>
          <span className="block text-sm font-extrabold text-white">
            {currentUser.studyHours || 64}h
          </span>
          <span className="text-[10px] font-medium text-text-muted">Study Time</span>
        </div>

        <div>
          <span className="block text-sm font-extrabold text-white">
            {currentUser.interviews || 8}
          </span>
          <span className="text-[10px] font-medium text-text-muted">Interviews</span>
        </div>

        <div>
          <span className="block text-sm font-extrabold text-white">
            {currentUser.streak || 12}
          </span>
          <span className="text-[10px] font-medium text-text-muted">Day Streak</span>
        </div>
      </div>
    </div>
  );
}
