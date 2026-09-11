/**
 * Frontend Service for AI Study Plan Generation.
 * Ready for future backend endpoint: POST /api/study-plans/generate
 */
export const studyPlanService = {
  generateStudyPlan: async ({
    targetCompany = "Tier 1 Tech",
    examDate = "2026-10-15",
    availableHours = 6,
    weakAreas = "Dynamic Programming, System Design",
    skillLevel = "Intermediate",
    preferredStudyDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  }) => {
    // Simulate AI generation delay
    await new Promise((res) => setTimeout(res, 1200));

    const todayStr = "2026-09-11";
    const tomorrowStr = "2026-09-12";
    const day3Str = "2026-09-13";

    const generatedTasks = [
      {
        id: `gen-${Date.now()}-1`,
        title: `DSA – ${weakAreas.includes("DP") ? "Dynamic Programming Sprints" : "Advanced Data Structures"}`,
        description: `Targeted practice tailored for ${targetCompany} technical rounds`,
        date: todayStr,
        startTime: "09:00",
        duration: "2h",
        category: "DSA",
        priority: "High",
        completed: false,
      },
      {
        id: `gen-${Date.now()}-2`,
        title: "Aptitude – Speed & Accuracy Drills",
        description: "Solve 25 timed questions on quantitative aptitude & data interpretation",
        date: todayStr,
        startTime: "11:30",
        duration: "1h",
        category: "Aptitude",
        priority: "Medium",
        completed: false,
      },
      {
        id: `gen-${Date.now()}-3`,
        title: `Mock Interview – ${targetCompany} Focus`,
        description: "Practice behavioral & core technical response questions",
        date: todayStr,
        startTime: "14:30",
        duration: "45m",
        category: "Interview",
        priority: "High",
        completed: false,
      },
      {
        id: `gen-${Date.now()}-4`,
        title: "Resume & Portfolio Enhancement",
        description: `Highlight key skills aligned with ${targetCompany} requirements`,
        date: todayStr,
        startTime: "16:00",
        duration: "45m",
        category: "Resume",
        priority: "Medium",
        completed: false,
      },
      // Tomorrow tasks
      {
        id: `gen-${Date.now()}-5`,
        title: "DSA – Graphs & Trees Deep Dive",
        description: "Practice BFS/DFS traversals and shortest path algorithms",
        date: tomorrowStr,
        startTime: "09:00",
        duration: "2h",
        category: "DSA",
        priority: "High",
        completed: false,
      },
      {
        id: `gen-${Date.now()}-6`,
        title: "System Design / Core CS Revision",
        description: "Review OS thread scheduling, DBMS indexing, and networking concepts",
        date: tomorrowStr,
        startTime: "11:30",
        duration: "1h 30m",
        category: "Study",
        priority: "Medium",
        completed: false,
      },
      // Day 3 tasks
      {
        id: `gen-${Date.now()}-7`,
        title: "Full Mock Assessment",
        description: "Simulated 2-hour online coding assessment under exam constraints",
        date: day3Str,
        startTime: "10:00",
        duration: "2h",
        category: "Interview",
        priority: "High",
        completed: false,
      },
    ];

    const generatedGoals = [
      {
        id: `g-gen-1`,
        title: `Solve 10 ${targetCompany} Tagged Problems`,
        target: 10,
        current: 0,
        unit: "problems",
        category: "DSA",
        completed: false,
      },
      {
        id: `g-gen-2`,
        title: `Study ${availableHours} Hours Daily`,
        target: Number(availableHours),
        current: 0,
        unit: "hours",
        category: "Study",
        completed: false,
      },
      {
        id: `g-gen-3`,
        title: `Master Weak Area: ${weakAreas.split(",")[0] || "DP"}`,
        target: 5,
        current: 0,
        unit: "sets",
        category: "DSA",
        completed: false,
      },
    ];

    return {
      id: `plan-${Date.now()}`,
      targetCompany,
      examDate,
      availableHours,
      weakAreas,
      skillLevel,
      tasks: generatedTasks,
      goals: generatedGoals,
      generatedAt: new Date().toISOString(),
    };
  },
};

export default studyPlanService;
