package com.prepflow.activity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, String> {
    List<Activity> findByUser_IdOrderByCreatedAtDesc(String userId);
}
