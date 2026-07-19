import api, { mockResponse } from "./api";
import { resumeData } from "../data/notifications";

const USE_MOCK = true;

const resumeService = {
  /** GET /api/resume */
  getResume: async () => {
    if (USE_MOCK) return mockResponse(resumeData);
    return api.get("/resume");
  },

  /** POST /api/resume/upload (multipart/form-data) */
  uploadResume: async (file) => {
    if (USE_MOCK) {
      return mockResponse({ fileName: file?.name || "resume.pdf", atsScore: 78, message: "Resume analyzed." }, 900);
    }
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/resume/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
  },
};

export default resumeService;
