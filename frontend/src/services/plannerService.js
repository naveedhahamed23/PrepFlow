import api, { mockResponse } from "./api";
import { todayTasks, upcomingTasks, weeklyPlanner, monthlyGoals } from "../data/planner";

const USE_MOCK = true;

const plannerService = {
  /** GET /api/planner/today */
  getTodayTasks: async () => {
    if (USE_MOCK) return mockResponse(todayTasks);
    return api.get("/planner/today");
  },

  /** GET /api/planner/upcoming */
  getUpcomingTasks: async () => {
    if (USE_MOCK) return mockResponse(upcomingTasks);
    return api.get("/planner/upcoming");
  },

  /** GET /api/planner/weekly */
  getWeeklyPlanner: async () => {
    if (USE_MOCK) return mockResponse(weeklyPlanner);
    return api.get("/planner/weekly");
  },

  /** GET /api/planner/goals */
  getMonthlyGoals: async () => {
    if (USE_MOCK) return mockResponse(monthlyGoals);
    return api.get("/planner/goals");
  },

  /** POST /api/planner/tasks */
  createTask: async (task) => {
    if (USE_MOCK) return mockResponse({ id: `t_${Date.now()}`, done: false, ...task }, 300);
    return api.post("/planner/tasks", task);
  },

  /** PUT /api/planner/tasks/:id */
  updateTask: async (id, updates) => {
    if (USE_MOCK) return mockResponse({ id, ...updates }, 200);
    return api.put(`/planner/tasks/${id}`, updates);
  },

  /** DELETE /api/planner/tasks/:id */
  deleteTask: async (id) => {
    if (USE_MOCK) return mockResponse({ id }, 200);
    return api.delete(`/planner/tasks/${id}`);
  },
};

export default plannerService;
