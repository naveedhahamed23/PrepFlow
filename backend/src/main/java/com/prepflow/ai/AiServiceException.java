package com.prepflow.ai;

/**
 * Thrown by GeminiAiService when AI generation fails for any reason.
 * The message is always safe to display to the user — it never contains
 * API keys, raw stack traces, or provider-internal details.
 */
public class AiServiceException extends RuntimeException {

    public AiServiceException(String message) {
        super(message);
    }

    public AiServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}
