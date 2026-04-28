import { useNavigate } from "react-router-dom";
import { useState } from "react";

import productData from "../data/productPreparationData";
import serviceData from "../data/servicePreparationData";
import coreData from "../data/corePreparationData";

function Preparation() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);

  const getCompanies = () => {
    if (selectedType === "product") return Object.keys(productData);
    if (selectedType === "service") return Object.keys(serviceData);
    if (selectedType === "core") return Object.keys(coreData);
    return [];
  };

  return (
    <div className="container mt-4">

      {/* BACK TO HOME */}
      <button
        className="btn btn-outline-secondary mb-3"
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>

      <h2 className="text-center mb-4">
        Placement Preparation – Choose Company Type
      </h2>

      {/* TYPE SELECTOR */}
      <div className="row text-center mb-5">
        <div className="col-md-4">
          <button
            className="btn btn-primary w-100"
            onClick={() => setSelectedType("product")}
          >
            Product-Based Companies
          </button>
        </div>

        <div className="col-md-4">
          <button
            className="btn btn-success w-100"
            onClick={() => setSelectedType("service")}
          >
            Service-Based Companies
          </button>
        </div>

        <div className="col-md-4">
          <button
            className="btn btn-warning w-100"
            onClick={() => setSelectedType("core")}
          >
            Core Companies
          </button>
        </div>
      </div>

      {/* COMPANY LIST */}
      {selectedType && (
        <>
          <h4 className="text-center mb-3 text-capitalize">
            {selectedType} Companies
          </h4>

          <div className="row">
            {getCompanies().map((company, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div
                  className="card p-3 text-center shadow-sm"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/company/${company}`)}
                >
                  <h5>{company}</h5>
                  <small className="text-muted">
                    View Hiring Process
                  </small>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* FEATURES / ADVERTISEMENT */}
      <div className="mt-5 p-4 bg-light rounded">
        <h4 className="text-center mb-3">
          Why Use This Platform?
        </h4>

        <div className="row text-center">
          <div className="col-md-4">
            <h6>✅ 100% Free</h6>
            <p>
              No paid courses. No hidden charges.
              Everything is completely free of cost.
            </p>
          </div>

          <div className="col-md-4">
            <h6>🎯 Company-Specific Preparation</h6>
            <p>
              Exact hiring process, topics & preparation
              strategy for each company.
            </p>
          </div>

          <div className="col-md-4">
            <h6>📈 Beginner Friendly</h6>
            <p>
              Designed for students with no prior
              industry experience.
            </p>
          </div>
        </div>

        <div className="row text-center mt-3">
          <div className="col-md-4">
            <h6>🧠 Core + IT Coverage</h6>
            <p>
              Covers Product, Service & Core companies
              in one single platform.
            </p>
          </div>

          <div className="col-md-4">
            <h6>🆓 No Login Required</h6>
            <p>
              Start preparation instantly without
              mandatory login.
            </p>
          </div>

          <div className="col-md-4">
            <h6>📚 Structured Roadmap</h6>
            <p>
              Resume → Assessment → Technical →
              HR – all covered clearly.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Preparation;
