import api from "./api";

const colors = ["#3B82F6", "#F59E0B", "#EC4899", "#10B981", "#06B6D4"];
const activityLabels = {
  DSA_SOLVED: "Solved a DSA problem",
  APTITUDE_COMPLETED: "Completed an aptitude practice",
  STUDY_TASK_COMPLETED: "Completed a study task",
  MOCK_INTERVIEW_COMPLETED: "Completed a mock interview",
  RESUME_ANALYZED: "Analyzed a resume",
  LEARNING_SESSION_COMPLETED: "Completed a learning session",
};

function relativeTime(value) {
  if (!value) return "Recently";
  const elapsed = Math.max(0, Date.now() - new Date(value).getTime());
  const minutes = Math.floor(elapsed / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function toViewModel(data) {
  const dsaProgress = data.dsaProblemsTracked
    ? Math.round((data.dsaProblemsSolved / data.dsaProblemsTracked) * 100)
    : null;
  const studyProgress = data.overallProgress;
  const breakdown = [
    ...(dsaProgress == null ? [] : [{ name: "DSA", value: dsaProgress, color: colors[0] }]),
    ...(data.aptitudeAverage == null ? [] : [{ name: "Aptitude", value: data.aptitudeAverage, color: colors[1] }]),
    ...(studyProgress == null ? [] : [{ name: "Study tasks today", value: studyProgress, color: colors[4] }]),
  ];

  const todayTasks = data.todaysTasks || [];
  const taskColors = [colors[0], colors[1], colors[2], colors[3], colors[4]];
  const upcoming = (data.upcomingSchedule || []).map((task) => {
    const dueDate = task.dueDate ? new Date(`${task.dueDate}T00:00:00`) : null;
    const daysUntil = dueDate ? Math.ceil((dueDate - new Date(new Date().toDateString())) / 86400000) : null;
    return {
      id: task.id,
      title: task.title,
      progress: task.done ? 1 : 0,
      total: 1,
      dueIn: daysUntil == null ? "Scheduled" : daysUntil === 0 ? "Today" : `in ${daysUntil} days`,
      icon: "Code2",
      color: "primary",
    };
  });

  const recentActivity = (data.recentActivity || []).map((item) => ({
    id: item.id,
    title: `${activityLabels[item.type] || "Preparation activity"}${item.metadata ? `: ${item.metadata}` : ""}`,
    time: relativeTime(item.createdAt),
    icon: item.type === "DSA_SOLVED" ? "Code2" : item.type === "APTITUDE_COMPLETED" ? "Calculator" : item.type === "MOCK_INTERVIEW_COMPLETED" ? "Mic" : "FileText",
    color: item.type === "DSA_SOLVED" ? "success" : item.type === "APTITUDE_COMPLETED" ? "warning" : "primary",
  }));

  return {
    userName: data.userName,
    studyStreak: data.studyStreak,
    level: data.level,
    xp: data.xp,
    maxXp: null,
    globalRank: null,
    goalsActive: upcoming.length,
    metrics: {
      dsa: { value: data.dsaProblemsSolved, label: "Problems solved", delta: data.dsaSolvedThisWeek ? `${data.dsaSolvedThisWeek} this week` : "", progress: dsaProgress ?? 0, goal: data.dsaProblemsTracked ? `${data.dsaProblemsSolved} of ${data.dsaProblemsTracked} tracked` : "No problems tracked" },
      aptitude: { value: data.aptitudeAverage == null ? "—" : `${Math.round(data.aptitudeAverage)}%`, label: "Average accuracy", delta: "", progress: data.aptitudeAverage ?? 0, goal: data.aptitudeAverage == null ? "No attempts recorded" : "From recorded practice" },
      interviews: { value: data.interviewCount, label: "Interviews completed", delta: "", progress: 0, goal: "Recorded interview sessions" },
      resume: { value: "—", label: "Resume analysis", delta: "", progress: 0, goal: "No analysis recorded" },
      studyTime: { value: `${Math.floor(data.studyMinutes / 60)}h ${data.studyMinutes % 60}m`, label: "Study time", delta: "", progress: 0, goal: "From completed planner tasks" },
    },
    activityTimeline: (data.weeklyActivity || []).map((point) => ({
      label: point.label,
      dsa: point.dsa,
      aptitude: point.aptitude,
      interview: point.interview,
      study: point.study,
      others: point.others,
    })),
    preparationProgress: {
      overall: studyProgress,
      breakdown,
    },
    todaysProgress: {
      completed: todayTasks.filter((task) => task.done).length,
      total: todayTasks.length,
      tasks: todayTasks.map((task, index) => ({ name: task.title, completed: task.done ? 1 : 0, total: 1, color: taskColors[index % taskColors.length] })),
    },
    recentActivity,
    strengths: [],
    areasToImprove: (data.weakAreas || []).map((name) => ({ name, value: null, color: "danger" })),
    upcomingGoals: upcoming,
    weakAreas: data.weakAreas || [],
  };
}

const dashboardService = {
  getDashboard: async () => {
    const { data } = await api.get("/dashboard");
    return { data: toViewModel(data) };
  },
};

export default dashboardService;
