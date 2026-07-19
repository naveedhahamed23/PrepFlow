export const notifications = [
  { id: "n1", title: "Revision due", message: "9 DSA problems are due for revision today.", time: "10 min ago", read: false, type: "warning" },
  { id: "n2", title: "Streak milestone", message: "You've hit a 23-day streak! Keep it going.", time: "2 hours ago", read: false, type: "success" },
  { id: "n3", title: "Mock interview scored", message: "Your Technical DSA round scored 82/100.", time: "1 day ago", read: true, type: "info" },
  { id: "n4", title: "New leaderboard rank", message: "You moved up to rank #27 this week.", time: "2 days ago", read: true, type: "success" },
  { id: "n5", title: "Resume tip", message: "Add quantifiable metrics to your 'Projects' section to boost ATS score.", time: "3 days ago", read: true, type: "info" },
];

export const resumeData = {
  fileName: "Aarav_Sharma_Resume.pdf",
  atsScore: 78,
  lastUpdated: "2026-07-12",
  suggestions: [
    "Add metrics to quantify impact in your internship bullet points (e.g. 'reduced load time by 30%').",
    "Include 2-3 more relevant keywords from target job descriptions (e.g. 'REST APIs', 'CI/CD').",
    "Your skills section is strong — consider grouping into Languages / Frameworks / Tools.",
    "Keep resume to one page; current length is borderline at 1.2 pages.",
  ],
  skills: ["Java", "Spring Boot", "React", "JavaScript", "SQL", "DSA", "Git", "Docker"],
  projects: [
    { name: "PrepFlow Clone", description: "A placement prep tracker built with React and Spring Boot.", tech: ["React", "Spring Boot", "PostgreSQL"] },
    { name: "Campus Connect", description: "Real-time chat app for campus communities with WebSockets.", tech: ["Node.js", "Socket.io", "MongoDB"] },
  ],
  education: [
    { degree: "B.Tech Computer Science", institution: "NIT Trichy", year: "2023 - 2027", score: "8.9 CGPA" },
  ],
};
