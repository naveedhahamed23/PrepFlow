package com.prepflow.common;
import java.util.Map;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api") public class HealthController { @GetMapping("/health") Map<String,String> health(){return Map.of("status","ok","service","prepflow-api");} }
