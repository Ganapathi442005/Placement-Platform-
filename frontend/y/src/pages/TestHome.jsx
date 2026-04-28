import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./TestHome.css";

function TestHome() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="test-home-container">
      {/* Header */}
      <div className="test-home-header">
        <div className="header-content">
          <h1>Skill & Level-Based Assessment</h1>
          <div className="user-section">
            <span className="user-name">Welcome, {user?.username}!</span>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="test-home-content">
        <p className="subtitle">
          Choose your assessment level based on your current preparation.
        </p>

        {/* Assessment Buttons Grid */}
        <div className="assessment-grid">
          <div className="assessment-card">
            <div className="card-icon">📚</div>
            <h3>Foundation Level Assessment</h3>
            <p>Beginner level questions to test your basic knowledge</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/test/1")}
            >
              Start Foundation Level
            </button>
          </div>

          <div className="assessment-card">
            <div className="card-icon">⚡</div>
            <h3>Intermediate Skill Evaluation</h3>
            <p>Intermediate level questions to assess your skills</p>
            <button
              className="btn btn-warning"
              onClick={() => navigate("/test/2")}
            >
              Start Intermediate Level
            </button>
          </div>

          <div className="assessment-card">
            <div className="card-icon">🚀</div>
            <h3>Advanced Industry Readiness Test</h3>
            <p>Advanced level questions for industry-level assessment</p>
            <button
              className="btn btn-danger"
              onClick={() => navigate("/test/3")}
            >
              Start Advanced Level
            </button>
          </div>

          <div className="assessment-card past-marks-card">
            <div className="card-icon">📊</div>
            <h3>Past Assessment Marks</h3>
            <p>View your previous assessment results and performance</p>
            <button
              className="btn btn-info"
              onClick={() => navigate("/past-marks")}
            >
              View Past Marks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestHome;