package com.prepflow.planner;
import com.prepflow.user.User;
import jakarta.persistence.*;
import java.time.*;
@Entity public class StudyTask {
 @Id @GeneratedValue(strategy = GenerationType.UUID) private String id;
 @ManyToOne(optional=false, fetch=FetchType.LAZY) private User user;
 @Column(nullable=false) private String title; private String subject; private String type; private Integer duration; private boolean done; private LocalDate dueDate;
 public String getId(){return id;} public User getUser(){return user;} public void setUser(User user){this.user=user;} public String getTitle(){return title;} public void setTitle(String title){this.title=title;} public String getSubject(){return subject;} public void setSubject(String subject){this.subject=subject;} public String getType(){return type;} public void setType(String type){this.type=type;} public Integer getDuration(){return duration;} public void setDuration(Integer duration){this.duration=duration;} public boolean isDone(){return done;} public void setDone(boolean done){this.done=done;} public LocalDate getDueDate(){return dueDate;} public void setDueDate(LocalDate dueDate){this.dueDate=dueDate;}
}
