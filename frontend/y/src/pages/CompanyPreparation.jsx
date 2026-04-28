import { useParams, Link } from "react-router-dom";

import productData from "../data/productPreparationData";
import serviceData from "../data/servicePreparationData";
import coreData from "../data/corePreparationData";

function CompanyPreparation() {
  const { name } = useParams();

  // Merge all data sources
  const data =
    productData[name] ||
    serviceData[name] ||
    coreData[name];

  if (!data) {
    return (
      <div className="container mt-5 text-center">
        <h3>Preparation data not available for {name}</h3>
        <Link to={`/company/${name}`} className="btn btn-secondary mt-3">
          ← Back to Hiring Process
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      {/* BACK */}
      <Link to={`/company/${name}`} className="btn btn-outline-secondary mb-3">
        ← Back to Hiring Process
      </Link>

      <h2 className="text-center mb-4">
        {name} – Preparation Guide
      </h2>

      {/* SECTION 1 */}
      <div className="card mb-4">
        <div className="card-body">
          <h4>Best Websites for Preparation</h4>
          <ul>
            {data.websites.map((site, i) => (
              <li key={i}>
                <a href={site} target="_blank" rel="noreferrer">
                  {site}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="card mb-4">
        <div className="card-body">
          <h4>Official Company Website</h4>
          <a href={data.companySite} target="_blank" rel="noreferrer">
            Visit {name} Official Website
          </a>
        </div>
      </div>

      {/* SECTION 3 */}
      <div className="card mb-4">
        <div className="card-body">
          <h4>Preparation Based on Topics</h4>

          <h6 className="mt-3">Resume Screening</h6>
          <ul>
            {data.topics.resume.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>

          <h6 className="mt-3">Online Assessment</h6>
          <ul>
            {data.topics.onlineAssessment.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>

          <h6 className="mt-3">Technical Interview</h6>
          <ul>
            {data.topics.technicalInterview.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>

          <h6 className="mt-3">HR Interview</h6>
          <ul>
            {data.topics.hrInterview.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>

          <h6 className="mt-3 text-danger">
            Company-Specific Focus
          </h6>
          <ul>
            {data.extraFocus.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>

        </div>
      </div>

    </div>
  );
}

export default CompanyPreparation;
