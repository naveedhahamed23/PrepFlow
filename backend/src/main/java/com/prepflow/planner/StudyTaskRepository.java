package com.prepflow.planner;
import java.time.LocalDate; import java.util.*; import org.springframework.data.jpa.repository.JpaRepository;
public interface StudyTaskRepository extends JpaRepository<StudyTask,String> { List<StudyTask> findByUserIdAndDueDateOrderByDoneAsc(String userId, LocalDate date); List<StudyTask> findByUserIdAndDueDateGreaterThanOrderByDueDateAsc(String userId, LocalDate date); Optional<StudyTask> findByIdAndUserId(String id,String userId); }
