package com.placement.backend.service;

import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.*;

@Service
public class AssessmentScoreCalculationService {

    private ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Calculate marks for a single question based on answer verification
     * Supports: MCQ (Aptitude/English), Coding, and Keyword-based (CORE, Level 3 categories)
     */
    public int calculateQuestionMarks(String category, String userAnswer, String correctAnswer, 
                                      String codeHasErrors, int visibleTestsPassed, 
                                      int visibleTestsTotal, int hiddenTestsPassed, 
                                      int hiddenTestsTotal, String keywordsJson) {
        
        if (category.equalsIgnoreCase("APTITUDE") || category.equalsIgnoreCase("ENGLISH")) {
            // MCQ: 10 marks for correct, 0 for wrong
            return userAnswer != null && userAnswer.equals(correctAnswer) ? 10 : 0;
        }
        
        if (category.equalsIgnoreCase("CODING")) {
            // Coding: Total 15 marks
            // Code without errors: 2 marks
            // Test cases: 13 marks (1 mark per test case passed)
            int marks = 0;
            
            // 2 marks for code without errors
            if (codeHasErrors != null && codeHasErrors.equalsIgnoreCase("false")) {
                marks += 2;
            }
            
            // Calculate test case marks (maximum 13)
            int totalTestCases = visibleTestsTotal + hiddenTestsTotal;
            int passedTestCases = visibleTestsPassed + hiddenTestsPassed;
            
            if (totalTestCases > 0) {
                marks += Math.min(passedTestCases, 13);
            }
            
            return Math.min(marks, 15);
        }
        
        // For CORE and all Level 3 categories: use keyword-based scoring
        // This includes: CORE, DSA, SYSTEM, SQL, HR, and all other specializations
        if (keywordsJson != null && !keywordsJson.isEmpty()) {
            return calculateKeywordBasedMarks(userAnswer, keywordsJson);
        }
        
        // Fallback for CORE with correctAnswer
        if (category.equalsIgnoreCase("CORE")) {
            return calculateCoreMarks(userAnswer, correctAnswer);
        }
        
        return 0;
    }

    /**
     * Calculate score based on keyword matching from keywordsJson column
     * Formula: (keywords_matched / total_keywords) * 10
     * Examples:
     *   10/10 keywords = 10 marks
     *   5/10 keywords = 5 marks
     *   0/10 keywords = 0 marks
     */
    private int calculateKeywordBasedMarks(String userAnswer, String keywordsJson) {
        if (userAnswer == null || userAnswer.trim().isEmpty()) {
            return 0;
        }

        try {
            // Parse keywords from JSON array
            List<String> keywords = objectMapper.readValue(keywordsJson, List.class);
            return calculateKeywordMatchScore(userAnswer, keywords);
        } catch (Exception e) {
            // If JSON parsing fails, return 0
            return 0;
        }
    }

    /**
     * Simple keyword matching for core questions
     */
    /**
     * Calculate marks for CORE questions supporting both:
     * - Old format: comparing against correctAnswer string
     * - New format: comparing against keywords JSON array (10 keywords)
     */
    int calculateCoreMarks(String userAnswer, String correctAnswer) {
        if (userAnswer == null) {
            return 0;
        }

        // Try to parse correctAnswer as JSON keywords array first
        try {
            if (correctAnswer != null && correctAnswer.trim().startsWith("[")) {
                List<String> keywords = objectMapper.readValue(correctAnswer, List.class);
                return calculateKeywordMatchScore(userAnswer, keywords);
            }
        } catch (Exception e) {
            // Not a JSON array, fall through to string comparison
        }

        // Fallback: compare against correctAnswer string
        if (correctAnswer == null) {
            return 0;
        }
        
        return compareStringAnswers(userAnswer, correctAnswer);
    }

    /**
     * Calculate score based on keyword matching.
     * Compares user answer against a list of keywords (typically 10 keywords).
     * Gives partial credit for each keyword found.
     */
    private int calculateKeywordMatchScore(String userAnswer, List<String> keywords) {
        if (userAnswer == null || keywords == null || keywords.isEmpty()) {
            return 0;
        }

        String userAnswerLower = userAnswer.toLowerCase();
        int keywordsMatched = 0;

        for (String keyword : keywords) {
            if (keyword != null && !keyword.trim().isEmpty()) {
                String normalizedKeyword = keyword.trim().toLowerCase();
                // Check if keyword appears in user answer (substring match)
                if (userAnswerLower.contains(normalizedKeyword)) {
                    keywordsMatched++;
                }
            }
        }

        // Award marks based on percentage of keywords matched
        double matchPercentage = (double) keywordsMatched / keywords.size();
        int score = (int) Math.round(matchPercentage * 10);
        return Math.max(0, Math.min(10, score));
    }

    /**
     * Compare user answer string against expected answer string.
     * Uses word-set intersection ratio for partial credit.
     */
    private int compareStringAnswers(String userAnswer, String correctAnswer) {
        // Normalize and split into words
        String[] userWords = userAnswer.toLowerCase().replaceAll("[^a-z0-9 ]", " ").split("\\s+");
        String[] correctWords = correctAnswer.toLowerCase().replaceAll("[^a-z0-9 ]", " ").split("\\s+");

        Set<String> userSet = new HashSet<>();
        for (String w : userWords) {
            if (!w.isBlank()) userSet.add(w);
        }
        Set<String> correctSet = new HashSet<>();
        for (String w : correctWords) {
            if (!w.isBlank()) correctSet.add(w);
        }

        if (correctSet.isEmpty()) {
            return 0;
        }

        // Calculate intersection
        Set<String> intersect = new HashSet<>(correctSet);
        intersect.retainAll(userSet);

        double ratio = (double) intersect.size() / correctSet.size();
        int score = (int) Math.round(ratio * 10);
        // ensure within bounds
        return Math.max(0, Math.min(10, score));
    }

