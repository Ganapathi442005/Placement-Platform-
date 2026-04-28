import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [assessmentResults, setAssessmentResults] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    const timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      // Fetch users
      const usersResponse = await axios.get("http://localhost:8080/api/auth/users");
      if (Array.isArray(usersResponse.data)) {
        setUsers(usersResponse.data);
      }

      // Fetch assessment results
      const resultsResponse = await axios.get("http://localhost:8080/api/assessment/all-results");
      if (resultsResponse.data.success) {
        setAssessmentResults(resultsResponse.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getPerformanceColor = (percentage) => {
    if (percentage < 40) return "#dc3545";
    if (percentage < 80) return "#ffc107";
    return "#28a745";
  };

  const getPerformanceLabel = (percentage) => {
    if (percentage < 40) return "Poor";
    if (percentage < 80) return "Good";
    return "Excellent";
  };

  return (
    <div className="admin-container">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-content">
          <h1 className="admin-title">Admin Dashboard</h1>
          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="admin-content">
        {/* Welcome Message */}
        <div className="admin-welcome">
          <h3>Welcome, {user?.username || "Admin"}!</h3>
          <p>Manage users and view assessment results</p>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Registered Users
          </button>
          <button
            className={`tab-button ${activeTab === "results" ? "active" : ""}`}
            onClick={() => setActiveTab("results")}
          >
            Assessment Results
          </button>
        </div>

        {/* Content Area */}
        <div className="admin-tab-content">
          {loading ? (
            <div className="text-center mt-5">
              <div className="spinner-border text-primary"></div>
              <p className="mt-3">Loading data...</p>
            </div>
          ) : activeTab === "users" ? (
            /* Users Tab */
            <div className="users-section">
              <h3>All Registered Users ({users.length})</h3>
              {users.length === 0 ? (
                <p className="no-data">No users registered yet.</p>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((userData, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{userData.email}</td>
                          <td>{userData.username}</td>
                          <td>
                            <span className="password-cell">
                              {userData.password}
                            </span>
                          </td>
                          <td>
                            <span className={`role-badge ${userData.role}`}>
                              {userData.role.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            /* Results Tab */
            <div className="results-section">
              <h3>Assessment Results ({assessmentResults.length})</h3>
              {assessmentResults.length === 0 ? (
                <p className="no-data">No assessment results yet.</p>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Username</th>
                        <th>Assessment Type</th>
                        <th>Level</th>
                        <th>Domain</th>
                        <th>Total Marks</th>
                        <th>Marks Scored</th>
                        <th>Percentage</th>
                        <th>Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assessmentResults.map((result, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{result.username}</td>
                          <td>{result.assessmentType}</td>
                          <td>{result.level}</td>
                          <td>{result.domain}</td>
                          <td>{result.totalMarks}</td>
                          <td>{result.marksScored}</td>
                          <td>{result.percentage.toFixed(2)}%</td>
                          <td>
                            <span
                              className="performance-badge"
                              style={{
                                backgroundColor: getPerformanceColor(result.percentage),
                              }}
                            >
                              {getPerformanceLabel(result.percentage)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
