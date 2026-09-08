package com.prepflow.dashboard;

import com.prepflow.activity.Activity;
import com.prepflow.activity.ActivityType;
import com.prepflow.planner.StudyTask;
import com.prepflow.user.User;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class DashboardServiceTest {

    @Test
    void calculatesProgressFromUserActivitiesAndTasks() {
        User user = new User();
        user.setName("Jane");
        user.setEmail("jane@example.com");
        user.setPassword("encoded");

        Activity activity = new Activity();
        activity.setUser(user);
        activity.setType(ActivityType.DSA_SOLVED);
        activity.setCreatedAt(Instant.now());
        activity.setMetadata("{\"difficulty\":\"Easy\"}");

        StudyTask task = new StudyTask();
        task.setUser(user);
        task.setTitle("Revise arrays");
        task.setType("daily");
        task.setDuration(45);
        task.setDueDate(LocalDate.now());
        task.setDone(true);

        DashboardService service = new DashboardService();
        DashboardResponse response = service.buildDashboard(user, List.of(activity), List.of(task));

        assertThat(response.overallProgress()).isGreaterThanOrEqualTo(0);
        assertThat(response.totalTasksToday()).isEqualTo(1);
        assertThat(response.dsaSolvedCount()).isEqualTo(1);
    }
}
