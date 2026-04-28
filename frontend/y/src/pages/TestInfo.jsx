import { useParams, useNavigate } from "react-router-dom";

function TestInfo() {
  const { level, domain } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 p-4">

        <h2 className="text-center fw-bold text-primary">
          LEVEL {level} — {domain.toUpperCase()} Assessment
        </h2>

        <hr />

        <div className="row mt-3">
          <div className="col-md-6">
            <h5>📝 Test Overview</h5>
            <ul>
              <li>10 Questions</li>
              <li>30 Minutes Duration</li>
              <li>Structured Sections</li>
              <li>Auto Submit on Timeout</li>
            </ul>
          </div>

          <div className="col-md-6">
            <h5>📌 Rules</h5>
            <ul>
              <li>No refresh</li>
              <li>One attempt only</li>
              <li>All questions mandatory</li>
              <li>Time strictly enforced</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            className="btn btn-success btn-lg px-5 shadow"
            onClick={() => navigate(`/assessment/${level}/${domain}`)}
          >
            Start Assessment →
          </button>
        </div>

      </div>
    </div>
  );
}

export default TestInfo;