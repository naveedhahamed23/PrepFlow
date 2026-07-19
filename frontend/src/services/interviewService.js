import api, { mockResponse } from "./api";
import { interviewTypes, interviewHistory, interviewPerformance } from "../data/interviews";

const USE_MOCK = true;

const interviewService = {
  /** GET /api/interviews/types */
  getInterviewTypes: async () => {
    if (USE_MOCK) return mockResponse(interviewTypes);
    return api.get("/interviews/types");
  },

  /** GET /api/interviews/history */
  getHistory: async () => {
    if (USE_MOCK) return mockResponse(interviewHistory);
    return api.get("/interviews/history");
  },

  /** GET /api/interviews/performance */
  getPerformanceTrend: async () => {
    if (USE_MOCK) return mockResponse(interviewPerformance);
    return api.get("/interviews/performance");
  },

  /** POST /api/interviews/start */
  startInterview: async (typeId) => {
    if (USE_MOCK) return mockResponse({ sessionId: `sess_${Date.now()}`, typeId, status: "in_progress" }, 400);
    return api.post("/interviews/start", { typeId });
  },
};

export default interviewService;
