import { useNavigate, useParams } from "react-router-dom";

function Level3IT() {

  const navigate = useNavigate();
  const { level, domain } = useParams();

  return (
    <div className="container mt-5">

      <div className="card shadow-lg p-4 border-0">

        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">
            🚀 LEVEL-{level} – {domain?.toUpperCase()} Assessment
          </h2>

          <p className="text-muted">
            Test your technical and problem-solving skills
          </p>
        </div>

        <hr />

        <div className="row">

          <div className="col-md-6">
            <h5>📝 Test Overview</h5>
            <ul>
              <li>10 Random Questions</li>
              <li>Time Limit: 30 Minutes</li>
              <li>DSA, SQL & HR Questions</li>
              <li>Auto Submit</li>
            </ul>
          </div>

          <div className="col-md-6">
            <h5>📌 Rules</h5>
            <ul>
              <li>No refresh</li>
              <li>One attempt only</li>
              <li>No tab switching</li>
              <li>All mandatory</li>
            </ul>
          </div>

        </div>

        <div className="text-center mt-4">

          <button
            className="btn btn-success btn-lg px-5"
            onClick={() => navigate(`/assessment/${level}/${domain}`)}
          >
            Start Assessment →
          </button>

        </div>

      </div>

    </div>
  );
}

export default Level3IT;