import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./PastMarksPage.css";

function PastMarksPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.username) {
      navigate("/login");
      return;
    }

    fetchPastMarks();
  }, [user, navigate]);

  const fetchPastMarks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/assessment/past-marks/${user.username}`
      );

      if (response.data.success) {
        setAssessments(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching past marks:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPerformanceColor = (percentage) => {
    if (percentage < 40) return "#dc3545";
    if (percentage < 80) return "#ffc107";
    return "#28a745";
  };

  const getPerformanceLabel = (percentage) => {
    if (percentage < 40) return "Needs Improvement";
    if (percentage < 80) return "Good";
    return "Excellent";
  };

  return (
    <div className="past-marks-container">
      <div className="past-marks-card">
        <h2 className="past-marks-title">Past Assessment Marks</h2>

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary"></div>
            <p className="mt-3">Loading assessments...</p>
          </div>
        ) : assessments.length === 0 ? (
          <div className="empty-state">
            <p>No past assessments yet. Take a test to see your results here!</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/test")}
            >
              Take Assessment
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="past-marks-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Assessment Type</th>
                  <th>Total Marks</th>
                  <th>Marks Scored</th>
                  <th>Percentage</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((assessment, index) => (
                  <tr key={index}>
                    <td>{assessment.serialNo}</td>
                    <td>{assessment.assessmentType}</td>
                    <td>{assessment.totalMarks}</td>
                    <td>{assessment.marksScored}</td>
                    <td>{assessment.percentage.toFixed(2)}%</td>
                    <td>
                      <span
                        className="performance-badge"
                        style={{
                          backgroundColor: getPerformanceColor(assessment.percentage),
                        }}
                      >
                        {getPerformanceLabel(assessment.percentage)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="action-buttons">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/test")}
          >
            Take Another Assessment
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/test")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default PastMarksPage;
