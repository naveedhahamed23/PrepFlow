import { useState } from "react";
import Modal from "../ui/Modal";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import { Check, Flame, Trophy, Code2, Clock, Mic, Loader2, Users } from "lucide-react";
import followService from "../../services/followService";
import { cn } from "../../utils/cn";

export default function UserProfileModal({
  user,
  open,
  onClose,
  currentUserId,
  onFollowChange,
}) {
  const [isLoading, setIsLoading] = useState(false);

  if (!user) return null;

  const isSelf = user.id === currentUserId || user.isCurrentUser;
  const isFollowing = followService.isFollowing(currentUserId, user.id);
  const isMutual = followService.isMutualFriend(currentUserId, user.id);

  const handleToggleFollow = async () => {
    if (isSelf || isLoading) return;
    setIsLoading(true);

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
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="User Profile" size="sm">
      <div className="flex flex-col items-center py-2 text-xs">
        {/* Avatar */}
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 via-purple-600 to-amber-500 p-0.5 shadow-lg">
            <Avatar src={user.avatar} name={user.username} size="lg" />
          </div>
          {user.isOnline && (
            <span className="absolute bottom-0 right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-[#0D1424]" />
          )}
        </div>

        {/* User details */}
        <h3 className="mt-3 text-lg font-bold text-white">
          {user.displayName || user.username}
        </h3>
        <p className="text-xs font-medium text-blue-400">@{user.username}</p>
        <p className="text-xs text-text-muted mt-0.5">{user.college}</p>

        {/* Level & Mutual Badge */}
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-0.5 font-bold text-purple-300">
            ⭐ Level {user.level || 10}
          </span>
          {isMutual && (
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 font-bold text-emerald-400 flex items-center gap-1">
              <Users size={12} /> Mutual Friend
            </span>
          )}
        </div>

        {/* Stats Grid */}
        <div className="mt-5 grid w-full grid-cols-4 gap-2 rounded-xl border border-[#1E2D45] bg-[#070C16] p-3 text-center">
          <div>
            <span className="block text-sm font-extrabold text-white">
              {user.xp?.toLocaleString()}
            </span>
            <span className="text-[10px] text-text-muted">XP</span>
          </div>
          <div>
            <span className="block text-sm font-extrabold text-white">
              {user.problemsSolved || 0}
            </span>
            <span className="text-[10px] text-text-muted">Solved</span>
          </div>
          <div>
            <span className="block text-sm font-extrabold text-white">
              {user.studyHours || 0}h
            </span>
            <span className="text-[10px] text-text-muted">Study</span>
          </div>
          <div>
            <span className="block text-sm font-extrabold text-white flex items-center justify-center gap-0.5 text-orange-400">
              {user.streak || 0} <Flame size={12} fill="currentColor" />
            </span>
            <span className="text-[10px] text-text-muted">Streak</span>
          </div>
        </div>

        {/* Follow CTA */}
        {!isSelf ? (
          <Button
            onClick={handleToggleFollow}
            disabled={isLoading}
            className={cn(
              "mt-5 w-full font-bold transition-all",
              isFollowing
                ? "border border-blue-500/40 bg-blue-500/10 text-blue-300 hover:bg-rose-500/10 hover:text-rose-300"
                : "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20"
            )}
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : isFollowing ? (
              <>
                <Check size={16} strokeWidth={3} className="mr-1.5 inline" />
                Following
              </>
            ) : (
              "Follow"
            )}
          </Button>
        ) : (
          <div className="mt-4 text-xs font-semibold text-text-muted">
            This is your profile
          </div>
        )}
      </div>
    </Modal>
  );
}
