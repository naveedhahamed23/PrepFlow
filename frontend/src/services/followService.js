import { INITIAL_FOLLOWS } from "../data/leaderboardData";

const STORAGE_KEY = "prepflow_follows_v1";

/**
 * Service handling user follow/unfollow relationships.
 * Enforces one-way relationship constraints:
 * - followerId != followingId
 * - UNIQUE(followerId, followingId)
 *
 * Prepared for future Spring Boot endpoints:
 * POST /api/users/{userId}/follow
 * DELETE /api/users/{userId}/follow
 * GET /api/users/{userId}/following-status
 * GET /api/users/{userId}/followers
 * GET /api/users/{userId}/following
 */
export const followService = {
  getFollows: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error reading follows from storage:", e);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_FOLLOWS));
    return INITIAL_FOLLOWS;
  },

  saveFollows: (follows) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(follows));
    } catch (e) {
      console.error("Error saving follows:", e);
    }
  },

  isFollowing: (followerId, followingId) => {
    if (!followerId || !followingId || followerId === followingId) return false;
    const follows = followService.getFollows();
    return follows.some(
      (f) => f.followerId === followerId && f.followingId === followingId
    );
  },

  followUser: async (followerId, followingId) => {
    // Simulate brief network latency for realistic state transition
    await new Promise((res) => setTimeout(res, 200));

    if (!followerId || !followingId || followerId === followingId) {
      throw new Error("Invalid follow request or self-follow prohibited.");
    }

    const follows = followService.getFollows();
    const exists = follows.some(
      (f) => f.followerId === followerId && f.followingId === followingId
    );

    if (exists) return follows; // Already following, no duplicate allowed

    const newFollow = {
      id: `f-${Date.now()}`,
      followerId,
      followingId,
      createdAt: new Date().toISOString(),
    };

    const updated = [newFollow, ...follows];
    followService.saveFollows(updated);
    return updated;
  },

  unfollowUser: async (followerId, followingId) => {
    // Simulate brief network latency for realistic state transition
    await new Promise((res) => setTimeout(res, 200));

    const follows = followService.getFollows();
    const updated = follows.filter(
      (f) => !(f.followerId === followerId && f.followingId === followingId)
    );
    followService.saveFollows(updated);
    return updated;
  },

  getFollowingIds: (followerId) => {
    const follows = followService.getFollows();
    return follows
      .filter((f) => f.followerId === followerId)
      .map((f) => f.followingId);
  },

  getFollowerIds: (followingId) => {
    const follows = followService.getFollows();
    return follows
      .filter((f) => f.followingId === followingId)
      .map((f) => f.followerId);
  },

  isMutualFriend: (userAId, userBId) => {
    return (
      followService.isFollowing(userAId, userBId) &&
      followService.isFollowing(userBId, userAId)
    );
  },

  getMutualFriendIds: (userId) => {
    const following = followService.getFollowingIds(userId);
    const followers = followService.getFollowerIds(userId);
    return following.filter((id) => followers.includes(id));
  },
};

export default followService;
