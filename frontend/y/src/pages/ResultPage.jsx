import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./ResultPage.css";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const result = location.state?.result || {};

  const percentage = result.percentage || 0;
  const marksScored = result.marksScored || 0;
  const totalMarks = result.totalMarks || 0;
  const message = result.message || "";

  const getMotivationColor = () => {
    if (percentage < 40) return "#dc3545";
    if (percentage < 80) return "#ffc107";
    return "#28a745";
  };

  const getMotivationEmoji = () => {
    if (percentage < 40) return "😟";
    if (percentage < 80) return "👍";
    return "🎉";
  };

  const getResultLevel = () => {
    if (percentage < 40) return "Needs Improvement";
    if (percentage < 80) return "Good Performance";
    return "Excellent Performance";
  };

  return (
    <div className="result-container">
      {/* Score Card */}
      <div className="result-card">
        <div className="result-header" style={{ borderColor: getMotivationColor() }}>
          <h2 className="result-emoji">{getMotivationEmoji()}</h2>
          <h3 className="result-level">{getResultLevel()}</h3>
        </div>

        {/* Score Display */}
        <div className="score-section">
          <div className="score-display">
            <div className="score-circle" style={{ borderColor: getMotivationColor() }}>
              <div className="score-percentage">{Math.round(percentage)}%</div>
            </div>
          </div>

          <div className="marks-section">
            <h4>Assessment Results</h4>
            <div className="marks-info">
              <div className="marks-item">
                <span className="marks-label">Marks Scored:</span>
                <span className="marks-value">{marksScored}</span>
              </div>
              <div className="marks-item">
                <span className="marks-label">Total Marks:</span>
                <span className="marks-value">{totalMarks}</span>
              </div>
              <div className="marks-item">
                <span className="marks-label">Percentage:</span>
                <span className="marks-value">{percentage.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Motivation Message */}
        <div className="motivation-section" style={{ borderColor: getMotivationColor() }}>
          <h4>Feedback</h4>
          <p className="motivation-message">{message}</p>
        </div>

        {/* Category Scores if available */}
        {result.categoryScores && Object.keys(result.categoryScores).length > 0 && (
          <div className="category-scores">
            <h4>Section-wise Performance</h4>
            <div className="scores-grid">
              {Object.entries(result.categoryScores).map(([category, score]) => (
                <div key={category} className="category-item">
                  <div className="category-name">{category}</div>
                  <div className="category-score">{score}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/test")}
          >
            Take Another Test
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/past-marks")}
          >
            View Past Assessments
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
