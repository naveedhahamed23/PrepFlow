import api, { mockResponse } from "./api";

const USE_MOCK = true;

const canned = [
  "Sure — let's break this down. Start by identifying the pattern: is this a two-pointer, sliding window, or DP problem?",
  "Here's a tip: when you're stuck on a graph problem, always ask whether BFS or DFS fits the traversal order you need.",
  "For your resume, try quantifying impact — 'improved API latency by 35%' reads far stronger than 'improved performance'.",
  "Good question. In an HR round, tie your answer back to a specific outcome you drove, not just your responsibilities.",
  "Let's revise this together. Can you walk me through your current approach and where it breaks down?",
];

const aiAssistantService = {
  /** GET /api/assistant/history */
  getHistory: async () => {
    if (USE_MOCK) return mockResponse([]);
    return api.get("/assistant/history");
  },

  /** POST /api/assistant/message  body: { message, conversationId } */
  sendMessage: async (message) => {
    if (USE_MOCK) {
      const reply = canned[Math.floor(Math.random() * canned.length)];
      return mockResponse({ role: "assistant", content: reply }, 900);
    }
    return api.post("/assistant/message", { message });
  },
};

export default aiAssistantService;
