package com.prepflow.dashboard;

import java.util.List;

public record DashboardResponse(
                String userName,
                long dsaProblemsSolved,
                long studyMinutes,
                long studyStreak,
                long xp,
                long interviewCount,
                Double aptitudeAverage,
                Integer overallProgress,
                List<SectionProgress> progressBySection,
                List<ActivityPoint> weeklyActivity,
                List<ActivityPoint> monthlyActivity,
                List<TaskItem> todaysTasks,
                List<ActivityItem> recentActivity,
                List<TaskItem> upcomingSchedule,
                List<String> weakAreas,
                long dsaProblemsTracked,
                long dsaRevisionPending,
                long dsaSolvedThisWeek,
                int level
) {
        public record SectionProgress(String section, Integer progress, long activityCount) {}
        public record ActivityPoint(String label, long value, long dsa, long aptitude, long interview, long study, long others) {}
        public record TaskItem(String id, String title, String subject, Integer duration, boolean done, String dueDate) {}
        public record ActivityItem(String id, String type, String metadata, String createdAt) {}

        public long dsaSolvedCount() { return dsaProblemsSolved; }
        public long totalTasksToday() { return todaysTasks.size(); }
}
