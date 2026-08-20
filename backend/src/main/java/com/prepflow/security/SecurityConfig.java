package com.prepflow.security;

import com.prepflow.security.jwt.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.*;

@Configuration public class SecurityConfig {
    @Bean PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }
    @Bean SecurityFilterChain filterChain(HttpSecurity http, JwtAuthenticationFilter jwtFilter, JwtAuthenticationEntryPoint entryPoint) throws Exception {
        return http.csrf(csrf -> csrf.disable()).cors(cors -> {}).sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).exceptionHandling(e -> e.authenticationEntryPoint(entryPoint)).authorizeHttpRequests(a -> a.requestMatchers("/api/auth/**", "/api/health").permitAll().anyRequest().authenticated()).addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class).build();
    }
    @Bean CorsConfigurationSource corsConfigurationSource(@Value("${app.cors.allowed-origin}") String origin) {
        CorsConfiguration config = new CorsConfiguration(); config.setAllowedOrigins(java.util.List.of(origin)); config.setAllowedMethods(java.util.List.of("GET","POST","PUT","PATCH","DELETE","OPTIONS")); config.setAllowedHeaders(java.util.List.of("Authorization","Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(); source.registerCorsConfiguration("/**", config); return source;
    }
}
