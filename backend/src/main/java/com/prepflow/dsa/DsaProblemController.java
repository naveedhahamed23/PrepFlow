package com.prepflow.dsa;
import java.util.Comparator;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    private final DsaCatalogProblemRepository catalogProblems;

   public DsaProblemController(
        DsaProblemRepository problems,
        UserRepository users,
        DsaCatalogProblemRepository catalogProblems) {

    this.problems = problems;
    this.users = users;
    this.catalogProblems = catalogProblems;
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
                .filter(problem -> query.isEmpty()
                        || problem.getTitle().toLowerCase().contains(query))
                .filter(problem -> "All".equals(difficulty)
                        || problem.getDifficulty().equals(difficulty))
                .filter(problem -> "All".equals(status)
                        || problem.getStatus().equals(status))
                .filter(problem -> "All".equals(topic)
                        || problem.getTopic().equals(topic))
                .filter(problem -> "All".equals(company)
                        || problem.getCompanies().contains(company))
                .map(ProblemResponse::from)
                .toList();
    }

    @GetMapping("/problems/{id}")
    public ProblemResponse get(
            @AuthenticationPrincipal String userId,
            @PathVariable String id) {

        return ProblemResponse.from(find(id, userId));
    }

    @PostMapping("/problems")
    @ResponseStatus(HttpStatus.CREATED)
    public ProblemResponse create(
            @AuthenticationPrincipal String userId,
            @RequestBody ProblemRequest request) {

        DsaProblem problem = new DsaProblem();
        problem.setUser(users.getReferenceById(userId));

        apply(problem, request);

        return ProblemResponse.from(problems.save(problem));
    }

    @PutMapping("/problems/{id}")
    public ProblemResponse update(
            @AuthenticationPrincipal String userId,
            @PathVariable String id,
            @RequestBody ProblemRequest request) {

        DsaProblem problem = find(id, userId);

        apply(problem, request);

        return ProblemResponse.from(problems.save(problem));
    }

    @DeleteMapping("/problems/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
            @AuthenticationPrincipal String userId,
            @PathVariable String id) {

        problems.delete(find(id, userId));
    }
    @GetMapping("/stats")
