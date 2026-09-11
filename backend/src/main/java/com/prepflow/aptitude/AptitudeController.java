package com.prepflow.aptitude;

import com.prepflow.user.UserRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/aptitude")
public class AptitudeController {
    private final AptitudeTopicRepository topics;
    private final UserRepository users;

    public AptitudeController(AptitudeTopicRepository topics, UserRepository users) {
        this.topics = topics;
        this.users = users;
    }

    @GetMapping("/topics")
    public List<TopicResponse> topics(@AuthenticationPrincipal String userId) {
        return topics.findAllByUser_IdOrderByNameAsc(userId).stream().map(TopicResponse::from).toList();
    }

    @GetMapping("/analytics")
    public List<AnalyticsPoint> analytics(@AuthenticationPrincipal String userId) {
        return topics.findAllByUser_IdOrderByNameAsc(userId).stream()
                .collect(java.util.stream.Collectors.groupingBy(AptitudeTopic::getCategory))
                .entrySet().stream()
                .map(entry -> new AnalyticsPoint(entry.getKey(), average(entry.getValue())))
                .sorted(java.util.Comparator.comparing(AnalyticsPoint::topic))
                .toList();
    }

    @GetMapping("/summary")
    public SummaryResponse summary(@AuthenticationPrincipal String userId) {
        List<AptitudeTopic> userTopics = topics.findAllByUser_IdOrderByNameAsc(userId);
        int attempted = userTopics.stream().mapToInt(AptitudeTopic::getCompleted).sum();
        int averageAccuracy = userTopics.isEmpty() ? 0 : average(userTopics);
        return new SummaryResponse(attempted, averageAccuracy, 0, 0);
    }

    @PostMapping("/topics")
    @ResponseStatus(HttpStatus.CREATED)
    public TopicResponse create(@AuthenticationPrincipal String userId, @RequestBody TopicRequest request) {
        AptitudeTopic topic = new AptitudeTopic();
        topic.setUser(users.getReferenceById(userId));
        apply(topic, request);
        return TopicResponse.from(topics.save(topic));
    }

    @PutMapping("/topics/{id}")
    public TopicResponse update(@AuthenticationPrincipal String userId, @PathVariable String id, @RequestBody TopicRequest request) {
        AptitudeTopic topic = find(id, userId);
        apply(topic, request);
        return TopicResponse.from(topics.save(topic));
    }

    @DeleteMapping("/topics/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@AuthenticationPrincipal String userId, @PathVariable String id) {
        topics.delete(find(id, userId));
    }

    private AptitudeTopic find(String id, String userId) {
        return topics.findByIdAndUser_Id(id, userId).orElseThrow(() -> new IllegalArgumentException("Aptitude topic not found."));
    }

    private void apply(AptitudeTopic topic, TopicRequest request) {
        if (request.name() != null) topic.setName(request.name());
        if (request.category() != null) topic.setCategory(request.category());
        if (request.difficulty() != null) topic.setDifficulty(request.difficulty());
        if (request.completed() != null) topic.setCompleted(Math.max(0, request.completed()));
        if (request.total() != null) topic.setTotal(Math.max(0, request.total()));
        if (request.accuracy() != null) topic.setAccuracy(Math.max(0, Math.min(100, request.accuracy())));
        if (request.icon() != null) topic.setIcon(request.icon());
    }

    private int average(List<AptitudeTopic> values) {
        return (int) Math.round(values.stream().mapToInt(AptitudeTopic::getAccuracy).average().orElse(0));
    }

    public record TopicRequest(String name, String category, String difficulty, Integer completed, Integer total, Integer accuracy, String icon) {}
    public record TopicResponse(String id, String name, String category, String difficulty, int completed, int total, int accuracy, String icon) {
        static TopicResponse from(AptitudeTopic topic) {
            return new TopicResponse(topic.getId(), topic.getName(), topic.getCategory(), topic.getDifficulty(), topic.getCompleted(), topic.getTotal(), topic.getAccuracy(), topic.getIcon());
        }
    }
    public record AnalyticsPoint(String topic, int accuracy) {}
    public record SummaryResponse(int questionsAttempted, int averageAccuracy, int testsCompleted, int studyMinutes) {}
}
