import api from "./api";

const dashboardService = {
  getDashboard: async () => api.get("/dashboard"),
};

export default dashboardService;
