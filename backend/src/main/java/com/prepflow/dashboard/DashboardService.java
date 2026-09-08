package com.prepflow.dashboard;

import com.prepflow.activity.Activity;
import com.prepflow.activity.ActivityRepository;
import com.prepflow.activity.ActivityType;
import com.prepflow.planner.StudyTask;
import com.prepflow.planner.StudyTaskRepository;
import com.prepflow.user.User;
import com.prepflow.user.UserRepository;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {
    private static final Pattern SCORE_PATTERN = Pattern.compile("(?:\\\"score\\\"|score)\\s*[:=]\\s*(\\d+(?:\\.\\d+)?)", Pattern.CASE_INSENSITIVE);

    private final UserRepository users;
    private final ActivityRepository activities;
    private final StudyTaskRepository tasks;

    public DashboardService() {
        this.users = null;
        this.activities = null;
        this.tasks = null;
    }

    @Autowired
    public DashboardService(UserRepository users, ActivityRepository activities, StudyTaskRepository tasks) {
        this.users = users;
        this.activities = activities;
        this.tasks = tasks;
    }

    public DashboardResponse buildDashboard(String userId) {
        User user = users.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found."));
        List<Activity> userActivities = activities.findByUser_IdOrderByCreatedAtDesc(userId);
        List<StudyTask> userTasks = tasks.findAllByUser_Id(userId);
        LocalDate today = LocalDate.now();

        long dsaSolved = count(userActivities, ActivityType.DSA_SOLVED);
        long interviews = count(userActivities, ActivityType.MOCK_INTERVIEW_COMPLETED);
        List<StudyTask> todayTasks = userTasks.stream().filter(task -> today.equals(task.getDueDate())).toList();
        long studyMinutes = userTasks.stream().filter(StudyTask::isDone)
                .mapToLong(task -> task.getDuration() == null ? 0 : task.getDuration()).sum();
        Integer taskProgress = todayTasks.isEmpty() ? null
                : (int) Math.round(todayTasks.stream().filter(StudyTask::isDone).count() * 100.0 / todayTasks.size());

        return new DashboardResponse(
                user.getName(), dsaSolved, studyMinutes, Math.max(0, user.getStreak()), user.getXp() == null ? 0 : user.getXp(),
                interviews, averageScore(userActivities), taskProgress, sectionProgress(userActivities),
                activityPoints(userActivities, today.minusDays(6), today), activityPoints(userActivities, today.minusDays(29), today),
                todayTasks.stream().map(this::mapTask).toList(),
                userActivities.stream().limit(8).map(this::mapActivity).toList(),
                userTasks.stream().filter(task -> task.getDueDate() != null && task.getDueDate().isAfter(today))
                        .sorted(Comparator.comparing(StudyTask::getDueDate)).limit(8).map(this::mapTask).toList(),
                weakAreas(userActivities, todayTasks)
        );
    }

    public DashboardResponse buildDashboard(User user, List<Activity> userActivities, List<StudyTask> userTasks) {
        LocalDate today = LocalDate.now();
        List<StudyTask> todayTasks = userTasks.stream().filter(task -> today.equals(task.getDueDate())).toList();
        long dsaSolved = count(userActivities, ActivityType.DSA_SOLVED);
        long interviews = count(userActivities, ActivityType.MOCK_INTERVIEW_COMPLETED);
        Integer progress = todayTasks.isEmpty() ? null
                : (int) Math.round(todayTasks.stream().filter(StudyTask::isDone).count() * 100.0 / todayTasks.size());
        return new DashboardResponse(user.getName(), dsaSolved,
                userTasks.stream().filter(StudyTask::isDone).mapToLong(task -> task.getDuration() == null ? 0 : task.getDuration()).sum(),
                Math.max(0, user.getStreak()), user.getXp() == null ? 0 : user.getXp(), interviews,
                averageScore(userActivities), progress, sectionProgress(userActivities), List.of(), List.of(),
                todayTasks.stream().map(this::mapTask).toList(), userActivities.stream().limit(8).map(this::mapActivity).toList(), List.of(),
                weakAreas(userActivities, todayTasks));
    }

    private long count(List<Activity> userActivities, ActivityType type) {
        return userActivities.stream().filter(activity -> activity.getType() == type).count();
    }

    private List<DashboardResponse.SectionProgress> sectionProgress(List<Activity> userActivities) {
        return List.of(
                section("DSA", userActivities, ActivityType.DSA_SOLVED),
                section("Aptitude", userActivities, ActivityType.APTITUDE_COMPLETED),
                section("Interviews", userActivities, ActivityType.MOCK_INTERVIEW_COMPLETED),
                section("Resume", userActivities, ActivityType.RESUME_ANALYZED),
                section("Study Planner", userActivities, ActivityType.STUDY_TASK_COMPLETED)
        );
    }

    private DashboardResponse.SectionProgress section(String name, List<Activity> userActivities, ActivityType type) {
        return new DashboardResponse.SectionProgress(name, null, count(userActivities, type));
    }

    private List<DashboardResponse.ActivityPoint> activityPoints(List<Activity> userActivities, LocalDate start, LocalDate end) {
        List<DashboardResponse.ActivityPoint> points = new ArrayList<>();
        for (LocalDate date = start; !date.isAfter(end); date = date.plusDays(1)) {
            LocalDate pointDate = date;
            long count = userActivities.stream().filter(activity -> activity.getCreatedAt() != null
                && activity.getCreatedAt().atZone(ZoneOffset.UTC).toLocalDate().equals(pointDate)).count();
            points.add(new DashboardResponse.ActivityPoint(date.toString(), count));
        }
        return points;
    }

    private Double averageScore(List<Activity> userActivities) {
        List<Double> scores = userActivities.stream().filter(activity -> activity.getType() == ActivityType.APTITUDE_COMPLETED)
                .map(Activity::getMetadata).map(this::score).filter(Objects::nonNull).toList();
        return scores.isEmpty() ? null : scores.stream().mapToDouble(Double::doubleValue).average().orElse(0);
    }

    private Double score(String metadata) {
        if (metadata == null) return null;
        Matcher matcher = SCORE_PATTERN.matcher(metadata);
        return matcher.find() ? Double.valueOf(matcher.group(1)) : null;
    }

    private DashboardResponse.TaskItem mapTask(StudyTask task) {
        return new DashboardResponse.TaskItem(task.getId(), task.getTitle(), task.getSubject(), task.getDuration(),
                task.isDone(), task.getDueDate() == null ? null : task.getDueDate().toString());
    }

    private DashboardResponse.ActivityItem mapActivity(Activity activity) {
        return new DashboardResponse.ActivityItem(activity.getId(), activity.getType().name(), activity.getMetadata(),
                activity.getCreatedAt() == null ? null : activity.getCreatedAt().toString());
    }

    private List<String> weakAreas(List<Activity> userActivities, List<StudyTask> todayTasks) {
        List<String> areas = new ArrayList<>();
        if (count(userActivities, ActivityType.DSA_SOLVED) == 0) areas.add("DSA");
        if (count(userActivities, ActivityType.APTITUDE_COMPLETED) == 0) areas.add("Aptitude");
        if (todayTasks.isEmpty()) areas.add("Study Planner");
        return areas;
    }
}
