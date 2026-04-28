package com.placement.backend.repository;

import com.placement.backend.model.AssessmentResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssessmentResultRepository extends JpaRepository<AssessmentResult, Long> {
    List<AssessmentResult> findByUsername(String username);
    List<AssessmentResult> findByUsernameOrderBySubmittedAtDesc(String username);
}
