package com.prepflow.ai;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Request DTO for POST /api/ai/chat.
 *
 * Future: add conversationId, attachments, and contextHints
 * when PrepFlow module context is ready.
 */
public class AiChatRequest {

    @NotBlank(message = "message must not be blank")
    @Size(max = 32_000, message = "message must not exceed 32 000 characters")
    private String message;

    // Future field: user-supplied context (DSA progress, resume, etc.)
    // private PrepFlowContext context;

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
