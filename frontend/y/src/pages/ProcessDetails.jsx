import { useParams, useNavigate } from "react-router-dom";

function ProcessDetails() {
  const { name, process } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <button
        className="btn btn-outline-secondary mb-3"
        onClick={() => navigate(`/company/${name}`)}
      >
        ← Back to Hiring Process
      </button>

      <h2>{name} – {process}</h2>

      <p className="mt-3">
        Preparation details for <strong>{process}</strong> in <strong>{name}</strong>
      </p>

      {process.toLowerCase().includes("aptitude") && (
        <ul>
          <li>Quantitative Aptitude</li>
          <li>Logical Reasoning</li>
          <li>Verbal Ability</li>
        </ul>
      )}

      {process.toLowerCase().includes("technical") && (
        <ul>
          <li>Core Programming</li>
          <li>DSA</li>
          <li>System Basics</li>
        </ul>
      )}

      {process.toLowerCase().includes("hr") && (
        <ul>
          <li>Communication Skills</li>
          <li>Behavioral Questions</li>
          <li>Company Knowledge</li>
        </ul>
      )}
    </div>
  );
}

export default ProcessDetails;
