import api, { mockResponse } from "./api";

const USE_MOCK = true;

const coverLetterService = {
  /** POST /api/resumes/:id/cover-letter */
  generateCoverLetter: async (id, payload) => {
    const { role, company, tone, resumeData } = payload;
    
    if (USE_MOCK) {
      const name = resumeData?.personalInfo?.name || "[Your Name]";
      const mockLetter = `Dear Hiring Manager at ${company || "[Company Name]"},

I am writing to express my strong interest in the ${role || "[Target Role]"} position. With my background in software development and my passion for building impactful products, I am confident in my ability to contribute effectively to your team.

My experience aligns well with the qualifications you are seeking. Throughout my academic and professional journey, I have developed a solid foundation in modern web technologies and problem-solving. I am particularly drawn to ${company || "your company"}'s innovative approach and believe my skills in full-stack development make me a strong fit for this role.

Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experiences align with your team's needs.

Sincerely,
${name}`;

      return mockResponse({ content: mockLetter }, 2500); // 2.5s delay
    }

    return api.post(`/resumes/${id}/cover-letter`, payload);
  }
};

export default coverLetterService;
