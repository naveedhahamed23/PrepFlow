import Modal from "../ui/Modal";
import { Trophy, Flame, Mic, Award, CheckCircle2, Lock } from "lucide-react";
import { ACHIEVEMENTS } from "../../data/leaderboardData";

const ICON_MAP = { Trophy, Flame, Mic, Award };

export default function AchievementsModal({ open, onClose }) {
  const allAchievements = [
    ...ACHIEVEMENTS.map((a) => ({ ...a, unlocked: true })),
    {
      id: "ach-5",
      title: "500 Problems",
      description: "Solve 500 DSA questions",
      icon: "Trophy",
      color: "#64748B",
      bg: "rgba(100, 116, 139, 0.1)",
      unlocked: false,
    },
    {
      id: "ach-6",
      title: "30 Day Streak",
      description: "Maintain a 30-day streak",
      icon: "Flame",
      color: "#64748B",
      bg: "rgba(100, 116, 139, 0.1)",
      unlocked: false,
    },
  ];

  return (
    <Modal open={open} onClose={onClose} title="Your Achievements" size="md">
      <div className="space-y-3 text-xs">
        <p className="text-text-muted">
          Earn badges by solving problems, keeping your streak, and practicing interviews.
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
          {allAchievements.map((item) => {
            const IconComp = ICON_MAP[item.icon] || Trophy;
            return (
              <div
                key={item.id}
                className={`flex items-center gap-3 rounded-xl border p-3 ${
                  item.unlocked
                    ? "border-[#1E2D45] bg-[#0D1424]"
                    : "border-[#1E2D45]/40 bg-[#070C16]/50 opacity-60"
                }`}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold"
                  style={{
                    backgroundColor: item.unlocked ? item.bg : "rgba(255,255,255,0.05)",
                    color: item.unlocked ? item.color : "#64748B",
                  }}
                >
                  <IconComp size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white truncate">{item.title}</h4>
                    {item.unlocked ? (
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    ) : (
                      <Lock size={13} className="text-text-muted shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-text-muted mt-0.5 truncate">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
