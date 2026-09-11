import { LEADERBOARD_USERS } from "../data/leaderboardData";
import followService from "./followService";

/**
 * Service for Leaderboard Data Fetching, Filtering, Sorting & Pagination.
 * Ready for future Spring Boot endpoints:
 * GET /api/leaderboard?filter=global|friends|college&period=weekly|monthly|allTime&sort=xp|problems|hours|interviews|streak
 */
export const leaderboardService = {
  getLeaderboard: async ({
    filter = "global",
    period = "allTime",
    sortBy = "xp",
    search = "",
    currentUserId = "user-current",
    currentUserCollege = "VIT Chennai",
    page = 1,
    pageSize = 10,
  }) => {
    // Simulate API delay
    await new Promise((res) => setTimeout(res, 150));

    let users = [...LEADERBOARD_USERS];

    // Apply Filter Tab
    if (filter === "friends") {
      const friendIds = followService.getFollowingIds(currentUserId);
      users = users.filter(
        (u) => friendIds.includes(u.id) || u.id === currentUserId
      );
    } else if (filter === "college") {
      users = users.filter(
        (u) =>
          u.college &&
          u.college.toLowerCase().trim() ===
            currentUserCollege.toLowerCase().trim()
      );
    }

    // Apply Period multiplier/scaling if weekly or monthly
    if (period === "weekly") {
      users = users.map((u) => ({
        ...u,
        xp: Math.round(u.xp * 0.25),
        problemsSolved: Math.round(u.problemsSolved * 0.2),
        studyHours: Math.round(u.studyHours * 0.2),
      }));
    } else if (period === "monthly") {
      users = users.map((u) => ({
        ...u,
        xp: Math.round(u.xp * 0.7),
        problemsSolved: Math.round(u.problemsSolved * 0.7),
        studyHours: Math.round(u.studyHours * 0.7),
      }));
    }

    // Apply Search Query
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      users = users.filter(
        (u) =>
          u.username.toLowerCase().includes(q) ||
          u.displayName.toLowerCase().includes(q) ||
          u.college.toLowerCase().includes(q)
      );
    }

    // Apply Sorting
    users.sort((a, b) => {
      if (sortBy === "problems") return b.problemsSolved - a.problemsSolved;
      if (sortBy === "hours") return b.studyHours - a.studyHours;
      if (sortBy === "interviews") return b.interviews - a.interviews;
      if (sortBy === "streak") return b.streak - a.streak;
      return b.xp - a.xp; // default XP
    });

    // Assign Ranks
    users = users.map((u, index) => ({
      ...u,
      rank: index + 1,
    }));

    // Pagination
    const totalUsers = users.length;
    const totalPages = Math.ceil(totalUsers / pageSize) || 1;
    const startIndex = (page - 1) * pageSize;
    const paginatedUsers = users.slice(startIndex, startIndex + pageSize);

    // Current User Rank Info
    const currentUserIndex = users.findIndex((u) => u.id === currentUserId);
    const currentUserRank = currentUserIndex !== -1 ? currentUserIndex + 1 : 4;

    return {
      users: paginatedUsers,
      allSortedUsers: users,
      totalUsers: totalUsers > 15 ? 1248 : totalUsers, // Shows total community count
      totalPages: Math.max(totalPages, 125),
      page,
      currentUserRank,
    };
  },
};

export default leaderboardService;
