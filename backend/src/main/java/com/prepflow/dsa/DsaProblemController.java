package com.prepflow.dsa;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.prepflow.user.UserRepository;

@RestController
@RequestMapping("/api/dsa")
public class DsaProblemController {
    private final DsaProblemRepository problems;
    private final UserRepository users;

    public DsaProblemController(DsaProblemRepository problems, UserRepository users) {
        this.problems = problems;
        this.users = users;
    }

    @GetMapping("/problems")
    public List<ProblemResponse> list(
            @AuthenticationPrincipal String userId,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "All") String difficulty,
            @RequestParam(defaultValue = "All") String status,
            @RequestParam(defaultValue = "All") String topic,
            @RequestParam(defaultValue = "All") String company) {
        String query = search.trim().toLowerCase();
        return problems.findAllByUser_IdOrderByTitleAsc(userId).stream()
                .filter(problem -> query.isEmpty() || problem.getTitle().toLowerCase().contains(query))
                .filter(problem -> "All".equals(difficulty) || problem.getDifficulty().equals(difficulty))
                .filter(problem -> "All".equals(status) || problem.getStatus().equals(status))
                .filter(problem -> "All".equals(topic) || problem.getTopic().equals(topic))
                .filter(problem -> "All".equals(company) || problem.getCompanies().contains(company))
                .map(ProblemResponse::from)
                .toList();
    }

    @GetMapping("/problems/{id}")
    public ProblemResponse get(@AuthenticationPrincipal String userId, @PathVariable String id) {
        return ProblemResponse.from(find(id, userId));
    }

    @PostMapping("/problems")
    @ResponseStatus(HttpStatus.CREATED)
    public ProblemResponse create(@AuthenticationPrincipal String userId, @RequestBody ProblemRequest request) {
        DsaProblem problem = new DsaProblem();
        problem.setUser(users.getReferenceById(userId));
        apply(problem, request);
        return ProblemResponse.from(problems.save(problem));
    }

    @PutMapping("/problems/{id}")
    public ProblemResponse update(@AuthenticationPrincipal String userId, @PathVariable String id, @RequestBody ProblemRequest request) {
        DsaProblem problem = find(id, userId);
        apply(problem, request);
        return ProblemResponse.from(problems.save(problem));
    }

    @DeleteMapping("/problems/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@AuthenticationPrincipal String userId, @PathVariable String id) {
        problems.delete(find(id, userId));
    }

    @GetMapping("/stats/topics")
    public List<TopicStat> topicStats(@AuthenticationPrincipal String userId) {
        return problems.findAllByUser_IdOrderByTitleAsc(userId).stream()
                .collect(java.util.stream.Collectors.groupingBy(DsaProblem::getTopic))
                .entrySet().stream()
                .map(entry -> new TopicStat(entry.getKey(), (int) entry.getValue().stream().filter(problem -> "Solved".equals(problem.getStatus())).count(), entry.getValue().size()))
                .sorted(Comparator.comparing(TopicStat::topic))
                .toList();
    }

    private DsaProblem find(String id, String userId) {
        return problems.findByIdAndUser_Id(id, userId).orElseThrow(() -> new IllegalArgumentException("Problem not found."));
    }

    private void apply(DsaProblem problem, ProblemRequest request) {
        if (request.title() != null) problem.setTitle(request.title());
        if (request.topic() != null) problem.setTopic(request.topic());
        if (request.difficulty() != null) problem.setDifficulty(request.difficulty());
        if (request.status() != null) problem.setStatus(request.status());
        if (request.companies() != null) problem.setCompanies(request.companies());
        if (request.revisionDate() != null) problem.setRevisionDate(request.revisionDate());
        if (request.solvedOn() != null) problem.setSolvedOn(request.solvedOn());
        if (request.timeTaken() != null) problem.setTimeTaken(request.timeTaken());
        if (request.notes() != null) problem.setNotes(request.notes());
        if (request.url() != null) problem.setUrl(request.url());
    }

    public record ProblemRequest(String title, String topic, String difficulty, String status, Set<String> companies,
            LocalDate revisionDate, LocalDate solvedOn, Integer timeTaken, String notes, String url) {}

    public record ProblemResponse(String id, String title, String topic, String difficulty, String status, Set<String> companies,
            LocalDate revisionDate, LocalDate solvedOn, Integer timeTaken, String notes, String url) {
        static ProblemResponse from(DsaProblem problem) {
            return new ProblemResponse(problem.getId(), problem.getTitle(), problem.getTopic(), problem.getDifficulty(), problem.getStatus(),
                    problem.getCompanies(), problem.getRevisionDate(), problem.getSolvedOn(), problem.getTimeTaken(), problem.getNotes(), problem.getUrl());
        }
    }

    public record TopicStat(String topic, int solved, int total) {}
}