public DsaStats stats(
        @AuthenticationPrincipal String userId) {

    List<DsaProblem> userProblems =
            problems.findAllByUser_IdOrderByTitleAsc(userId);

    int totalTracked = userProblems.size();

    int solvedCount = (int) userProblems.stream()
            .filter(p -> "Solved".equals(p.getStatus()))
            .count();

    LocalDate today = LocalDate.now();
    LocalDate weekStart = today.minusDays(6);

    int thisWeekCount = (int) userProblems.stream()
            .filter(p -> "Solved".equals(p.getStatus()))
            .filter(p -> p.getSolvedOn() != null)
            .filter(p -> !p.getSolvedOn().isBefore(weekStart))
            .filter(p -> !p.getSolvedOn().isAfter(today))
            .count();

    int revisionPendingCount = (int) userProblems.stream()
            .filter(p -> p.getRevisionDate() != null)
            .filter(p -> !p.getRevisionDate().isAfter(today))
            .count();
List<String> topics = List.of(
        "Arrays",
        "Strings",
        "Linked Lists",
        "Stacks",
        "Queues",
        "Trees",
        "Graphs",
        "Dynamic Programming",
        "Greedy",
        "Backtracking",
        "Binary Search",
        "Sorting",
        "Two Pointers",
        "Sliding Window",
        "Heap",
        "Hashing",
        "Recursion",
        "Others"
);

List<TopicStat> topicProgress = topics.stream()
        .map(topic -> {

            // Total = all problems available in the PrepFlow catalog
            int total = catalogProblems
                    .findAllByTopicOrderByTitleAsc(topic)
                    .size();

            // Solved = only this user's solved problems
            int solved = (int) userProblems.stream()
                    .filter(p -> topic.equals(p.getTopic()))
                    .filter(p -> "Solved".equals(p.getStatus()))
                    .count();

            return new TopicStat(topic, solved, total);
        })
        .toList();
  Map<String, Integer> companyCounts = new HashMap<>();

userProblems.stream()
        .filter(p -> "Solved".equals(p.getStatus()))
        .forEach(p -> {

            DsaCatalogProblem catalogProblem = null;

            // First try matching by LeetCode URL/slug.
            if (p.getUrl() != null && !p.getUrl().isBlank()) {

                String slug = extractLeetCodeSlug(p.getUrl());

                if (slug != null) {
                    catalogProblem = catalogProblems
                            .findByPlatformAndSlug("LeetCode", slug)
                            .orElse(null);
                }
            }

            // If URL matching failed, match by title.
            if (catalogProblem == null
                    && p.getTitle() != null
                    && !p.getTitle().isBlank()) {

                catalogProblem = catalogProblems
                        .findByTitleIgnoreCase(p.getTitle())
                        .orElse(null);
            }

            // Use catalog companies when a match exists.
            if (catalogProblem != null) {

                for (String company : catalogProblem.getCompanies()) {
                    companyCounts.merge(company, 1, Integer::sum);
                }

            } else {

                // Fallback for manually added problems
                // that are not in the catalog.
                for (String company : p.getCompanies()) {

                    if ("LeetCode".equalsIgnoreCase(company)) {
                        continue;
                    }

                    companyCounts.merge(company, 1, Integer::sum);
                }
            }
        });

List<CompanyStat> companyDistribution = companyCounts.entrySet()
        .stream()
        .map(entry -> new CompanyStat(
                entry.getKey(),
                entry.getValue()))
        .sorted(Comparator.comparing(CompanyStat::count).reversed())
        .toList();

    int easy = (int) userProblems.stream()
            .filter(p -> "Solved".equals(p.getStatus()))
            .filter(p -> "Easy".equals(p.getDifficulty()))
            .count();

    int medium = (int) userProblems.stream()
            .filter(p -> "Solved".equals(p.getStatus()))
            .filter(p -> "Medium".equals(p.getDifficulty()))
            .count();

    int hard = (int) userProblems.stream()
            .filter(p -> "Solved".equals(p.getStatus()))
            .filter(p -> "Hard".equals(p.getDifficulty()))
            .count();

    return new DsaStats(
            totalTracked,
            solvedCount,
            thisWeekCount,
            revisionPendingCount,
            topicProgress,
            new DifficultyBreakdown(easy, medium, hard),
            companyDistribution
    );
}

    @GetMapping("/stats/topics")
    public List<TopicStat> topicStats(
            @AuthenticationPrincipal String userId) {

        return problems.findAllByUser_IdOrderByTitleAsc(userId)
                .stream()
                .collect(java.util.stream.Collectors.groupingBy(
                        DsaProblem::getTopic))
                .entrySet()
                .stream()
                .map(entry -> new TopicStat(
                        entry.getKey(),
                        (int) entry.getValue()
                                .stream()
                                .filter(problem ->
                                        "Solved".equals(problem.getStatus()))
                                .count(),
                        entry.getValue().size()))
                .sorted(Comparator.comparing(TopicStat::topic))
                .toList();
    }

    /*
     * Endpoint used by the PrepFlow browser extension when
     * a LeetCode problem is accepted.
     */
   @PostMapping("/extension/solved")
@ResponseStatus(HttpStatus.CREATED)
public ProblemResponse extensionSolved(
        @AuthenticationPrincipal String userId,
        @RequestBody ExtensionSolvedRequest request) {

    DsaProblem problem = problems
            .findByUser_IdAndUrl(userId, request.url())
            .orElseGet(() -> {
                DsaProblem newProblem = new DsaProblem();
                newProblem.setUser(users.getReferenceById(userId));
                return newProblem;
            });

    // Match the LeetCode problem against the PrepFlow catalog.
    DsaCatalogProblem catalogProblem = null;

    if (request.slug() != null && !request.slug().isBlank()) {
        catalogProblem = catalogProblems
                .findByPlatformAndSlug(
                        request.platform() != null
                                ? request.platform()
                                : "LeetCode",
                        request.slug())
                .orElse(null);
    }

    if (catalogProblem != null) {
        // Use trusted catalog metadata.
        problem.setTitle(catalogProblem.getTitle());
        problem.setTopic(catalogProblem.getTopic());
        problem.setDifficulty(catalogProblem.getDifficulty());
        problem.setCompanies(catalogProblem.getCompanies());
        problem.setUrl(catalogProblem.getUrl());
    } else {
        // Fallback for problems not yet in the catalog.
        problem.setTitle(request.title());
        problem.setTopic("Uncategorized");
        problem.setDifficulty(request.difficulty());
        problem.setUrl(request.url());
    }

    problem.setStatus("Solved");
    problem.setTimeTaken(request.timeTaken());
    problem.setSolvedOn(request.solvedOn());

    return ProblemResponse.from(problems.save(problem));
}
@PostMapping("/sync-catalog")
public List<ProblemResponse> syncWithCatalog(
        @AuthenticationPrincipal String userId) {

    List<DsaProblem> userProblems =
            problems.findAllByUser_IdOrderByTitleAsc(userId);

    for (DsaProblem problem : userProblems) {

        if (problem.getUrl() == null || problem.getUrl().isBlank()) {
            continue;
        }

        String slug = extractLeetCodeSlug(problem.getUrl());

        if (slug == null) {
            continue;
        }

        DsaCatalogProblem catalogProblem = catalogProblems
                .findByPlatformAndSlug("LeetCode", slug)
                .orElse(null);

        if (catalogProblem == null) {
            continue;
        }

        problem.setTitle(catalogProblem.getTitle());
        problem.setTopic(catalogProblem.getTopic());
        problem.setDifficulty(catalogProblem.getDifficulty());
        problem.setCompanies(catalogProblem.getCompanies());
        problem.setUrl(catalogProblem.getUrl());
    }

    return problems.saveAll(userProblems)
            .stream()
            .map(ProblemResponse::from)
            .toList();
}

