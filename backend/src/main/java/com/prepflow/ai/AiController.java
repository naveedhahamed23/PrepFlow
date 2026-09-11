package com.prepflow.ai;

import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * AiController — REST endpoints for the PrepFlow AI Assistant.
 *
 * Endpoints:
 *   POST /api/ai/chat — send a message and receive an AI response
 *
 * The controller:
 *   - Validates the incoming request (@Valid)
 *   - Delegates entirely to AiService
 *   - Handles AiServiceException and returns user-friendly error responses
 *   - Never contains Gemini API logic
 *   - Never exposes secrets or raw error details to the client
 */
@RestController
@RequestMapping("/api/ai")
public class AiController {

    private static final Logger log = LoggerFactory.getLogger(AiController.class);

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    /**
     * POST /api/ai/chat
     *
     * Send a user message to PrepFlow AI and receive a response.
     *
     * Request:  { "message": "Explain binary search in Java" }
     * Response: { "message": "..." }
     *
     * Error:    { "message": "PrepFlow AI is temporarily unavailable. Please try again." }
     */
    @PostMapping("/chat")
    public ResponseEntity<AiChatResponse> chat(
            @Valid @RequestBody AiChatRequest request,
            @AuthenticationPrincipal String userId
    ) {
        try {
            AiChatResponse response = aiService.chat(request, userId);
            return ResponseEntity.ok(response);
        } catch (AiServiceException e) {
            // Return a clean, user-friendly error — never a raw stack trace
            log.warn("AI chat request failed for user={}: {}", userId, e.getMessage());
            return ResponseEntity
                    .status(503)
                    .body(new AiChatResponse(e.getMessage()));
        } catch (Exception e) {
            log.error("Unexpected error in AI chat for user={}", userId, e);
            return ResponseEntity
                    .status(500)
                    .body(new AiChatResponse("PrepFlow AI encountered an unexpected error. Please try again."));
        }
    }
}
