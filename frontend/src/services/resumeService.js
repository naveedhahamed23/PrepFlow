import api, { mockResponse } from "./api";
import { initialResumeState } from "../data/resumeData";

const USE_MOCK = true;

// Mock database
let mockResumes = [
  {
    id: "r_1",
    name: "Software Engineer Resume",
    template: "modern",
    lastUpdated: "2026-09-10",
    status: "Active",
    data: initialResumeState.data
  }
];

const generateEmptyResumeData = () => ({
  personalInfo: { name: "", title: "", email: "", phone: "", location: "", linkedin: "", github: "" },
  summary: "",
  education: [],
  skills: [],
  experience: [],
  projects: []
});

const resumeService = {
  /** GET /api/resumes */
  getMyResumes: async () => {
    if (USE_MOCK) return mockResponse(mockResumes);
    return api.get("/resumes");
  },

  /** GET /api/resumes/:id */
  getResume: async (id) => {
    if (USE_MOCK) {
      if (!id) {
         // return a default structure if no ID is passed
         return mockResponse({ hasResume: false, data: generateEmptyResumeData() });
      }
      const resume = mockResumes.find(r => r.id === id);
      if (!resume) throw new Error("Not found");
      return mockResponse({ hasResume: true, data: resume.data, id: resume.id, name: resume.name, template: resume.template });
    }
    return api.get(`/resumes/${id}`);
  },

  /** POST /api/resumes */
  saveResume: async (resumeData, name = "New Resume", template = "modern") => {
    if (USE_MOCK) {
      const newResume = {
        id: `r_${Date.now()}`,
        name,
        template,
        lastUpdated: new Date().toISOString().split('T')[0],
        status: "Active",
        data: resumeData
      };
      mockResumes.push(newResume);
      return mockResponse(newResume);
    }
    return api.post("/resumes", { name, template, data: resumeData });
  },

  /** PUT /api/resumes/:id */
  updateResume: async (id, updates) => {
    if (USE_MOCK) {
      const index = mockResumes.findIndex(r => r.id === id);
      if (index > -1) {
        mockResumes[index] = { ...mockResumes[index], ...updates, lastUpdated: new Date().toISOString().split('T')[0] };
        return mockResponse(mockResumes[index]);
      }
      throw new Error("Not found");
    }
    return api.put(`/resumes/${id}`, updates);
  },

  /** DELETE /api/resumes/:id */
  deleteResume: async (id) => {
    if (USE_MOCK) {
      mockResumes = mockResumes.filter(r => r.id !== id);
      return mockResponse({ success: true });
    }
    return api.delete(`/resumes/${id}`);
  },

  /** POST /api/resumes/upload (multipart/form-data) */
  uploadResume: async (file) => {
    if (USE_MOCK) {
      // Simulate successful upload and return the fully populated mock state
      const uploadedState = {
        hasResume: true,
        fileName: file?.name || "Uploaded_Resume.pdf",
        data: initialResumeState.data
      };
      return mockResponse(uploadedState, 1500); // 1.5s delay to show loading
    }
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/resumes/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
  },
};

export default resumeService;
