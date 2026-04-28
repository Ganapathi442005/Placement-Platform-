package com.placement.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "questions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String company;
    private Integer level;
    private String category;
    private String difficulty;
    private String type;

    // ======================
    // MCQ FIELDS
    // ======================

    @Column(columnDefinition = "TEXT")
    private String question;

    @Column(name = "option_a", columnDefinition = "TEXT")
    private String optionA;

    @Column(name = "option_b", columnDefinition = "TEXT")
    private String optionB;

    @Column(name = "option_c", columnDefinition = "TEXT")
    private String optionC;

    @Column(name = "option_d", columnDefinition = "TEXT")
    private String optionD;

    @Column(name = "correct_answer", columnDefinition = "TEXT")
    private String correctAnswer;

    // ======================
    // CODING FIELDS
    // ======================

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String constraints;

    // ======================
    // KEYWORD-BASED SCORING FIELDS (for Level 1/2/3 CORE and Level 3 IT)
    // ======================

    @Column(columnDefinition = "LONGTEXT")
    private String keywordsJson;

    @Column(columnDefinition = "LONGTEXT")
    private String descriptionHint;

    @Column(name = "question_type")
    private String questionType;

    // ======================
    // RELATIONSHIPS
    // ======================

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<VisibleTestCase> visibleTestCases;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<HiddenTestCase> hiddenTestCases;
}