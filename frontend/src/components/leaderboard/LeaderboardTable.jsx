import { useState } from "react";
import { Check, Flame, MoreVertical, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import Avatar from "../ui/Avatar";
import followService from "../../services/followService";
import { cn } from "../../utils/cn";

export default function LeaderboardTable({
  users = [],
  currentUserId,
  totalUsers = 1248,
  totalPages = 125,
  currentPage = 1,
  onPageChange,
  onFollowChange,
  onOpenProfile,
  onEditProfile,
}) {
  const [loadingMap, setLoadingMap] = useState({});

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

  return (
    <div className="rounded-2xl border border-[#1E2D45] bg-[#0D1424] shadow-sm min-w-0">
      {/* Responsive Table Wrapper */}
      <div className="w-full overflow-x-auto custom-scrollbar">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#1E2D45] text-text-muted font-semibold bg-[#070C16]/60">
              <th className="py-3.5 pl-4 pr-2 font-semibold">#</th>
              <th className="py-3.5 px-3 font-semibold">User</th>
              <th className="py-3.5 px-3 font-semibold">Level</th>
              <th className="py-3.5 px-3 font-semibold">XP</th>
              <th className="py-3.5 px-3 font-semibold">Problems</th>
              <th className="py-3.5 px-3 font-semibold">Study Hours</th>
              <th className="py-3.5 px-3 font-semibold">Interviews</th>
              <th className="py-3.5 px-3 font-semibold">Streak</th>
              <th className="py-3.5 pr-4 pl-3 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E2D45]/60 text-white">
            {users.map((row) => {
              const isSelf = row.id === currentUserId || row.isCurrentUser;
              const isFollowing = followService.isFollowing(currentUserId, row.id);
              const isLoading = loadingMap[row.id];

              return (
                <tr
                  key={row.id}
                  className={cn(
                    "transition-colors hover:bg-white/5",
                    isSelf ? "bg-blue-950/20 border-l-4 border-l-blue-500" : ""
                  )}
                >
                  {/* Rank */}
                  <td className="py-3.5 pl-4 pr-2 font-bold text-text-muted">
                    {row.rank}
                  </td>

                  {/* User (Avatar, Name, College, (you) badge) */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        onClick={() => onOpenProfile && onOpenProfile(row)}
                        className="cursor-pointer transition-transform hover:scale-105"
                      >
                        <Avatar src={row.avatar} name={row.username} size="sm" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            onClick={() => onOpenProfile && onOpenProfile(row)}
                            className="font-bold text-white hover:text-blue-400 cursor-pointer truncate"
                          >
                            {row.username}
                          </span>
                          {isSelf && (
                            <span className="text-[10px] font-semibold text-blue-400">
                              (you)
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-text-muted truncate">
                          {row.college}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Level Pill */}
                  <td className="py-3.5 px-3">
                    <span className="inline-flex h-6 items-center rounded-full bg-blue-500/10 px-2.5 text-[11px] font-bold text-blue-400 border border-blue-500/20">
                      {row.level}
                    </span>
                  </td>

                  {/* XP */}
                  <td className="py-3.5 px-3 font-bold text-white">
                    {row.xp?.toLocaleString()}
                  </td>

                  {/* Problems */}
                  <td className="py-3.5 px-3 font-semibold text-text-muted">
                    {row.problemsSolved}
                  </td>

                  {/* Study Hours */}
                  <td className="py-3.5 px-3 font-semibold text-text-muted">
                    {row.studyHours}h
                  </td>

                  {/* Interviews */}
                  <td className="py-3.5 px-3 font-semibold text-text-muted">
                    {row.interviews}
                  </td>

                  {/* Streak */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1 font-bold text-orange-400">
                      <span>{row.streak}</span>
                      <Flame size={14} fill="currentColor" />
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 pr-4 pl-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {isSelf ? (
                        <button
                          onClick={onEditProfile}
                          className="rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-500 transition-all"
                        >
                          Edit Profile
                        </button>
                      ) : (
                        <button
                          onClick={() => handleToggleFollow(row)}
                          disabled={isLoading}
                          className={cn(
                            "flex min-w-[90px] items-center justify-center gap-1 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all",
                            isFollowing
                              ? "border border-blue-500/40 bg-blue-500/10 text-blue-300 hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-300"
                              : "border border-blue-500/30 bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white"
                          )}
                        >
                          {isLoading ? (
                            <Loader2 size={13} className="animate-spin" />
                          ) : isFollowing ? (
                            <>
                              <Check size={13} strokeWidth={3} />
                              <span>Following</span>
                            </>
                          ) : (
                            <span>Follow</span>
                          )}
                        </button>
                      )}

                      <button
                        onClick={() => onOpenProfile && onOpenProfile(row)}
                        className="rounded-lg p-1.5 text-text-muted hover:bg-white/10 hover:text-white"
                      >
                        <MoreVertical size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer Pagination */}
      <div className="flex flex-col items-center justify-between gap-3 border-t border-[#1E2D45] p-4 sm:flex-row text-xs text-text-muted">
        <div>
          Showing 1–{users.length} of {totalUsers.toLocaleString()} users
        </div>

        {/* Page Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onPageChange && onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#1E2D45] bg-[#070C16] text-text-muted hover:text-white disabled:opacity-40"
          >
            <ChevronLeft size={14} />
          </button>

          {[1, 2, 3, 4, 5].map((pNum) => (
            <button
              key={pNum}
              onClick={() => onPageChange && onPageChange(pNum)}
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-lg font-semibold text-xs transition-all",
                currentPage === pNum
                  ? "bg-blue-600 text-white font-bold"
                  : "border border-[#1E2D45] bg-[#070C16] text-text-muted hover:text-white"
              )}
            >
              {pNum}
            </button>
          ))}

          <span className="px-1 text-text-muted">...</span>

          <button
            onClick={() => onPageChange && onPageChange(totalPages)}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-lg font-semibold text-xs border border-[#1E2D45] bg-[#070C16] text-text-muted hover:text-white",
              currentPage === totalPages && "bg-blue-600 text-white"
            )}
          >
            {totalPages}
          </button>

          <button
            onClick={() => onPageChange && onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#1E2D45] bg-[#070C16] text-text-muted hover:text-white disabled:opacity-40"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
