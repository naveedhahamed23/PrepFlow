import api, { mockResponse } from "./api";
import { mockUser } from "../data/user";

const USE_MOCK = true; // flip to false once Spring Boot /api/auth/** is live

const authService = {
  /**
   * POST /api/auth/login
   * Real backend expected to accept { email, password } and return
   * { token, user }.
   */
  login: async (credentials) => {
    if (USE_MOCK) {
      if (!credentials?.email || !credentials?.password) {
        return Promise.reject({ response: { data: { message: "Email and password are required." } } });
      }
      return mockResponse({
        token: "mock-jwt-token." + btoa(credentials.email),
        user: { ...mockUser, email: credentials.email },
      });
    }
    return api.post("/auth/login", credentials);
  },

  /**
   * POST /api/auth/register
   * Expected payload: { name, email, password }
   */
  register: async (payload) => {
    if (USE_MOCK) {
      return mockResponse({
        token: "mock-jwt-token." + btoa(payload.email),
        user: { ...mockUser, name: payload.name, email: payload.email },
      });
    }
    return api.post("/auth/register", payload);
  },

  /** POST /api/auth/forgot-password */
  forgotPassword: async (email) => {
    if (USE_MOCK) {
      return mockResponse({ message: `Password reset link sent to ${email}.` });
    }
    return api.post("/auth/forgot-password", { email });
  },

  /** POST /api/auth/reset-password */
  resetPassword: async (token, newPassword) => {
    if (USE_MOCK) {
      return mockResponse({ message: "Password has been reset successfully." });
    }
    return api.post("/auth/reset-password", { token, newPassword });
  },

  /** POST /api/auth/logout */
  logout: () => {
    if (USE_MOCK) return mockResponse({ message: "Logged out" }, 100);
    return api.post("/auth/logout");
  },
};

export default authService;
