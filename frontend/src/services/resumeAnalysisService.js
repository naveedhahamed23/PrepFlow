import api, { mockResponse } from "./api";
import { initialResumeState } from "../data/resumeData";

const USE_MOCK = true;

const resumeAnalysisService = {
  /** POST /api/resumes/:id/analyze */
  analyzeResume: async (id, resumeData) => {
    if (USE_MOCK) {
      // Simulate backend analysis delay
      return mockResponse(initialResumeState.analysis, 2000);
    }
    return api.post(`/resumes/${id}/analyze`, { data: resumeData });
  },

  /** POST /api/resumes/:id/suggestions */
  getSuggestions: async (id, resumeData) => {
    if (USE_MOCK) {
      return mockResponse(initialResumeState.suggestions, 2000);
    }
    return api.post(`/resumes/${id}/suggestions`, { data: resumeData });
  }
};

export default resumeAnalysisService;
