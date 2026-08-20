package com.prepflow.user;
import java.time.Instant;
public record UserResponse(String id, String name, String email, String role, String college, String branch, String year, Integer xp, Integer level, Integer streak, Instant joinedOn) {
    public static UserResponse from(User user) { return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole(), user.getCollege(), user.getBranch(), user.getYear(), user.getXp(), user.getLevel(), user.getStreak(), user.getJoinedOn()); }
}
