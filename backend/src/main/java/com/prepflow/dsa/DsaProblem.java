package com.prepflow.dsa;

import com.prepflow.user.User;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "dsa_problems")
public class DsaProblem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String topic;

    @Column(nullable = false)
    private String difficulty;

    @Column(nullable = false)
    private String status;

    @ElementCollection
    @CollectionTable(name = "dsa_problem_companies", joinColumns = @JoinColumn(name = "problem_id"))
    @Column(name = "company")
    private Set<String> companies = new LinkedHashSet<>();

    private LocalDate revisionDate;
    private LocalDate solvedOn;
    private Integer timeTaken;
    private String notes;
    private String url;

    public String getId() { return id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Set<String> getCompanies() { return companies; }
    public void setCompanies(Set<String> companies) { this.companies = companies == null ? new LinkedHashSet<>() : new LinkedHashSet<>(companies); }
    public LocalDate getRevisionDate() { return revisionDate; }
    public void setRevisionDate(LocalDate revisionDate) { this.revisionDate = revisionDate; }
    public LocalDate getSolvedOn() { return solvedOn; }
    public void setSolvedOn(LocalDate solvedOn) { this.solvedOn = solvedOn; }
    public Integer getTimeTaken() { return timeTaken; }
    public void setTimeTaken(Integer timeTaken) { this.timeTaken = timeTaken; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
}
