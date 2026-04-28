import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const message = localStorage.getItem("loginMsg");
    if (message) {
      setMsg(message);
      localStorage.removeItem("loginMsg");
    }
  }, []);

  return (
    <div>
      {/* Success Message */}
      {msg && (
        <div className="alert alert-success text-center">
          {msg}
        </div>
      )}

      {/* HERO SECTION */}
      <div className="bg-dark text-light text-center p-5">
        <h1 className="display-5 fw-bold">
          Your Complete Placement Preparation Platform
        </h1>
        <p className="lead mt-3">
          Prepare company-wise. Practice smartly. Track your readiness.
        </p>

        <div className="mt-4">
          <button
            className="btn btn-primary btn-lg me-3"
            onClick={() => navigate("/preparation")}
          >
            Start Placement Preparation
          </button>

          <button
            className="btn btn-outline-light btn-lg"
            onClick={() => navigate("/test")}
          >
            Take Skill & Level based Test
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div className="container mt-5">
        <div className="row text-center">
          <div className="col-md-4">
            <h5>Company-Wise Roadmap</h5>
            <p>
              Understand exact hiring process and preparation path for each company.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Smart Assessment</h5>
            <p>
              Take tier-based tests and know where you stand.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Readiness Tracking</h5>
            <p>
              Get clear feedback on skills to improve.
            </p>
          </div>
        </div>
      </div>

      {/* COMPANY TIERS */}
      <div className="container mt-5">
        <h3 className="text-center mb-4">Prepare for All Company Levels</h3>
        <div className="row text-center">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Top-Tier Companies</h5>
                <p className="card-text">
                  Google, Amazon, Microsoft, Zoho
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Mid-Tier Companies</h5>
                <p className="card-text">
                  TCS, CTS, LTI, HCL
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Entry-Level Companies</h5>
                <p className="card-text">
                  Startups & Service Companies
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div className="bg-light text-center p-4 mt-5">
        <h4>Start Preparing Today</h4>
        <p>One platform. One roadmap. One goal — placement.</p>
      </div>
    </div>
  );
}

export default Home;
