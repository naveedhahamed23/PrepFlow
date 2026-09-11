export const initialResumeState = {
  hasResume: false, // true once uploaded
  fileName: "Naveedh_Resume.pdf",
  lastUpdated: "2026-09-10",
  analysis: {
    atsScore: 82,
    categoryScores: {
      Formatting: 90,
      Keywords: 75,
      Skills: 80,
      Experience: 85,
      Education: 92,
      Achievements: 68,
      Structure: 78,
    },
    matchStatus: "Good Match",
    strengths: [
      "Clear and professional format",
      "Relevant technical skills",
      "Good work experience details",
      "Strong educational background"
    ],
    improvements: [
      "Add more measurable achievements",
      "Include missing keywords",
      "Improve action verbs",
      "Optimize for the target role"
    ]
  },
  suggestions: [
    {
      id: 1,
      title: "Add measurable achievements",
      description: "Use numbers to showcase impact (e.g. \"Improved performance by 30%\").",
      action: "Generate with AI",
      icon: "Sparkles",
      color: "purple"
    },
    {
      id: 2,
      title: "Include more relevant keywords",
      description: "Add keywords like \"System Design\", \"REST APIs\", \"CI/CD\" based on your target role.",
      action: "Show Keywords",
      icon: "Search",
      color: "blue"
    },
    {
      id: 3,
      title: "Improve your summary",
      description: "Make your summary more impactful and role-specific.",
      action: "Rewrite with AI",
      icon: "Edit3",
      color: "orange"
    },
    {
      id: 4,
      title: "Enhance skills section",
      description: "Add more relevant technical skills and tools.",
      action: "Suggest Skills",
      icon: "Wrench",
      color: "pink"
    }
  ],
  data: {
    personalInfo: {
      name: "Naveedh",
      title: "Software Developer",
      email: "naveedh@example.com",
      phone: "+91 98765 43210",
      location: "Bengaluru, India",
      linkedin: "linkedin.com/in/naveedh",
      github: "github.com/naveedh",
    },
    summary: "Motivated and detail-oriented Computer Science student with a strong foundation in Data Structures, Algorithms, and full-stack development. Passionate about building impactful products and solving real-world problems. Seeking opportunities to contribute to innovative teams and grow as a software engineer.",
    education: [
      {
        degree: "B.Tech in Computer Science and Engineering",
        institution: "XYZ University, Bengaluru",
        period: "2022 - 2026",
        score: "CGPA: 8.7 / 10.0"
      }
    ],
    skills: ["Java", "Python", "JavaScript", "React", "Node.js", "SQL", "Data Structures", "Algorithms", "Git", "Problem Solving"],
    experience: [
      {
        title: "Software Development Intern",
        company: "ABC Tech Solutions, Bengaluru",
        period: "May 2024 - Aug 2024",
        bullets: [
          "Developed a full-stack web application using React and Spring Boot.",
          "Optimized database queries, improving response time by 30%.",
          "Collaborated with a team of 5 developers on a real-world project."
        ]
      }
    ],
    projects: [
      {
        title: "PrepFlow — AI Placement Preparation Platform",
        period: "Jan 2025 - Present",
        bullets: [
          "Built a full-stack platform to track DSA, aptitude, interviews and more.",
          "Integrated AI features for resume analysis and mock interviews."
        ]
      }
    ]
  }
};
