package com.placement.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private String assessmentType; 

    @Column(nullable = false)
    private Integer totalMarks;

    @Column(nullable = false)
    private Integer marksScored;

    @Column(nullable = false)
    private Integer level;
    @Column(nullable = false)
    private String domain; 

    @Column(nullable = false)
    private Long submittedAt;

    @Lob // store large text
    @Column(columnDefinition = "LONGTEXT")
    private String resultDetails;
    @PrePersist
    protected void onCreate() {
        submittedAt = System.currentTimeMillis();
    }
}
