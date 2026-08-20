package com.prepflow.planner;
import com.prepflow.user.UserRepository; import jakarta.validation.Valid; import jakarta.validation.constraints.*; import java.time.LocalDate; import java.util.List; import org.springframework.security.core.annotation.AuthenticationPrincipal; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/planner") public class PlannerController {
 private final StudyTaskRepository tasks; private final UserRepository users; public PlannerController(StudyTaskRepository tasks,UserRepository users){this.tasks=tasks;this.users=users;}
 @GetMapping("/today") List<TaskResponse> today(@AuthenticationPrincipal String id){return map(tasks.findByUserIdAndDueDateOrderByDoneAsc(id,LocalDate.now()));}
 @GetMapping("/upcoming") List<TaskResponse> upcoming(@AuthenticationPrincipal String id){return map(tasks.findByUserIdAndDueDateGreaterThanOrderByDueDateAsc(id,LocalDate.now()));}
 @PostMapping("/tasks") TaskResponse create(@AuthenticationPrincipal String id,@Valid @RequestBody TaskRequest r){StudyTask t=new StudyTask();t.setUser(users.getReferenceById(id));apply(t,r);return TaskResponse.from(tasks.save(t));}
 @PutMapping("/tasks/{taskId}") TaskResponse update(@AuthenticationPrincipal String id,@PathVariable String taskId,@RequestBody TaskRequest r){StudyTask t=tasks.findByIdAndUserId(taskId,id).orElseThrow(()->new IllegalArgumentException("Task not found."));apply(t,r);return TaskResponse.from(tasks.save(t));}
 @DeleteMapping("/tasks/{taskId}") void delete(@AuthenticationPrincipal String id,@PathVariable String taskId){tasks.delete(tasks.findByIdAndUserId(taskId,id).orElseThrow(()->new IllegalArgumentException("Task not found.")));}
 private void apply(StudyTask t,TaskRequest r){if(r.title()!=null)t.setTitle(r.title());if(r.subject()!=null)t.setSubject(r.subject());if(r.type()!=null)t.setType(r.type());if(r.duration()!=null)t.setDuration(r.duration());if(r.done()!=null)t.setDone(r.done());if(r.dueDate()!=null)t.setDueDate(r.dueDate());}
 private List<TaskResponse> map(List<StudyTask> t){return t.stream().map(TaskResponse::from).toList();}
 public record TaskRequest(@Size(min=1,max=160) String title,@Size(max=100) String subject,@Size(max=60) String type,@Positive Integer duration,Boolean done,LocalDate dueDate){}
 public record TaskResponse(String id,String title,String subject,String type,Integer duration,boolean done,LocalDate dueDate){static TaskResponse from(StudyTask t){return new TaskResponse(t.getId(),t.getTitle(),t.getSubject(),t.getType(),t.getDuration(),t.isDone(),t.getDueDate());}}
}
