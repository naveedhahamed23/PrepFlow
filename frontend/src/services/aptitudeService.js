import api, { mockResponse } from "./api";
import { aptitudeTopics, aptitudeAnalytics } from "../data/aptitude";

const USE_MOCK = true;

const aptitudeService = {
  /** GET /api/aptitude/topics */
  getTopics: async () => {
    if (USE_MOCK) return mockResponse(aptitudeTopics);
    return api.get("/aptitude/topics");
  },

  /** GET /api/aptitude/analytics */
  getAnalytics: async () => {
    if (USE_MOCK) return mockResponse(aptitudeAnalytics);
    return api.get("/aptitude/analytics");
  },
};

export default aptitudeService;
