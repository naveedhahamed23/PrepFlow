import api, { mockResponse } from "./api";
import { dsaProblems, dsaTopicStats, dsaWeeklyActivity } from "../data/dsaProblems";

const USE_MOCK = true;

const dsaService = {
  /** GET /api/dsa/problems?search=&difficulty=&status=&topic= */
  getProblems: async (filters = {}) => {
    if (USE_MOCK) {
      let results = [...dsaProblems];
      if (filters.search) {
        const q = filters.search.toLowerCase();
        results = results.filter((p) => p.title.toLowerCase().includes(q));
      }
      if (filters.difficulty && filters.difficulty !== "All") {
        results = results.filter((p) => p.difficulty === filters.difficulty);
      }
      if (filters.status && filters.status !== "All") {
        results = results.filter((p) => p.status === filters.status);
      }
      if (filters.topic && filters.topic !== "All") {
        results = results.filter((p) => p.topic === filters.topic);
      }
      return mockResponse(results, 350);
    }
    return api.get("/dsa/problems", { params: filters });
  },

  /** GET /api/dsa/problems/:id */
  getProblemById: async (id) => {
    if (USE_MOCK) return mockResponse(dsaProblems.find((p) => p.id === id) || null);
    return api.get(`/dsa/problems/${id}`);
  },

  /** PUT /api/dsa/problems/:id */
  updateProblem: async (id, updates) => {
    if (USE_MOCK) return mockResponse({ id, ...updates }, 300);
    return api.put(`/dsa/problems/${id}`, updates);
  },

  /** GET /api/dsa/stats/topics */
  getTopicStats: async () => {
    if (USE_MOCK) return mockResponse(dsaTopicStats);
    return api.get("/dsa/stats/topics");
  },

  /** GET /api/dsa/stats/weekly */
  getWeeklyActivity: async () => {
    if (USE_MOCK) return mockResponse(dsaWeeklyActivity);
    return api.get("/dsa/stats/weekly");
  },
};

export default dsaService;
