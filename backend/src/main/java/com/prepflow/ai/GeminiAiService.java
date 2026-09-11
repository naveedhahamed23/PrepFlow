package com.prepflow.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

/**
 * GeminiAiService — communicates with the Google Gemini REST API.
 *
 * Responsibilities:
 *   1. Validate the API key is configured.
 *   2. Build the Gemini generateContent request JSON.
 *   3. Call the Gemini REST endpoint via Java's built-in HttpClient.
 *   4. Parse and return the text response.
 *   5. Handle all errors without exposing secrets or raw stack traces.
 *
 * This class is the ONLY place in the application that knows about Gemini.
 * The API key never leaves this class — it is never returned to callers,
 * never logged, and never included in any response DTO.
 *
 * Future: replace with a streaming implementation or official SDK when stable.
 */
@Service
public class GeminiAiService {

    private static final Logger log = LoggerFactory.getLogger(GeminiAiService.class);

    private final GeminiProperties props;
    private final ObjectMapper mapper;
    private final HttpClient httpClient;

    public GeminiAiService(GeminiProperties props) {
        this.props = props;
        this.mapper = new ObjectMapper();
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(15))
                .build();
    }

    /**
     * Send a message to Gemini with the PrepFlow system instruction.
     *
     * @param systemInstruction the PrepFlow AI system instruction
     * @param userMessage       the user's message text
     * @return the AI-generated response text
     * @throws AiServiceException if Gemini is unavailable, misconfigured, or returns an error
     */
    public String generate(String systemInstruction, String userMessage) {
        validateApiKey();

        String requestBody = buildRequestJson(systemInstruction, userMessage);
        String url = buildUrl();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .timeout(Duration.ofSeconds(60))
                .build();

        HttpResponse<String> response;
        try {
            response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (IOException e) {
            log.error("Network error calling Gemini API: {}", e.getMessage());
            throw new AiServiceException("PrepFlow AI is temporarily unavailable. Please try again.");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new AiServiceException("PrepFlow AI request was interrupted. Please try again.");
        }

        return parseResponse(response);
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    private void validateApiKey() {
        if (props.getKey() == null || props.getKey().isBlank()) {
            // Log as ERROR (not the key itself) so it is obvious in server logs
            log.error("GEMINI_API_KEY is not set. Set the GEMINI_API_KEY environment variable to enable AI features.");
            throw new AiServiceException("PrepFlow AI is not configured. Please contact the administrator.");
        }
    }

    private String buildUrl() {
        // POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={apiKey}
        return String.format("%s/models/%s:generateContent?key=%s",
                props.getBaseUrl(), props.getModel(), props.getKey());
    }

    /**
     * Build the Gemini generateContent request body JSON.
     *
     * Structure:
     * {
     *   "system_instruction": { "parts": [{ "text": "..." }] },
     *   "contents": [{ "role": "user", "parts": [{ "text": "..." }] }],
     *   "generationConfig": { "temperature": 0.7, "maxOutputTokens": 8192 }
     * }
     */
    private String buildRequestJson(String systemInstruction, String userMessage) {
        try {
            ObjectNode root = mapper.createObjectNode();

            // System instruction
            if (systemInstruction != null && !systemInstruction.isBlank()) {
                ObjectNode sysNode = mapper.createObjectNode();
                ArrayNode sysParts = mapper.createArrayNode();
                sysParts.add(mapper.createObjectNode().put("text", systemInstruction));
                sysNode.set("parts", sysParts);
                root.set("system_instruction", sysNode);
            }

            // User message
            ArrayNode contents = mapper.createArrayNode();
            ObjectNode userContent = mapper.createObjectNode();
            userContent.put("role", "user");
            ArrayNode userParts = mapper.createArrayNode();
            userParts.add(mapper.createObjectNode().put("text", userMessage));
            userContent.set("parts", userParts);
            contents.add(userContent);
            root.set("contents", contents);

            // Generation config
            ObjectNode genConfig = mapper.createObjectNode();
            genConfig.put("temperature", 0.7);
            genConfig.put("maxOutputTokens", 8192);
            root.set("generationConfig", genConfig);

            return mapper.writeValueAsString(root);
        } catch (Exception e) {
            throw new AiServiceException("Failed to build AI request. Please try again.");
        }
    }

    /**
     * Parse the Gemini generateContent response.
     *
     * Expected structure:
     * {
     *   "candidates": [{
     *     "content": { "parts": [{ "text": "..." }] }
     *   }]
     * }
     */
    private String parseResponse(HttpResponse<String> response) {
        int statusCode = response.statusCode();

        if (statusCode == 400) {
            log.warn("Gemini API returned 400 Bad Request. Check model name or request format.");
            throw new AiServiceException("PrepFlow AI could not process the request. Please rephrase and try again.");
        }
        if (statusCode == 401 || statusCode == 403) {
            // Do NOT log the key — just log that auth failed
            log.error("Gemini API authentication failed (HTTP {}). Check GEMINI_API_KEY validity.", statusCode);
            throw new AiServiceException("PrepFlow AI authentication failed. Please contact the administrator.");
        }
        if (statusCode == 429) {
            log.warn("Gemini API rate limit hit.");
            throw new AiServiceException("PrepFlow AI is temporarily busy. Please try again in a moment.");
        }
        if (statusCode == 503 || statusCode == 504) {
            log.error("Gemini API is unavailable (HTTP {}).", statusCode);
            throw new AiServiceException("PrepFlow AI is temporarily unavailable. Please try again.");
        }
        if (statusCode != 200) {
            log.error("Gemini API returned unexpected HTTP status: {}", statusCode);
            throw new AiServiceException("PrepFlow AI returned an unexpected error. Please try again.");
        }

        try {
            JsonNode root = mapper.readTree(response.body());
            JsonNode text = root
                    .path("candidates").get(0)
                    .path("content")
                    .path("parts").get(0)
                    .path("text");

            if (text == null || text.isMissingNode() || text.asText().isBlank()) {
                // Could be a safety block or empty candidate
                JsonNode finishReason = root.path("candidates").get(0).path("finishReason");
                log.warn("Gemini returned empty text. finishReason={}", finishReason.asText());
                throw new AiServiceException("PrepFlow AI could not generate a response for that message. Please try rephrasing.");
            }

            return text.asText();
        } catch (AiServiceException e) {
            throw e;
        } catch (Exception e) {
            log.error("Failed to parse Gemini API response: {}", e.getMessage());
            throw new AiServiceException("PrepFlow AI returned an unreadable response. Please try again.");
        }
    }
}
