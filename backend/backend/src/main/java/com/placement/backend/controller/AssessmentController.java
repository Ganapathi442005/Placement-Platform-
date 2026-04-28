package com.placement.backend.controller;

import com.placement.backend.model.AssessmentResult;
import com.placement.backend.repository.AssessmentResultRepository;
import com.placement.backend.service.AssessmentScoreCalculationService;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/assessment")
@CrossOrigin
public class AssessmentController {

    private final AssessmentResultRepository assessmentResultRepository;
    private final AssessmentScoreCalculationService scoreCalculationService;

    public AssessmentController(
            AssessmentResultRepository assessmentResultRepository,
            AssessmentScoreCalculationService scoreCalculationService) {
        this.assessmentResultRepository = assessmentResultRepository;
        this.scoreCalculationService = scoreCalculationService;
    }

    /**
     * Submit assessment and calculate result
     */
    @PostMapping("/submit")
    public Map<String, Object> submitAssessment(@RequestBody Map<String, Object> request) {
        String username = (String) request.get("username");
        Integer level = (Integer) request.get("level");
        String domain = (String) request.get("domain");
        List<Map<String, Object>> questionsWithAnswers = 
                (List<Map<String, Object>>) request.get("questionsWithAnswers");
        Map<String, Object> codingResults = (Map<String, Object>) request.get("codingResults");

        try {
            // Calculate score
            Map<String, Object> scoreResult = scoreCalculationService.calculateAssessmentScore(
                    level, domain, questionsWithAnswers, codingResults);

            int totalMarks = (Integer) scoreResult.get("totalMarks");
            int marksScored = (Integer) scoreResult.get("marksScored");
            String message = (String) scoreResult.get("message");

            // Determine assessment type
            String assessmentType = getAssessmentType(level);

            // Save to database
            AssessmentResult result = new AssessmentResult();
            result.setUsername(username);
            result.setAssessmentType(assessmentType);
            result.setTotalMarks(totalMarks);
            result.setMarksScored(marksScored);
            result.setLevel(level);
            result.setDomain(domain);
            result.setResultDetails(scoreResult.toString());

            assessmentResultRepository.save(result);

            // Return result
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("totalMarks", totalMarks);
            response.put("marksScored", marksScored);
            response.put("percentage", scoreResult.get("percentage"));
            response.put("message", message);
            response.put("categoryScores", scoreResult.get("categoryScores"));

            return response;
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", e.getMessage());
            return response;
        }
    }

    /**
     * Get past assessment marks for a user
     */
    @GetMapping("/past-marks/{username}")
    public Map<String, Object> getPastMarks(@PathVariable String username) {
        try {
            List<AssessmentResult> results = assessmentResultRepository
                    .findByUsernameOrderBySubmittedAtDesc(username);
            
            List<Map<String, Object>> marks = new ArrayList<>();
            int serialNo = 1;
            
            for (AssessmentResult result : results) {
                marks.add(Map.of(
                    "serialNo", serialNo++,
                    "assessmentType", result.getAssessmentType(),
                    "totalMarks", result.getTotalMarks(),
                    "marksScored", result.getMarksScored(),
                    "percentage", Math.round((double) result.getMarksScored() / result.getTotalMarks() * 100 * 100) / 100.0,
                    "submittedAt", result.getSubmittedAt()
                ));
            }

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", marks);
            return response;
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", e.getMessage());
            return response;
        }
    }

    /**
     * Get all assessment results (admin only)
     */
    @GetMapping("/all-results")
    public Map<String, Object> getAllResults() {
        try {
            List<AssessmentResult> results = assessmentResultRepository.findAll();
            
            List<Map<String, Object>> allResults = new ArrayList<>();
            
            for (AssessmentResult result : results) {
                allResults.add(Map.of(
                    "username", result.getUsername(),
                    "assessmentType", result.getAssessmentType(),
                    "level", result.getLevel(),
                    "domain", result.getDomain(),
                    "totalMarks", result.getTotalMarks(),
                    "marksScored", result.getMarksScored(),
                    "percentage", Math.round((double) result.getMarksScored() / result.getTotalMarks() * 100 * 100) / 100.0,
                    "submittedAt", result.getSubmittedAt()
                ));
            }

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", allResults);
            return response;
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("error", e.getMessage());
            return response;
        }
    }

    private String getAssessmentType(int level) {
        switch (level) {
            case 1:
                return "Foundation Level Assessment";
            case 2:
                return "Intermediate Skill Evaluation";
            case 3:
                return "Advanced Industry Readiness Test";
            default:
                return "Unknown Assessment";
        }
    }
}
