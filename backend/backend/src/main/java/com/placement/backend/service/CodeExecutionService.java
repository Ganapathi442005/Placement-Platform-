package com.placement.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.*;

@Service
public class CodeExecutionService {

    private final RestTemplate restTemplate;

    public CodeExecutionService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    private static final String API_URL =
            "https://ce.judge0.com/submissions?base64_encoded=false&wait=true";

    public Map<String, Object> executeCode(String sourceCode,
                                           int languageId,
                                           String input) {

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("source_code", sourceCode);
        requestBody.put("language_id", languageId);
        requestBody.put("stdin", input);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response =
                restTemplate.postForEntity(API_URL, request, Map.class);

        return response.getBody();
    }
}