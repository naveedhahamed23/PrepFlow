import api, { mockResponse } from "./api";
import {
  studyHoursTrend,
  topicPerformance,
  revisionStats,
  difficultyBreakdown,
  progressOverTime,
  generateHeatmapData,
} from "../data/analytics";

const USE_MOCK = true;

const analyticsService = {
  /** GET /api/analytics/study-hours */
  getStudyHoursTrend: async () => {
    if (USE_MOCK) return mockResponse(studyHoursTrend);
    return api.get("/analytics/study-hours");
  },

  /** GET /api/analytics/topic-performance */
  getTopicPerformance: async () => {
    if (USE_MOCK) return mockResponse(topicPerformance);
    return api.get("/analytics/topic-performance");
  },

  /** GET /api/analytics/revision-stats */
  getRevisionStats: async () => {
    if (USE_MOCK) return mockResponse(revisionStats);
    return api.get("/analytics/revision-stats");
  },

  /** GET /api/analytics/difficulty-breakdown */
  getDifficultyBreakdown: async () => {
    if (USE_MOCK) return mockResponse(difficultyBreakdown);
    return api.get("/analytics/difficulty-breakdown");
  },

  /** GET /api/analytics/progress-over-time */
  getProgressOverTime: async () => {
    if (USE_MOCK) return mockResponse(progressOverTime);
    return api.get("/analytics/progress-over-time");
  },

  /** GET /api/analytics/heatmap */
  getHeatmap: async () => {
    if (USE_MOCK) return mockResponse(generateHeatmapData());
    return api.get("/analytics/heatmap");
  },
};

export default analyticsService;
