import { mockResponse } from "./api";

const mockDashboardData = {
  userName: "Naveedh",
  studyStreak: 12,
  level: 14,
  xp: 1980,
  maxXp: 2200,
  globalRank: 4,
  goalsActive: 5,
  
  metrics: {
    dsa: { value: 142, label: "Problems solved", delta: "+12%", progress: 42, goal: "42% of your goal" },
    aptitude: { value: 12, label: "Tests completed", delta: "+8%", progress: 58, goal: "58% accuracy" },
    interviews: { value: 8, label: "Interviews taken", delta: "+33%", progress: 74, goal: "74% avg. score" },
    resume: { value: 86, label: "ATS score", delta: "+6%", progress: 86, goal: "Almost there!" },
    studyTime: { value: "64h", label: "Total study time", delta: "+18%", progress: 64, goal: "This month!" }
  },

  activityTimeline: [
    { label: "Sep 4", dsa: 2, aptitude: 1, interview: 0, study: 4, others: 1 },
    { label: "Sep 5", dsa: 3, aptitude: 3, interview: 1, study: 5, others: 0 },
    { label: "Sep 6", dsa: 5, aptitude: 2, interview: 0, study: 6, others: 2 },
    { label: "Sep 7", dsa: 4, aptitude: 4, interview: 2, study: 7, others: 1 },
    { label: "Sep 8", dsa: 6, aptitude: 1, interview: 0, study: 4, others: 0 },
    { label: "Sep 9", dsa: 2, aptitude: 5, interview: 1, study: 5, others: 2 },
    { label: "Sep 10", dsa: 4, aptitude: 3, interview: 2, study: 8, others: 1 },
    { label: "Sep 11", dsa: 3, aptitude: 2, interview: 0, study: 6, others: 2 }
  ],

  preparationProgress: {
    overall: 68,
    breakdown: [
      { name: "DSA", value: 72, color: "#3B82F6" },
      { name: "Aptitude", value: 58, color: "#F59E0B" },
      { name: "Interviews", value: 41, color: "#EC4899" },
      { name: "Resume", value: 86, color: "#10B981" },
      { name: "Study Consistency", value: 74, color: "#06B6D4" }
    ]
  },

  todaysProgress: {
    completed: 3,
    total: 5,
    tasks: [
      { name: "DSA", completed: 1, total: 2, color: "#3B82F6" },
      { name: "Aptitude", completed: 1, total: 1, color: "#F59E0B" },
      { name: "Interview", completed: 0, total: 1, color: "#EF4444" },
      { name: "Study", completed: 1, total: 1, color: "#10B981" },
      { name: "Other", completed: 0, total: 0, color: "#8B5CF6" }
    ]
  },

  upcomingGoals: [
    { id: 1, title: "Complete 200 DSA problems", progress: 142, total: 200, dueIn: "20 days", icon: "Code2", color: "primary" },
    { id: 2, title: "Reach 80% aptitude accuracy", progress: 58, total: 80, dueIn: "15 days", icon: "Calculator", color: "danger" },
    { id: 3, title: "Take 5 mock interviews", progress: 3, total: 5, dueIn: "10 days", icon: "Mic", color: "warning" },
    { id: 4, title: "Finish resume (ATS 90+)", progress: 86, total: 90, dueIn: "7 days", icon: "FileText", color: "primary" },
    { id: 5, title: "Maintain 30 day streak", progress: 12, total: 30, dueIn: "18 days", icon: "Flame", color: "danger" }
  ],

  recentActivity: [
    { id: 1, title: "Solved Two Sum (Easy)", time: "2 hours ago", icon: "Code2", color: "success" },
    { id: 2, title: "Completed Aptitude Test - Quantitative", time: "5 hours ago", icon: "Calculator", color: "warning" },
    { id: 3, title: "Mock Interview (Technical)", time: "1 day ago", icon: "Mic", color: "danger" },
    { id: 4, title: "Updated Resume", time: "2 days ago", icon: "FileText", color: "primary" },
    { id: 5, title: "Studied Arrays (1 hour)", time: "2 days ago", icon: "BookOpen", color: "secondary" }
  ],

  strengths: [
    { name: "Arrays", value: 85, color: "success" },
    { name: "Verbal Ability", value: 78, color: "success" },
    { name: "Consistency", value: 74, color: "success" }
  ],
  
  areasToImprove: [
    { name: "Dynamic Programming", value: 32, color: "danger" },
    { name: "Probability", value: 40, color: "danger" },
    { name: "System Design", value: 45, color: "danger" }
  ]
};

const dashboardService = {
  getDashboard: async () => mockResponse(mockDashboardData),
};

export default dashboardService;
