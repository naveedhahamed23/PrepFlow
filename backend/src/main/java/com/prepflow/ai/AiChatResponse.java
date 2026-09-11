package com.prepflow.ai;

/**
 * Response DTO for POST /api/ai/chat.
 *
 * Returns only the AI's message text — never raw Gemini SDK objects,
 * API keys, or internal error details.
 */
public class AiChatResponse {

    private final String message;

    public AiChatResponse(String message) {
        this.message = message;
    }

    public String getMessage() { return message; }
}
