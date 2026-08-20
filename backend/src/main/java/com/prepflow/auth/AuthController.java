package com.prepflow.auth;

import com.prepflow.security.jwt.JwtService;
import com.prepflow.user.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository users; private final PasswordEncoder encoder; private final JwtService jwt;
    public AuthController(UserRepository users, PasswordEncoder encoder, JwtService jwt) { this.users = users; this.encoder = encoder; this.jwt = jwt; }
    @PostMapping("/register") public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        if (users.existsByEmail(request.email())) throw new IllegalArgumentException("An account with this email already exists.");
        User user = new User(); user.setName(request.name().trim()); user.setEmail(request.email()); user.setPassword(encoder.encode(request.password()));
        users.save(user); return ResponseEntity.status(HttpStatus.CREATED).body(response(user));
    }
    @PostMapping("/login") public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        User user = users.findByEmail(request.email().toLowerCase().trim()).filter(u -> encoder.matches(request.password(), u.getPassword())).orElseThrow(() -> new UnauthorizedException("Invalid email or password."));
        return response(user);
    }
    @PostMapping("/logout") public MessageResponse logout() { return new MessageResponse("Logged out"); }
    private AuthResponse response(User user) { return new AuthResponse(jwt.generateToken(user.getId(), user.getEmail()), UserResponse.from(user)); }
    public record LoginRequest(@NotBlank @Email String email, @NotBlank String password) {}
    public record RegisterRequest(@NotBlank @Size(max=100) String name, @NotBlank @Email String email, @NotBlank @Size(min=6,max=100) String password) {}
    public record AuthResponse(String token, UserResponse user) {}
    public record MessageResponse(String message) {}
    public static class UnauthorizedException extends RuntimeException { public UnauthorizedException(String message) { super(message); } }
}
