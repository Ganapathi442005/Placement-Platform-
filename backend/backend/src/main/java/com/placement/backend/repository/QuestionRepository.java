package com.placement.backend.repository;

import com.placement.backend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    // Generic category-based random selection
    @Query(value = """
        SELECT * FROM questions 
        WHERE level = :level 
        AND type = :type 
        AND category = :category 
        ORDER BY RAND() 
        LIMIT :limit
        """, nativeQuery = true)
    List<Question> getRandomByCategory(
            @Param("level") Integer level,
            @Param("type") String type,
            @Param("category") String category,
            @Param("limit") int limit
    );

    // Default random (Level 3 fallback)
    @Query(value = """
        SELECT * FROM questions 
        WHERE level = :level 
        AND type = :type 
        ORDER BY RAND() 
        LIMIT 10
        """, nativeQuery = true)
    List<Question> getRandomQuestions(
            @Param("level") Integer level,
            @Param("type") String type
    );
}