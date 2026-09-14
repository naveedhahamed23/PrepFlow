package com.prepflow.dsa;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DsaProblemRepository extends JpaRepository<DsaProblem, String> {

    List<DsaProblem> findAllByUser_IdOrderByTitleAsc(String userId);

    Optional<DsaProblem> findByIdAndUser_Id(String id, String userId);

    Optional<DsaProblem> findByUser_IdAndUrl(String userId, String url);
}