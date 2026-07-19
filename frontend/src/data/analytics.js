export const studyHoursTrend = [
  { month: "Feb", hours: 38 },
  { month: "Mar", hours: 52 },
  { month: "Apr", hours: 47 },
  { month: "May", hours: 61 },
  { month: "Jun", hours: 58 },
  { month: "Jul", hours: 56 },
];

export const topicPerformance = [
  { name: "DSA", value: 82 },
  { name: "Aptitude", value: 71 },
  { name: "Core CS", value: 64 },
  { name: "Resume", value: 90 },
  { name: "Interviews", value: 77 },
];

export const revisionStats = [
  { name: "Due Today", value: 9, color: "#EF4444" },
  { name: "Due This Week", value: 21, color: "#F59E0B" },
  { name: "Completed", value: 143, color: "#22C55E" },
];

export const difficultyBreakdown = [
  { name: "Easy", value: 120, color: "#22C55E" },
  { name: "Medium", value: 98, color: "#3B82F6" },
  { name: "Hard", value: 41, color: "#EF4444" },
];

// 7 x 24 style contribution heatmap data (weeks x days)
export function generateHeatmapData(weeks = 18) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const data = [];
  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < 7; d++) {
      const seed = w * 7 + d;
      const val = Math.floor((Math.sin(seed * 12.9898) * 43758.5453 % 1 + 1) / 2 * 5);
      data.push({ week: w, day: days[d], value: Math.max(0, val) });
    }
  }
  return data;
}

export const progressOverTime = [
  { week: "W1", dsa: 12, aptitude: 8, core: 5 },
  { week: "W2", dsa: 18, aptitude: 14, core: 9 },
  { week: "W3", dsa: 25, aptitude: 19, core: 12 },
  { week: "W4", dsa: 34, aptitude: 25, core: 18 },
  { week: "W5", dsa: 45, aptitude: 30, core: 24 },
  { week: "W6", dsa: 58, aptitude: 38, core: 29 },
  { week: "W7", dsa: 71, aptitude: 45, core: 35 },
  { week: "W8", dsa: 86, aptitude: 52, core: 41 },
];
