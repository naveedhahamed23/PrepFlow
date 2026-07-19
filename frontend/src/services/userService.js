import api, { mockResponse } from "./api";
import { mockUser } from "../data/user";
import { notifications } from "../data/notifications";

const USE_MOCK = true;

const userService = {
  /** GET /api/users/me */
  getProfile: async () => {
    if (USE_MOCK) return mockResponse(mockUser);
    return api.get("/users/me");
  },

  /** PUT /api/users/me */
  updateProfile: async (updates) => {
    if (USE_MOCK) return mockResponse({ ...mockUser, ...updates });
    return api.put("/users/me", updates);
  },

  /** PUT /api/users/me/preferences */
  updatePreferences: async (preferences) => {
    if (USE_MOCK) return mockResponse({ ...mockUser.preferences, ...preferences });
    return api.put("/users/me/preferences", preferences);
  },

  /** PUT /api/users/me/password */
  changePassword: async (payload) => {
    if (USE_MOCK) return mockResponse({ message: "Password updated successfully." });
    return api.put("/users/me/password", payload);
  },

  /** DELETE /api/users/me */
  deleteAccount: async () => {
    if (USE_MOCK) return mockResponse({ message: "Account deleted." });
    return api.delete("/users/me");
  },

  /** GET /api/users/me/notifications */
  getNotifications: async () => {
    if (USE_MOCK) return mockResponse(notifications);
    return api.get("/users/me/notifications");
  },

  /** PUT /api/users/me/notifications/:id/read */
  markNotificationRead: async (id) => {
    if (USE_MOCK) return mockResponse({ id, read: true }, 150);
    return api.put(`/users/me/notifications/${id}/read`);
  },
};

export default userService;
