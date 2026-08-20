package com.prepflow.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    private final SecretKey key; private final long expirationMs;
    public JwtService(@Value("${app.jwt.secret}") String secret, @Value("${app.jwt.expiration-ms}") long expirationMs) {
        if (secret.length() < 32) throw new IllegalStateException("JWT_SECRET must contain at least 32 characters.");
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)); this.expirationMs = expirationMs;
    }
    public String generateToken(String userId, String email) { return Jwts.builder().subject(userId).claim("email", email).issuedAt(new Date()).expiration(new Date(System.currentTimeMillis() + expirationMs)).signWith(key).compact(); }
    public String extractUserId(String token) { return claims(token).getSubject(); }
    public boolean isValid(String token) { try { claims(token); return true; } catch (JwtException | IllegalArgumentException ignored) { return false; } }
    private Claims claims(String token) { return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload(); }
}
