package com.prepflow.dsa;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DsaCatalogProblemRepository
        extends JpaRepository<DsaCatalogProblem, String> {

    Optional<DsaCatalogProblem> findBySlug(String slug);

    Optional<DsaCatalogProblem> findByPlatformAndSlug(
            String platform,
            String slug
    );

    List<DsaCatalogProblem> findAllByTopicOrderByTitleAsc(
            String topic
    );

    List<DsaCatalogProblem> findAllByOrderByTitleAsc();
    Optional<DsaCatalogProblem> findByTitleIgnoreCase(String title);
}