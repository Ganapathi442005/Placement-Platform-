package com.placement.backend.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class AssessmentScoreCalculationServiceTest {

    private AssessmentScoreCalculationService service;

    @BeforeEach
    public void setup() {
        service = new AssessmentScoreCalculationService();
    }

    @Test
    public void testCalculateCoreMarks_exactMatch() {
        String correct = "inheritance polymorphism abstraction";
        String answer = "Inheritance Polymorphism Abstraction";
        int marks = service.calculateCoreMarks(answer, correct);
        assertEquals(10, marks);
    }

    @Test
    public void testCalculateCoreMarks_partialMatch() {
        String correct = "inheritance polymorphism abstraction";
        String answer = "Inheritance and polymorphism are important";
        int marks = service.calculateCoreMarks(answer, correct);
        
        assertTrue(marks >= 6 && marks <= 8);
    }

    @Test
    public void testCalculateCoreMarks_noMatch() {
        String correct = "inheritance polymorphism abstraction";
        String answer = "just some random text";
        int marks = service.calculateCoreMarks(answer, correct);
        assertEquals(0, marks);
    }

    @Test
    public void testCalculateAssessmentScore_categoryScores() {
        List<Map<String,Object>> qna = new ArrayList<>();
        Map<String,Object> q1 = new HashMap<>();
        q1.put("category", "CORE");
        q1.put("userAnswer", "inheritance polymorphism");
        q1.put("correctAnswer", "inheritance polymorphism abstraction");
        qna.add(q1);
        Map<String,Object> coding = new HashMap<>();
        Map<String,Object> result = service.calculateAssessmentScore(1, "CORE", qna, coding);
        assertEquals(10, result.get("totalMarks"));
        assertTrue(((Integer)result.get("marksScored")) > 0);
        Map<?,?> catScores = (Map<?,?>) result.get("categoryScores");
        assertTrue(catScores.containsKey("CORE"));
    }
}
