import { useParams, useNavigate } from "react-router-dom";

function LevelSelect() {
  const { level } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <div className="card shadow-lg border-0 p-4">

        <h2 className="fw-bold text-primary">
          Select Domain — Level {level}
        </h2>

        <p className="text-muted">
          Choose your assessment domain
        </p>

        <div className="row mt-4">
          <div className="col-md-6 mb-3">
            <button
              className="btn btn-primary w-100 py-3 shadow"
              onClick={() => navigate(`/test/${level}/core`)}
            >
              ⚙ Core Engineering Assessment
            </button>
          </div>

          <div className="col-md-6 mb-3">
            <button
              className="btn btn-secondary w-100 py-3 shadow"
              onClick={() => navigate(`/test/${level}/it`)}
            >
              💻 IT / Software Assessment
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LevelSelect;