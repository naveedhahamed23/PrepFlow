import axios from "axios";

/**
 * Central Axios instance.
 *
 * Swap VITE_API_BASE_URL in your .env to point at the real Spring Boot
 * backend (e.g. http://localhost:8080/api) once it's ready. Every service
 * file in this folder is already written against this instance, so moving
 * off mock data only requires deleting the mock branch inside each service
 * function — the calling code (hooks/pages) never changes.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT (or session token) automatically once the Spring Boot
// auth endpoints are wired up.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("prepflow_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralized error handling / 401 redirect once real auth exists.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("prepflow_token");
      localStorage.removeItem("prepflow_user");
    }
    return Promise.reject(error);
  }
);

export default api;

/**
 * Small helper used by every mock service function so each one has the
 * exact same shape a real Axios response would have: { data, status }.
 * This means pages can call `const { data } = await xService.getY()`
 * whether the backend is mocked or real.
 */
export function mockResponse(data, delay = 500, status = 200) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data, status }), delay);
  });
}
