-- Add keywords column to questions table for keyword-based scoring
ALTER TABLE questions ADD keywords_json LONGTEXT;
ALTER TABLE questions ADD description_hint LONGTEXT;
ALTER TABLE questions ADD question_type VARCHAR(50) DEFAULT 'DESCRIPTIVE';

-- Create a dedicated keywords table for better normalization
CREATE TABLE IF NOT EXISTS question_keywords (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    question_id BIGINT NOT NULL,
    keyword1 VARCHAR(255),
    keyword2 VARCHAR(255),
    keyword3 VARCHAR(255),
    keyword4 VARCHAR(255),
    keyword5 VARCHAR(255),
    keyword6 VARCHAR(255),
    keyword7 VARCHAR(255),
    keyword8 VARCHAR(255),
    keyword9 VARCHAR(255),
    keyword10 VARCHAR(255),
    UNIQUE KEY unique_question (question_id),
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    INDEX idx_question_id (question_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Example: Insert keywords for a sample CORE question
-- This shows the structure for how to populate keywords
-- In production, this will be done via a comprehensive script

