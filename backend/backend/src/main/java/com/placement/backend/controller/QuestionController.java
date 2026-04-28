package com.placement.backend.controller;

import com.placement.backend.model.Question;
import com.placement.backend.model.VisibleTestCase;
import com.placement.backend.model.HiddenTestCase;
import com.placement.backend.repository.QuestionRepository;
import com.placement.backend.repository.VisibleTestCaseRepository;
import com.placement.backend.repository.HiddenTestCaseRepository;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin
public class QuestionController {

    private final QuestionRepository repository;
    private final VisibleTestCaseRepository visibleRepo;
    private final HiddenTestCaseRepository hiddenRepo;

    public QuestionController(
            QuestionRepository repository,
            VisibleTestCaseRepository visibleRepo,
            HiddenTestCaseRepository hiddenRepo) {

        this.repository = repository;
        this.visibleRepo = visibleRepo;
        this.hiddenRepo = hiddenRepo;
    }

    // ======================================================
    // ASSESSMENT RANDOM QUESTIONS API
    // ======================================================
    @GetMapping("/level{level}/{domain}/random")
    public List<Question> getRandomQuestions(
            @PathVariable Integer level,
            @PathVariable String domain) {

        String type = domain.toUpperCase();
        List<Question> finalQuestions = new ArrayList<>();

        // ===============================
        // IT DOMAIN
        // ===============================
        if (domain.equalsIgnoreCase("it")) {

            if (level == 1) {
                finalQuestions.addAll(repository.getRandomByCategory(1, type, "AI", 4));
                finalQuestions.addAll(repository.getRandomByCategory(1, type, "APTITUDE", 3));
                finalQuestions.addAll(repository.getRandomByCategory(1, type, "ENGLISH", 1));
                finalQuestions.addAll(repository.getRandomByCategory(1, type, "CODING", 2));
                return finalQuestions;
            }

            if (level == 2) {
                finalQuestions.addAll(repository.getRandomByCategory(2, type, "APTITUDE", 5));
                finalQuestions.addAll(repository.getRandomByCategory(2, type, "ENGLISH", 2));
                finalQuestions.addAll(repository.getRandomByCategory(2, type, "CODING", 3));
                return finalQuestions;
            }

            if (level == 3) {
                return repository.getRandomQuestions(3, type);
            }
        }

        // ===============================
        // CORE DOMAIN
        // ===============================
        if (domain.equalsIgnoreCase("core")) {

            if (level == 1) {
                finalQuestions.addAll(repository.getRandomByCategory(1, type, "APTITUDE", 3));
                finalQuestions.addAll(repository.getRandomByCategory(1, type, "CORE", 7));
                return finalQuestions;
            }

            if (level == 2) {
                finalQuestions.addAll(repository.getRandomByCategory(2, type, "APTITUDE", 5));
                finalQuestions.addAll(repository.getRandomByCategory(2, type, "CORE", 5));
                return finalQuestions;
            }

            if (level == 3) {
                return repository.getRandomQuestions(3, type);
            }
        }

        return repository.getRandomQuestions(level, type);
    }

    // ======================================================
    // GET SINGLE CODING QUESTION WITH TEST CASES
    // ======================================================
    @GetMapping("/coding/{id}")
    public Map<String, Object> getCodingQuestion(@PathVariable Long id) {

        Question question = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        List<VisibleTestCase> visibleTests =
                visibleRepo.findByQuestionId(id);

        List<HiddenTestCase> hiddenTests =
                hiddenRepo.findByQuestionId(id);

        Map<String, Object> response = new HashMap<>();
        response.put("question", question);
        response.put("visibleTestCases", visibleTests);
        response.put("hiddenTestCases", hiddenTests);

        return response;
    }
}