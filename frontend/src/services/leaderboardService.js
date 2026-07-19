import api, { mockResponse } from "./api";
import { leaderboardData } from "../data/leaderboard";

const USE_MOCK = true;

const leaderboardService = {
  /** GET /api/leaderboard?range=weekly|monthly|allTime */
  getLeaderboard: async (range = "weekly") => {
    if (USE_MOCK) return mockResponse(leaderboardData, 400);
    return api.get("/leaderboard", { params: { range } });
  },
};

export default leaderboardService;
