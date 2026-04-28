import { useParams, useNavigate } from "react-router-dom";
import hiringProcess from "../data/hiringProcess";

function CompanyDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const process = hiringProcess[name];

  if (!process) {
    return (
      <div className="container mt-5 text-center">
        <h3>No hiring data available for {name}</h3>
        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate("/preparation")}
        >
          ← Back to Company List
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      {/* BACK BUTTON */}
      <button
        className="btn btn-outline-secondary mb-3"
        onClick={() => navigate("/preparation")}
      >
        ← Back to Companies
      </button>

      <h2 className="text-center mb-4">{name} – Hiring Process</h2>

      <div className="row">
        {/* CAMPUS */}
        <div className="col-md-6">
          <h4>Campus Hiring</h4>
          {process.campus.map((r, i) => (
            <div
              key={i}
              className="card mb-2 p-2"
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/company/${name}/process/${r.round}`)
              }
            >
              <strong>{r.round}</strong>
              <span className="badge bg-secondary float-end">
                {r.mode}
              </span>
            </div>
          ))}
        </div>

        {/* OFF CAMPUS */}
        <div className="col-md-6">
          <h4>Off-Campus Hiring</h4>
          {process.offcampus.map((r, i) => (
            <div
              key={i}
              className="card mb-2 p-2"
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/company/${name}/process/${r.round}`)
              }
            >
              <strong>{r.round}</strong>
              <span className="badge bg-info float-end">
                {r.mode}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* START PREPARATION BUTTON */}
      <div className="text-center mt-4">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate(`/company/${name}/preparation`)}
        >
          Start Preparation
        </button>
      </div>

    </div>
  );
}

export default CompanyDetails;
