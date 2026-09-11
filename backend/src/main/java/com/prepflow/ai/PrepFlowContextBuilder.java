package com.prepflow.ai;

import org.springframework.stereotype.Component;

/**
 * Builds additional user-specific context to append to the system prompt.
 *
 * Future architecture:
 *   AiService
 *       └── PrepFlowContextBuilder
 *               ├── DsaContextProvider      → DSA progress, weak topics
 *               ├── ResumeContextProvider   → user's resume text
 *               ├── AptitudeContextProvider → aptitude scores
 *               ├── InterviewContextProvider→ mock interview history
 *               ├── PlannerContextProvider  → study schedule
 *               └── AnalyticsContextProvider→ performance trends
 *
 * For now, returns an empty string (no user context injected).
 * When DSA/Resume/etc. modules are ready, inject their services here
 * and build a context string that gets appended to the system instruction.
 *
 * This design ensures GeminiAiService never needs to change when new
 * context sources are added.
 */
@Component
public class PrepFlowContextBuilder {

    /**
     * Build a context string for the given user.
     *
     * @param userId the authenticated user's ID (future use)
     * @return additional context to append to the system prompt, or empty string
     */
    public String buildContext(String userId) {
        // TODO: implement when user modules are connected
        // Example future implementation:
        //
        // StringBuilder ctx = new StringBuilder();
        // dsaContextProvider.getContext(userId).ifPresent(ctx::append);
        // resumeContextProvider.getContext(userId).ifPresent(ctx::append);
        // return ctx.toString();

        return "";
    }
}
