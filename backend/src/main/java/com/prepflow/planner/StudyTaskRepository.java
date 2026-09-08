package com.prepflow.planner;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyTaskRepository extends JpaRepository<StudyTask, String> {
    List<StudyTask> findByUser_IdAndDueDateOrderByDoneAsc(String userId, LocalDate date);
    List<StudyTask> findByUser_IdAndDueDateGreaterThanOrderByDueDateAsc(String userId, LocalDate date);
    List<StudyTask> findAllByUser_Id(String userId);
    Optional<StudyTask> findByIdAndUser_Id(String id, String userId);
}
