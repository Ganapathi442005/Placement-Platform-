package com.placement.backend.repository;

import com.placement.backend.model.VisibleTestCase;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VisibleTestCaseRepository extends JpaRepository<VisibleTestCase, Long> {
    List<VisibleTestCase> findByQuestionId(Long questionId);
}