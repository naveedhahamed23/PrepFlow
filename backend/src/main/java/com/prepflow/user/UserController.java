package com.prepflow.user;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/users/me")
public class UserController {
    private final UserRepository users; private final PasswordEncoder encoder;
    public UserController(UserRepository users, PasswordEncoder encoder) { this.users = users; this.encoder = encoder; }
    @GetMapping public UserResponse profile(@AuthenticationPrincipal String id) { return UserResponse.from(user(id)); }
    @PutMapping public UserResponse update(@AuthenticationPrincipal String id, @Valid @RequestBody ProfileRequest request) {
        User user = user(id); if (request.name() != null) user.setName(request.name()); if (request.college() != null) user.setCollege(request.college()); if (request.branch() != null) user.setBranch(request.branch()); if (request.year() != null) user.setYear(request.year()); return UserResponse.from(users.save(user));
    }
    @PutMapping("/password") public MessageResponse password(@AuthenticationPrincipal String id, @Valid @RequestBody PasswordRequest request) {
        User user = user(id); if (!encoder.matches(request.currentPassword(), user.getPassword())) throw new IllegalArgumentException("Current password is incorrect."); user.setPassword(encoder.encode(request.newPassword())); users.save(user); return new MessageResponse("Password updated successfully.");
    }
    private User user(String id) { return users.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found.")); }
    public record ProfileRequest(@Size(min=1,max=100) String name, @Size(max=120) String college, @Size(max=120) String branch, @Size(max=40) String year) {}
    public record PasswordRequest(@NotBlank String currentPassword, @NotBlank @Size(min=6,max=100) String newPassword) {}
    public record MessageResponse(String message) {}
}
