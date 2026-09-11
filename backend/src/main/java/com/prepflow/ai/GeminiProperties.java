package com.prepflow.ai;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Typed binding for all gemini.api.* properties from application.properties.
 * Values are injected from environment variables via the property placeholder:
 *   gemini.api.key  → ${GEMINI_API_KEY}
 *   gemini.api.model → ${GEMINI_MODEL}
 *
 * The API key is NEVER exposed to the frontend or logged.
 */
@ConfigurationProperties(prefix = "gemini.api")
public class GeminiProperties {

    /** API key — read from GEMINI_API_KEY env var. Never log or return this value. */
    private String key;

    /** Gemini model name, e.g. gemini-2.0-flash-lite */
    private String model = "gemini-2.0-flash-lite";

    /** Gemini REST base URL */
    private String baseUrl = "https://generativelanguage.googleapis.com/v1beta";

    public String getKey() { return key; }
    public void setKey(String key) { this.key = key; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getBaseUrl() { return baseUrl; }
    public void setBaseUrl(String baseUrl) { this.baseUrl = baseUrl; }
}
