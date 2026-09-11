package com.prepflow.aptitude;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AptitudeTopicRepository extends JpaRepository<AptitudeTopic, String> {
    List<AptitudeTopic> findAllByUser_IdOrderByNameAsc(String userId);
    Optional<AptitudeTopic> findByIdAndUser_Id(String id, String userId);
}