private String extractLeetCodeSlug(String url) {

    String marker = "/problems/";

    int start = url.indexOf(marker);

    if (start == -1) {
        return null;
    }

    start += marker.length();

    int end = url.indexOf("/", start);

    if (end == -1) {
        end = url.length();
    }

    return url.substring(start, end);
}

    private DsaProblem find(String id, String userId) {
        return problems.findByIdAndUser_Id(id, userId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Problem not found."));
    }

    private void apply(DsaProblem problem, ProblemRequest request) {

        if (request.title() != null)
            problem.setTitle(request.title());

        if (request.topic() != null)
            problem.setTopic(request.topic());

        if (request.difficulty() != null)
            problem.setDifficulty(request.difficulty());

        if (request.status() != null)
            problem.setStatus(request.status());

        if (request.companies() != null)
            problem.setCompanies(request.companies());

        if (request.revisionDate() != null)
            problem.setRevisionDate(request.revisionDate());

        if (request.solvedOn() != null)
            problem.setSolvedOn(request.solvedOn());

        if (request.timeTaken() != null)
            problem.setTimeTaken(request.timeTaken());

        if (request.notes() != null)
            problem.setNotes(request.notes());

        if (request.url() != null)
            problem.setUrl(request.url());
        if (request.bookmarked() != null)
    problem.setBookmarked(request.bookmarked());
    }

    public record ProblemRequest(
            String title,
            String topic,
            String difficulty,
            String status,
            Set<String> companies,
            LocalDate revisionDate,
            LocalDate solvedOn,
            Integer timeTaken,
            String notes,
            String url,
            Boolean bookmarked) {
    }

    public record ExtensionSolvedRequest(
            String platform,
            String slug,
            String title,
            String difficulty,
            Integer timeTaken,
            LocalDate solvedOn,
            String url) {
    }

    public record ProblemResponse(
            String id,
            String title,
            String topic,
            String difficulty,
            String status,
            Set<String> companies,
            LocalDate revisionDate,
            LocalDate solvedOn,
            Integer timeTaken,
            String notes,
            String url,
            boolean bookmarked) {

        static ProblemResponse from(DsaProblem problem) {
            return new ProblemResponse(
                    problem.getId(),
                    problem.getTitle(),
                    problem.getTopic(),
                    problem.getDifficulty(),
                    problem.getStatus(),
                    problem.getCompanies(),
                    problem.getRevisionDate(),
                    problem.getSolvedOn(),
                    problem.getTimeTaken(),
                    problem.getNotes(),
                    problem.getUrl(),
                    problem.isBookmarked());
        }
    }

  public record TopicStat(
        String topic,
        int solved,
        int total) {
}

public record DsaStats(
        int totalTracked,
        int solvedCount,
        int thisWeekCount,
        int revisionPendingCount,
        List<TopicStat> topicProgress,
        DifficultyBreakdown difficultyBreakdown,
        List<CompanyStat> companyDistribution) {
}

public record DifficultyBreakdown(
        int easy,
        int medium,
        int hard) {
}

public record CompanyStat(
        String company,
        int count) {
}
}