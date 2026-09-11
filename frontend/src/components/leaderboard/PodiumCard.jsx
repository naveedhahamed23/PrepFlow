import { useState } from "react";
import { Check, UserPlus, Loader2 } from "lucide-react";
import Avatar from "../ui/Avatar";
import followService from "../../services/followService";
import { cn } from "../../utils/cn";

export default function PodiumCard({
  top3 = [],
  currentUserId,
  onFollowChange,
  onOpenProfile,
}) {
  const [loadingMap, setLoadingMap] = useState({});

  if (!top3 || top3.length === 0) return null;

  // Render top 3 in order: #2 (left), #1 (center), #3 (right)
  const rank1 = top3[0];
  const rank2 = top3[1];
  const rank3 = top3[2];

  const handleToggleFollow = async (user) => {
    if (!user || user.id === currentUserId || loadingMap[user.id]) return;

    setLoadingMap((prev) => ({ ...prev, [user.id]: true }));

    const isFollowing = followService.isFollowing(currentUserId, user.id);
    try {
      if (isFollowing) {
        await followService.unfollowUser(currentUserId, user.id);
      } else {
        await followService.followUser(currentUserId, user.id);
      }
      if (onFollowChange) onFollowChange();
    } catch (e) {
      console.error("Follow error:", e);
    } finally {
      setLoadingMap((prev) => ({ ...prev, [user.id]: false }));
    }
  };

  const renderCard = (user, rank, variant) => {
    if (!user) return null;

    const isSelf = user.id === currentUserId;
    const isFollowing = followService.isFollowing(currentUserId, user.id);
    const isLoading = loadingMap[user.id];

    // Styling constants by rank
    const configs = {
      1: {
        badgeBg: "bg-amber-500 text-black font-extrabold shadow-lg shadow-amber-500/30",
        border: "border-amber-500/40 hover:border-amber-500/70 bg-gradient-to-b from-amber-500/10 via-[#0D1424] to-[#070C16]",
        levelBadge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        followBtn: isFollowing
          ? "border-amber-500/50 bg-amber-500/10 text-amber-300 font-semibold"
          : "bg-amber-500 hover:bg-amber-400 text-black font-bold",
      },
      2: {
        badgeBg: "bg-slate-300 text-black font-bold shadow-md shadow-slate-300/20",
        border: "border-[#1E2D45] hover:border-slate-400/40 bg-[#0D1424]",
        levelBadge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        followBtn: isFollowing
          ? "border-blue-500/50 bg-blue-500/10 text-blue-300 font-semibold"
          : "border border-blue-500/50 bg-blue-600/20 hover:bg-blue-600 text-white font-semibold",
      },
      3: {
        badgeBg: "bg-amber-700 text-white font-bold shadow-md shadow-amber-700/20",
        border: "border-[#1E2D45] hover:border-amber-700/40 bg-[#0D1424]",
        levelBadge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        followBtn: isFollowing
          ? "border-blue-500/50 bg-blue-500/10 text-blue-300 font-semibold"
          : "border border-blue-500/50 bg-blue-600/20 hover:bg-blue-600 text-white font-semibold",
      },
    };

    const cfg = configs[rank];

    return (
      <div
        key={user.id}
        className={cn(
          "relative flex flex-col items-center rounded-2xl border p-4 sm:p-5 transition-all shadow-md min-w-0 flex-1",
          cfg.border,
          rank === 1 ? "lg:-translate-y-2 z-10" : ""
        )}
      >
        {/* Hexagonal Rank Badge matching screenshot */}
        <div
          className={cn(
            "absolute -top-3.5 flex h-7 w-7 items-center justify-center rounded-lg text-xs tracking-wider",
            cfg.badgeBg
          )}
        >
          {rank}
        </div>

        {/* User Avatar & Online Dot */}
        <div
          onClick={() => onOpenProfile && onOpenProfile(user)}
          className="relative mt-2 cursor-pointer transition-transform hover:scale-105"
        >
          <Avatar src={user.avatar} name={user.username} size={rank === 1 ? "lg" : "md"} />
          {user.isOnline && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-[#0D1424]" />
          )}
        </div>

        {/* User Info */}
        <div className="mt-2 text-center">
          <div className="flex items-center justify-center gap-1">
            <h4
              onClick={() => onOpenProfile && onOpenProfile(user)}
              className="cursor-pointer font-bold text-white text-sm hover:text-blue-400 truncate max-w-[120px]"
            >
              {user.username}
            </h4>
            {user.isOnline && (
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            )}
          </div>
          <p className="text-[11px] text-text-muted truncate max-w-[130px]">{user.college}</p>

          {/* Level Pill */}
          <span className={cn("mt-1.5 inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold", cfg.levelBadge)}>
            ⭐ Level {user.level}
          </span>
        </div>

        {/* Stats Grid matching screenshot */}
        <div className="mt-4 grid w-full grid-cols-3 gap-1 border-t border-[#1E2D45]/60 pt-3 text-center text-xs">
          <div>
            <span className="block font-bold text-white text-xs">{user.xp?.toLocaleString()}</span>
            <span className="text-[10px] text-text-muted">XP</span>
          </div>
          <div>
            <span className="block font-bold text-white text-xs">{user.problemsSolved}</span>
            <span className="text-[10px] text-text-muted">Problems</span>
          </div>
          <div>
            <span className="block font-bold text-white text-xs">{user.streak}</span>
            <span className="text-[10px] text-text-muted">Day Streak</span>
          </div>
        </div>

        {/* Follow CTA */}
        {!isSelf ? (
          <button
            onClick={() => handleToggleFollow(user)}
            disabled={isLoading}
            className={cn(
              "mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs transition-all",
              cfg.followBtn
            )}
          >
            {isLoading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : isFollowing ? (
              <>
                <Check size={14} strokeWidth={3} />
                <span>Following</span>
              </>
            ) : (
              <span>Follow</span>
            )}
          </button>
        ) : (
          <div className="mt-4 w-full py-1 text-center text-xs font-semibold text-blue-400">
            (Your Position)
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3 min-w-0">
      {/* Order: Rank 2 (Left), Rank 1 (Center), Rank 3 (Right) */}
      {renderCard(rank2, 2)}
      {renderCard(rank1, 1)}
      {renderCard(rank3, 3)}
    </div>
  );
}
