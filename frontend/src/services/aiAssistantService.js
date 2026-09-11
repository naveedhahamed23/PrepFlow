// ============================================================
// aiAssistantService.js — PrepFlow AI Service
// ============================================================
// Architecture:
//   React → aiAssistantService → Spring Boot REST → Gemini API
//
// NO API keys are stored here. All AI calls go through the backend.
// ============================================================

import api, { mockResponse } from "./api";

// ============================================================
// PrepFlow Context — boundaries for future integration
// ============================================================

export const PREPFLOW_CONTEXT_KEYS = {
  DSA_PROGRESS: "dsa_progress",
  RESUME: "resume",
  INTERVIEW_RESULTS: "interview_results",
  STUDY_PLAN: "study_plan",
  ANALYTICS: "analytics",
};

const aiAssistantService = {
  /**
   * Send a message and receive a reply from Gemini via Spring Boot.
   */
  sendMessage: async (message, _conversationId, _context = {}) => {
    // The backend endpoint is POST /api/ai/chat
    // We expect the response to be { message: "..." }
    const { data } = await api.post("/ai/chat", { message });
    return { data: { content: data.message } };
  },

  /**
   * Send a code-review request.
   */
  reviewCode: async (code, language, problem = "") => {
    const userContent = `Review my ${language} code:\n\`\`\`${language}\n${code}\n\`\`\`${problem ? `\n\nContext: ${problem}` : ""}`;
    const { data } = await api.post("/ai/chat", { message: userContent });
    return { data: { content: data.message } };
  },

  /**
   * Load conversation history for the authenticated user.
   * Future: GET /api/ai/conversations
   */
  getConversations: async () => {
    return mockResponse([]); // Not implemented in backend yet
  },

  /**
   * Get DSA context for the AI (future integration point).
   */
  getDSAContext: async () => {
    return mockResponse(null);
  },

  /**
   * Get Resume context for the AI (future integration point).
   */
  getResumeContext: async () => {
    return mockResponse(null);
  },
};

export default aiAssistantService;
