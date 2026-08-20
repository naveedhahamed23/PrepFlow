package com.prepflow.user;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "app_users", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class User {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(nullable = false) private String name;
    @Column(nullable = false, unique = true) private String email;
    @Column(nullable = false) private String password;
    private String role = "Student";
    private String college;
    private String branch;
    @Column(name = "study_year") private String year;
    private Integer xp = 0;
    private Integer level = 1;
    private Integer streak = 0;
    private Instant joinedOn = Instant.now();

    public String getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email.toLowerCase().trim(); }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getRole() { return role; }
    public String getCollege() { return college; }
    public void setCollege(String college) { this.college = college; }
    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }
    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }
    public Integer getXp() { return xp; }
    public Integer getLevel() { return level; }
    public Integer getStreak() { return streak; }
    public Instant getJoinedOn() { return joinedOn; }
}
