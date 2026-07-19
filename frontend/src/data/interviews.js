export const interviewTypes = [
  {
    id: "int_technical",
    type: "Technical",
    title: "Technical DSA Round",
    description: "Live coding round covering arrays, trees, and dynamic programming with follow-up questions.",
    duration: "45 min",
    difficulty: "Medium",
    icon: "Code2",
  },
  {
    id: "int_behavioral",
    type: "Behavioral",
    title: "Behavioral Interview",
    description: "STAR-format questions on teamwork, conflict resolution, and leadership experiences.",
    duration: "30 min",
    difficulty: "Easy",
    icon: "MessageCircle",
  },
  {
    id: "int_hr",
    type: "HR",
    title: "HR Round",
    description: "Culture fit, salary expectations, and career goal discussions with an AI HR persona.",
    duration: "20 min",
    difficulty: "Easy",
    icon: "Handshake",
  },
  {
    id: "int_system_design",
    type: "Technical",
    title: "System Design Basics",
    description: "Entry-level system design covering scalability, caching, and database choices.",
    duration: "40 min",
    difficulty: "Hard",
    icon: "Network",
  },
];

export const interviewHistory = [
  { id: "hist_01", type: "Technical", date: "2026-07-14", score: 82, duration: "42 min", feedback: "Strong on arrays, work on explaining time complexity out loud." },
  { id: "hist_02", type: "HR", date: "2026-07-10", score: 91, duration: "18 min", feedback: "Confident and clear. Great use of concrete examples." },
  { id: "hist_03", type: "Behavioral", date: "2026-07-05", score: 74, duration: "28 min", feedback: "Good structure, add more quantifiable outcomes to your stories." },
  { id: "hist_04", type: "Technical", date: "2026-06-29", score: 68, duration: "50 min", feedback: "Struggled with graph traversal edge cases. Revisit BFS/DFS." },
  { id: "hist_05", type: "Technical", date: "2026-06-20", score: 77, duration: "38 min", feedback: "Solid problem-solving pace, clean code structure." },
];

export const interviewPerformance = [
  { month: "Feb", score: 58 },
  { month: "Mar", score: 63 },
  { month: "Apr", score: 69 },
  { month: "May", score: 71 },
  { month: "Jun", score: 79 },
  { month: "Jul", score: 84 },
];
