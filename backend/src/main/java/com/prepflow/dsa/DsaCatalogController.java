package com.prepflow.dsa;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dsa/catalog")
public class DsaCatalogController {

    private final DsaCatalogProblemRepository repository;

    public DsaCatalogController(DsaCatalogProblemRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<CatalogProblemResponse> getAllProblems() {
        return repository.findAllByOrderByTitleAsc()
                .stream()
                .map(CatalogProblemResponse::from)
                .toList();
    }

    @GetMapping("/{slug}")
    public CatalogProblemResponse getBySlug(
            @PathVariable String slug) {

        return repository.findBySlug(slug)
                .map(CatalogProblemResponse::from)
                .orElseThrow(() ->
                        new IllegalArgumentException("Catalog problem not found."));
    }

    @GetMapping("/topic/{topic}")
    public List<CatalogProblemResponse> getByTopic(
            @PathVariable String topic) {

        return repository.findAllByTopicOrderByTitleAsc(topic)
                .stream()
                .map(CatalogProblemResponse::from)
                .toList();
    }

    public record CatalogProblemResponse(
            String id,
            String platform,
            String slug,
            String title,
            String topic,
            String difficulty,
            java.util.Set<String> companies,
            String url) {

        static CatalogProblemResponse from(DsaCatalogProblem problem) {
            return new CatalogProblemResponse(
                    problem.getId(),
                    problem.getPlatform(),
                    problem.getSlug(),
                    problem.getTitle(),
                    problem.getTopic(),
                    problem.getDifficulty(),
                    problem.getCompanies(),
                    problem.getUrl()
            );
        }
    }
}