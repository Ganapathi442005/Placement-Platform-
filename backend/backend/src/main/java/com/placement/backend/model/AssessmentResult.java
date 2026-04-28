package com.placement.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "assessment_results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AssessmentResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String assessmentType; // "Foundation Level", "Intermediate Skill Evaluation", "Advanced Industry Readiness"

    @Column(nullable = false)
    private Integer totalMarks;

    @Column(nullable = false)
    private Integer marksScored;

    @Column(nullable = false)
    private Integer level; // 1, 2, or 3

    @Column(nullable = false)
    private String domain; // "IT" or "CORE"

    @Column(nullable = false)
    private Long submittedAt;

    @Lob // store large text
    @Column(columnDefinition = "LONGTEXT")
    private String resultDetails; // Additional details like section-wise scores

    @PrePersist
    protected void onCreate() {
        submittedAt = System.currentTimeMillis();
    }
}
