package com.placement.backend.repository;

import com.placement.backend.model.HiddenTestCase;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HiddenTestCaseRepository extends JpaRepository<HiddenTestCase, Long> {
    List<HiddenTestCase> findByQuestionId(Long questionId);
}