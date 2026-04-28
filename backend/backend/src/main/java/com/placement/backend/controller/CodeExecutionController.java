package com.placement.backend.controller;

import com.placement.backend.service.CodeExecutionService;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/code")
@CrossOrigin
public class CodeExecutionController {

    private final CodeExecutionService service;

    public CodeExecutionController(CodeExecutionService service) {
        this.service = service;
    }

    @PostMapping("/run")
    public Map<String, Object> runCode(@RequestBody Map<String, Object> request) {

        String code = (String) request.get("code");
        String language = (String) request.get("language");
        String input = (String) request.get("input");

        int languageId = getLanguageId(language);

        return service.executeCode(code, languageId, input);
    }

    private int getLanguageId(String language) {
        switch (language.toLowerCase()) {
            case "java": return 62;
            case "cpp": return 54;
            case "c": return 50;
            case "python": return 71;
            default: return 62;
        }
    }
}