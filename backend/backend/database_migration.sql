-- SQL Migration Script for Placement Platform
-- This script creates all necessary tables for the assessment system

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    created_at BIGINT,
    updated_at BIGINT,
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Assessment Results Table
CREATE TABLE IF NOT EXISTS assessment_results (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    assessment_type VARCHAR(100) NOT NULL,
    total_marks INT NOT NULL,
    marks_scored INT NOT NULL,
    level INT NOT NULL,
    domain VARCHAR(50) NOT NULL,
    submitted_at BIGINT NOT NULL,
    result_details LONGTEXT,
    INDEX idx_username (username),
    INDEX idx_submitted_at (submitted_at),
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create a detailed assessment scoring table (optional, for detailed tracking)
CREATE TABLE IF NOT EXISTS assessment_scores_detail (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    assessment_result_id BIGINT NOT NULL,
    username VARCHAR(255) NOT NULL,
    question_id BIGINT NOT NULL,
    category VARCHAR(50) NOT NULL,
    user_answer LONGTEXT,
    correct_answer LONGTEXT,
    marks_awarded INT NOT NULL,
    max_marks INT NOT NULL,
    FOREIGN KEY (assessment_result_id) REFERENCES assessment_results(id) ON DELETE CASCADE,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_assessment_result (assessment_result_id),
    INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Update existing Questions table if needed (ensure correctAnswer column exists)
ALTER TABLE questions 
ADD COLUMN IF NOT EXISTS correct_answer LONGTEXT,
ADD COLUMN IF NOT EXISTS level INT DEFAULT 1;

-- Update Visible Test Cases table
ALTER TABLE visible_test_cases 
ADD COLUMN IF NOT EXISTS question_id BIGINT,
ADD COLUMN IF NOT EXISTS input LONGTEXT,
ADD COLUMN IF NOT EXISTS expected_output LONGTEXT,
ADD COLUMN IF NOT EXISTS explanation LONGTEXT;

-- Update Hidden Test Cases table
ALTER TABLE hidden_test_cases
ADD COLUMN IF NOT EXISTS question_id BIGINT,
ADD COLUMN IF NOT EXISTS input LONGTEXT,
ADD COLUMN IF NOT EXISTS expected_output LONGTEXT;

-- Insert admin user (change password in production)
INSERT INTO users (email, username, password, role, created_at, updated_at) 
VALUES ('ganapathim445@gmail.com', 'Ganapathi Murugesan', 'Ganapathi@442005', 'admin', UNIX_TIMESTAMP() * 1000, UNIX_TIMESTAMP() * 1000)
ON DUPLICATE KEY UPDATE password='Ganapathi@442005', role='admin';

-- Create Indexes for better query performance
CREATE INDEX idx_assessment_level_domain ON assessment_results(level, domain);
CREATE INDEX idx_assessment_username_level ON assessment_results(username, level);

-- Display confirmation
SELECT 'Database migration completed successfully!' as status;