    /**
     * Calculate total assessment marks based on level and domain
     */
    public Map<String, Object> calculateAssessmentScore(int level, String domain, 
                                                        List<Map<String, Object>> questionsWithAnswers,
                                                        Map<String, Object> codingResults) {
        
        int totalMarks = 0;
        int marksScored = 0;
        Map<String, Integer> categoryScores = new HashMap<>();
        
        for (Map<String, Object> qna : questionsWithAnswers) {
            String category = (String) qna.get("category");
            String userAnswer = (String) qna.get("userAnswer");
            String correctAnswer = (String) qna.get("correctAnswer");
            String keywordsJson = (String) qna.get("keywordsJson");

            int marks = 10; // Default marks per question
            if (category.equalsIgnoreCase("CODING")) {
                marks = 15; // Coding has 15 marks
            }

            int scored;
            if (category.equalsIgnoreCase("CODING")) {
                // Use per-question coding results if provided (keyed by question id)
                Object crObj = codingResults != null ? codingResults.get(String.valueOf(qna.get("id"))) : null;

                Boolean codeHasErrors = null;
                int visiblePassed = 0;
                int visibleTotal = 0;
                int hiddenPassed = 0;
                int hiddenTotal = 0;

                // Support two formats:
                // 1) per-question map: codingResults = { "<questionId>": { hasErrors, visibleTestsPassed, ... } }
                // 2) aggregated map (legacy): codingResults = { hasErrors, visibleTestsPassed, ... }
                if (crObj instanceof Map) {
                    Map<?, ?> crMap = (Map<?, ?>) crObj;
                    Object he = crMap.get("hasErrors");
                    if (he != null) {
                        codeHasErrors = Boolean.valueOf(he.toString());
                    }
                    Object vp = crMap.get("visibleTestsPassed");
                    if (vp != null) visiblePassed = Integer.parseInt(vp.toString());
                    Object vt = crMap.get("visibleTestsTotal");
                    if (vt != null) visibleTotal = Integer.parseInt(vt.toString());
                    Object hp = crMap.get("hiddenTestsPassed");
                    if (hp != null) hiddenPassed = Integer.parseInt(hp.toString());
                    Object ht = crMap.get("hiddenTestsTotal");
                    if (ht != null) hiddenTotal = Integer.parseInt(ht.toString());
                } else if (codingResults != null && (codingResults.get("hasErrors") != null || codingResults.get("visibleTestsPassed") != null)) {
                    // aggregated format
                    Object he = codingResults.get("hasErrors");
                    if (he != null) codeHasErrors = Boolean.valueOf(he.toString());
                    Object vp = codingResults.get("visibleTestsPassed");
                    if (vp != null) visiblePassed = Integer.parseInt(vp.toString());
                    Object vt = codingResults.get("visibleTestsTotal");
                    if (vt != null) visibleTotal = Integer.parseInt(vt.toString());
                    Object hp = codingResults.get("hiddenTestsPassed");
                    if (hp != null) hiddenPassed = Integer.parseInt(hp.toString());
                    Object ht = codingResults.get("hiddenTestsTotal");
                    if (ht != null) hiddenTotal = Integer.parseInt(ht.toString());
                }

                scored = calculateQuestionMarks(category, userAnswer, correctAnswer,
                        codeHasErrors != null ? codeHasErrors.toString() : "true",
                        visiblePassed,
                        visibleTotal,
                        hiddenPassed,
                        hiddenTotal,
                        keywordsJson);
            } else {
                scored = calculateQuestionMarks(category, userAnswer, correctAnswer,
                        "false", 0, 0, 0, 0, keywordsJson);
            }

            marksScored += scored;
            totalMarks += marks;
            categoryScores.put(category, categoryScores.getOrDefault(category, 0) + scored);
        }
        
        double percentage = totalMarks > 0 ? (double) marksScored / totalMarks * 100 : 0;
        
        Map<String, Object> result = new HashMap<>();
        result.put("totalMarks", totalMarks);
        result.put("marksScored", marksScored);
        result.put("percentage", Math.round(percentage * 100.0) / 100.0);
        result.put("categoryScores", categoryScores);
        result.put("message", generateResultMessage(percentage));
        
        return result;
    }

    /**
     * Generate motivational message based on percentage
     */
    private String generateResultMessage(double percentage) {
        if (percentage < 40) {
            return "Your preparation is not enough. Keep practicing and strengthen your fundamentals!";
        } else if (percentage >= 40 && percentage < 80) {
            return "You have prepared well for this assessment! But to ensure placement at interviews or drives, " +
                   "you need a little bit more effort. Focus on weak areas and practice consistently.";
        } else {
            return "Excellent! You are good enough to crack these assessments and matching level company interviews! " +
                   "Keep up the great work and maintain this momentum!";
        }
    }
}
