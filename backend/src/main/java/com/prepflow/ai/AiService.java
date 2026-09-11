package com.prepflow.ai;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * AiService — orchestrates PrepFlow AI chat requests.
 *
 * Responsibilities:
 *   1. Build the full system instruction (base + user context).
 *   2. Delegate to GeminiAiService for AI generation.
 *   3. Return a clean AiChatResponse DTO.
 *
 * Architecture:
 *   AiController
 *       └── AiService
 *               ├── PrepFlowContextBuilder  (user context, future)
 *               └── GeminiAiService         (Gemini REST API)
 *
 * AiService is the correct place to:
 *   - Inject PrepFlow user context in the future
 *   - Switch AI providers (swap GeminiAiService for another)
 *   - Add conversation history management
 *   - Apply rate limiting per user
 */
@Service
public class AiService {

    private static final Logger log = LoggerFactory.getLogger(AiService.class);

    private final GeminiAiService geminiAiService;
    private final PrepFlowContextBuilder contextBuilder;

    public AiService(GeminiAiService geminiAiService, PrepFlowContextBuilder contextBuilder) {
        this.geminiAiService = geminiAiService;
        this.contextBuilder = contextBuilder;
    }

    /**
     * Process a chat message and return a PrepFlow AI response.
     *
     * @param request the user's chat request
     * @param userId  the authenticated user's ID (used for context building; may be null for now)
     * @return the AI's response
     */
    public AiChatResponse chat(AiChatRequest request, String userId) {
        log.debug("Processing AI chat request for user={}", userId);

        // Build system instruction = base PrepFlow prompt + optional user context
        String userContext = contextBuilder.buildContext(userId);
        String fullSystemInstruction = userContext.isBlank()
                ? PrepFlowSystemPrompt.SYSTEM_INSTRUCTION
                : PrepFlowSystemPrompt.SYSTEM_INSTRUCTION + "\n\n" + userContext;

        // Delegate to Gemini
        String responseText = geminiAiService.generate(fullSystemInstruction, request.getMessage());

        return new AiChatResponse(responseText);
    }
}
