import {
  TIME_RANGE_DATA,
  ACTIVITY_OVERVIEW_DATA,
  TOPIC_PERFORMANCE_DATA,
  STUDY_TIME_DONUT_DATA,
  AI_INSIGHTS_DATA,
  RECENT_ACTIVITIES_DATA,
  GOAL_PROGRESS_DATA,
} from "../data/analyticsData";

/**
 * Calculates activity intensity level (0 to 5) based on total weighted activity.
 * Centralized threshold logic:
 * Level 0: 0 activities
 * Level 1: 1-2 activities
 * Level 2: 3-4 activities
 * Level 3: 5-6 activities
 * Level 4: 7-8 activities
 * Level 5: 9+ activities
 */
export const calculateIntensity = (totalCount) => {
  if (!totalCount || totalCount <= 0) return 0;
  if (totalCount <= 2) return 1;
  if (totalCount <= 4) return 2;
  if (totalCount <= 6) return 3;
  if (totalCount <= 8) return 4;
  return 5;
};

export const analyticsService = {
  getOverviewMetrics: async (timeRange = "30d") => {
    await new Promise((res) => setTimeout(res, 80));
    return TIME_RANGE_DATA[timeRange] || TIME_RANGE_DATA["30d"];
  },

  getActivityOverview: async (timeRange = "30d") => {
    await new Promise((res) => setTimeout(res, 80));
    if (timeRange === "7d") {
      return ACTIVITY_OVERVIEW_DATA.slice(-4);
    }
    return ACTIVITY_OVERVIEW_DATA;
  },

  getTopicPerformance: async (category = "DSA") => {
    await new Promise((res) => setTimeout(res, 60));
    return TOPIC_PERFORMANCE_DATA[category] || TOPIC_PERFORMANCE_DATA.DSA;
  },

  getStudyTimeBreakdown: async () => {
    await new Promise((res) => setTimeout(res, 60));
    return STUDY_TIME_DONUT_DATA;
  },

  /**
   * Generates a continuous GitHub-style activity contribution graph dataset.
   * Maps daily activity events across DSA, Aptitude, Interview, Resume, Study Planner, and AI Assistant.
   */
  getHeatmapData: async (timeRange = "30d", isNewUser = false) => {
    await new Promise((res) => setTimeout(res, 80));

    if (isNewUser) {
      return { days: [], totalActivities: 0, weeksCount: 12 };
    }

    // Determine number of days based on timeRange
    let totalDays = 84; // default 12 weeks for 30d/90d
    if (timeRange === "7d") totalDays = 28; // 4 weeks
    if (timeRange === "year" || timeRange === "all") totalDays = 168; // 24 weeks

    const endDate = new Date("2026-09-11T00:00:00");
    const daysList = [];
    let grandTotal = 0;

    // Generate daily activity entries backwards from endDate
    for (let i = totalDays - 1; i >= 0; i--) {
      const d = new Date(endDate);
      d.setDate(d.getDate() - i);

      const dateStr = d.toISOString().split("T")[0];
      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
      const monthName = d.toLocaleDateString("en-US", { month: "short" });

      // Generate deterministic activity events based on date seed
      const seed = d.getDate() * 13 + d.getMonth() * 17;
      const isWeekend = dayName === "Sat" || dayName === "Sun";

      // Pseudo activity generation
      let dsa = (seed % 4) + (isWeekend ? 0 : 1);
      let aptitude = ((seed * 2) % 3);
      let interviews = (seed % 7 === 0 ? 1 : 0);
      let resume = (seed % 11 === 0 ? 1 : 0);
      let studyPlanner = ((seed + 3) % 3);

      // Certain days have 0 activity
      if (seed % 5 === 0 && !isWeekend) {
        dsa = 0;
        aptitude = 0;
        interviews = 0;
        resume = 0;
        studyPlanner = 0;
      }

      const totalActivities = dsa + aptitude + interviews + resume + studyPlanner;
      grandTotal += totalActivities;

      const intensity = calculateIntensity(totalActivities);

      daysList.push({
        date: dateStr,
        formattedDate: d.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        dayName,
        monthName,
        dayOfWeekIndex: (d.getDay() + 6) % 7, // 0 = Mon, ..., 6 = Sun
        totalActivities,
        breakdown: {
          dsa,
          aptitude,
          interviews,
          resume,
          studyPlanner,
        },
        intensity,
      });
    }

    return {
      days: daysList,
      totalActivities: grandTotal,
      weeksCount: Math.ceil(totalDays / 7),
    };
  },

  getAIInsights: async () => {
    await new Promise((res) => setTimeout(res, 60));
    return AI_INSIGHTS_DATA;
  },

  getRecentActivity: async () => {
    await new Promise((res) => setTimeout(res, 60));
    return RECENT_ACTIVITIES_DATA;
  },

  getGoalProgress: async () => {
    await new Promise((res) => setTimeout(res, 60));
    return GOAL_PROGRESS_DATA;
  },
};

export default analyticsService;
