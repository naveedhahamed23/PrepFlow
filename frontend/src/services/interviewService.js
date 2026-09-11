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

  // ---- NEW METHODS FOR AI INTERVIEW PROTOTYPE ----
  
  createSession: async (config) => {
    if (USE_MOCK) {
      const session = { id: `int_${Date.now()}`, config, status: "created" };
      // Normally we'd save to DB here
      return mockResponse(session, 200);
    }
    return api.post("/interviews", { config });
  },

  saveSession: async (session) => {
    if (USE_MOCK) {
      // In a real app this would update the backend record
      return mockResponse({ success: true }, 500);
    }
    return api.put(`/interviews/${session.id}`, session);
  },

  getSession: async (id) => {
    if (USE_MOCK) {
      // For prototype, session state is primarily held in memory by the Room component.
      // If we needed to fetch a past one, we'd look it up in mockHistory.
      const historyItem = interviewHistory.find(h => h.id === id);
      return mockResponse(historyItem || null, 300);
    }
    return api.get(`/interviews/${id}`);
  }
};

export default interviewService;
