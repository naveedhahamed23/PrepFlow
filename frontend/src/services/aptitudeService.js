import { mockResponse } from "./api";
import { aptitudeTopics, aptitudeAnalytics } from "../data/aptitude";

const aptitudeService = {
  getTopics: async () => mockResponse(aptitudeTopics),
  getAnalytics: async () => mockResponse(aptitudeAnalytics),
  getSummary: async () => mockResponse({ totalTests: 24, averageScore: 78, percentile: 85 }),
};

export default aptitudeService;
