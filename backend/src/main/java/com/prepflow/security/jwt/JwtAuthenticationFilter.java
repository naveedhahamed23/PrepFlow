package com.prepflow.security.jwt;

import com.prepflow.user.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import java.io.IOException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwt; private final UserRepository users;
    public JwtAuthenticationFilter(JwtService jwt, UserRepository users) { this.jwt = jwt; this.users = users; }
    @Override protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            if (jwt.isValid(token) && SecurityContextHolder.getContext().getAuthentication() == null) {
                users.findById(jwt.extractUserId(token)).ifPresent(user -> {
                    var auth = new UsernamePasswordAuthenticationToken(user.getId(), null, java.util.List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().toUpperCase())));
                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); SecurityContextHolder.getContext().setAuthentication(auth);
                });
            }
        }
        chain.doFilter(request, response);
    }
}
