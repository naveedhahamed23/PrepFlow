import { useState } from "react";
import { Search, Check, Loader2 } from "lucide-react";
import Avatar from "../ui/Avatar";
import followService from "../../services/followService";
import { cn } from "../../utils/cn";

export default function FindFriendsCard({
  users = [],
  currentUserId,
  onFollowChange,
  onOpenProfile,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingMap, setLoadingMap] = useState({});

  // Filter users based on searchQuery and exclude self
  const displayUsers = users
    .filter(
      (u) =>
        u.id !== currentUserId &&
        !u.isCurrentUser &&
        (u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.college.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .slice(0, 5);

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
    <div className="rounded-xl border border-[#1E2D45] bg-[#0D1424] p-5 shadow-sm min-w-0">
      <h3 className="text-base font-bold text-white">Find Friends</h3>

      {/* Search Input matching reference */}
      <div className="relative mt-3">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by username..."
          className="w-full rounded-xl border border-[#1E2D45] bg-[#070C16] pl-9 pr-3 py-2 text-xs text-white placeholder-text-muted focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* User list */}
      <div className="mt-3.5 space-y-3">
        {displayUsers.length === 0 ? (
          <p className="py-3 text-center text-xs text-text-muted">
            No users found.
          </p>
        ) : (
          displayUsers.map((user) => {
            const isFollowing = followService.isFollowing(
              currentUserId,
              user.id
            );
            const isLoading = loadingMap[user.id];

            return (
              <div
                key={user.id}
                className="flex items-center justify-between gap-2 min-w-0"
              >
                {/* Avatar & User Details */}
                <div
                  onClick={() => onOpenProfile && onOpenProfile(user)}
                  className="flex items-center gap-2.5 min-w-0 cursor-pointer group"
                >
                  <Avatar
                    src={user.avatar}
                    name={user.username}
                    size="sm"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-white group-hover:text-blue-400">
                      {user.username}
                    </p>
                    <p className="truncate text-[10px] text-text-muted">
                      {user.college}
                    </p>
                  </div>
                </div>

                {/* Follow Button */}
                <button
                  onClick={() => handleToggleFollow(user)}
                  disabled={isLoading}
                  className={cn(
                    "flex shrink-0 items-center justify-center gap-1 rounded-xl px-3 py-1 text-xs font-semibold transition-all",
                    isFollowing
                      ? "border border-blue-500/40 bg-blue-500/10 text-blue-300 hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-300"
                      : "border border-blue-500/30 bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white"
                  )}
                >
                  {isLoading ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : isFollowing ? (
                    <>
                      <Check size={12} strokeWidth={3} />
                      <span>Following</span>
                    </>
                  ) : (
                    <span>Follow</span>
                  )}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
