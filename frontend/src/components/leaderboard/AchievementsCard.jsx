import { useState } from "react";
import { Trophy, Flame, Mic, Award } from "lucide-react";
import { ACHIEVEMENTS } from "../../data/leaderboardData";
import AchievementsModal from "./AchievementsModal";

const ICON_MAP = { Trophy, Flame, Mic, Award };

export default function AchievementsCard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Achievements</h3>
          <button
            onClick={() => setModalOpen(true)}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            View All
          </button>
        </div>

        {/* 4 Hexagonal/Rounded Badge Icons matching reference */}
        <div className="mt-4 grid grid-cols-4 gap-2 text-center">
          {ACHIEVEMENTS.map((item) => {
            const IconComp = ICON_MAP[item.icon] || Trophy;
            return (
              <div
                key={item.id}
                onClick={() => setModalOpen(true)}
                className="group flex flex-col items-center cursor-pointer"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#1E2D45] transition-transform group-hover:scale-105"
                  style={{
                    backgroundColor: item.bg,
                    color: item.color,
                  }}
                >
                  <IconComp size={20} />
                </div>
                <span className="mt-1.5 line-clamp-2 text-[10px] font-semibold text-white leading-tight">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <AchievementsModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
