import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function AssessmentPage() {
  const { level, domain } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [codingResults, setCodingResults] = useState({});
  const [timeLeft, setTimeLeft] = useState(() => {
    const times = { 1: 90 * 60, 2: 120 * 60, 3: 180 * 60 };
    return times[parseInt(level)] || 90 * 60;
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const answersKey = `assessmentAnswers_${level}_${domain}_${user.username}`;

  // Function to fetch questions
  const fetchQuestions = (forceReload = false) => {
    if (!user || !user.username) {
      navigate("/login");
      return;
    }

    setQuestions([]);
    setAnswers({});
    setCodingResults({});
    setSubmitted(false);
    setTimeLeft(() => {
      const times = { 1: 90 * 60, 2: 120 * 60, 3: 180 * 60 };
      return times[parseInt(level)] || 90 * 60;
    });

    const cacheKey = `assessmentQuestions_${level}_${domain}_${user.username}`;
    const reloaded = localStorage.getItem('assessmentReloaded') === 'true';

    if (forceReload || reloaded) {
      localStorage.removeItem(cacheKey);
      localStorage.removeItem('assessmentReloaded');
    }

    const cachedQuestions = localStorage.getItem(cacheKey);

    if (cachedQuestions && !forceReload && !reloaded) {
      // Restore from cache if it exists and not forcing reload
      try {
        setQuestions(JSON.parse(cachedQuestions));
        
        // Load saved answers
        const savedAnswers = localStorage.getItem(answersKey);
        if (savedAnswers) {
          try {
            setAnswers(JSON.parse(savedAnswers));
          } catch (e) {
            setAnswers({});
          }
        }
      } catch (e) {
        console.error("Failed to parse cached questions", e);
        // Fall back to fetching
        axios
          .get(`http://localhost:8080/api/questions/level${level}/${domain}/random`)
          .then((res) => {
            setQuestions(res.data);
            localStorage.setItem(cacheKey, JSON.stringify(res.data));
            
            // Load saved answers
            const savedAnswers = localStorage.getItem(answersKey);
            if (savedAnswers) {
              try {
                setAnswers(JSON.parse(savedAnswers));
              } catch (e) {
                setAnswers({});
              }
            }
          })
          .catch((err) => console.error(err));
      }
    } else {
      // Fetch and cache new questions
      axios
        .get(`http://localhost:8080/api/questions/level${level}/${domain}/random`)
        .then((res) => {
          setQuestions(res.data);
          localStorage.setItem(cacheKey, JSON.stringify(res.data));
          
          // Load saved answers
          const savedAnswers = localStorage.getItem(answersKey);
          if (savedAnswers) {
            try {
              setAnswers(JSON.parse(savedAnswers));
            } catch (e) {
              setAnswers({});
            }
          }
        })
        .catch((err) => console.error(err));
    }
  };

  // Detect browser reload
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('assessmentReloaded', 'true');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Fetch Questions on mount
  useEffect(() => {
    fetchQuestions();
  }, [level, domain, user, navigate]);

  // Timer with auto-submit
  useEffect(() => {
    if (submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitAssessment(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted]);

  const formatTime = () => {
    const h = Math.floor(timeLeft / 3600);
    const m = Math.floor((timeLeft % 3600) / 60);
    const s = timeLeft % 60;
    if (h > 0) {
      return `${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
    }
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const submitAssessment = async (auto = false) => {
    if (submitted || loading) return;
    setSubmitted(true);
    setLoading(true);

    try {
      // Auto-run/submit any unsaved coding questions
      const codingResultsMap = {};
      for (const q of questions) {
        if (q.category && q.category.toUpperCase() === "CODING") {
          try {
            const existingResult = localStorage.getItem(`codingResult_${q.id}`);
            if (existingResult) {
              // Already submitted
              codingResultsMap[String(q.id)] = JSON.parse(existingResult);
            } else {
              // Check if there's code to auto-submit
              const code = localStorage.getItem(`codingCode_${q.id}`);
              const language = localStorage.getItem(`codingLanguage_${q.id}`) || "java";
              const visibleTests = JSON.parse(localStorage.getItem(`codingVisibleTests_${q.id}`) || "[]");
              const hiddenTests = JSON.parse(localStorage.getItem(`codingHiddenTests_${q.id}`) || "[]");

              if (code && visibleTests.length > 0 && hiddenTests.length > 0) {
                // Auto-run tests
                let visiblePassed = 0;
                let anyErrors = false;

                for (const test of visibleTests) {
                  const res = await axios.post("http://localhost:8080/api/code/run", {
                    code,
                    language,
                    input: test.input,
                  });
                  const output = res.data.stdout?.trim() || res.data.compile_output || res.data.stderr || "";
                  if (res.data.compile_output || res.data.stderr) anyErrors = true;
                  if (output === test.expectedOutput.trim()) visiblePassed++;
                }

                let hiddenPassed = 0;
                for (const test of hiddenTests) {
                  const res = await axios.post("http://localhost:8080/api/code/run", {
                    code,
                    language,
                    input: test.input,
                  });
                  const output = res.data.stdout?.trim() || res.data.compile_output || res.data.stderr || "";
                  if (res.data.compile_output || res.data.stderr) anyErrors = true;
                  if (output === test.expectedOutput.trim()) hiddenPassed++;
                }

                const totalPassed = visiblePassed + hiddenPassed;
                const codeNoError = !anyErrors;
                const computedScore = (codeNoError ? 2 : 0) + Math.min(totalPassed, 13);

                const autoSubmitResult = {
                  hasErrors: anyErrors,
                  visibleTestsPassed: visiblePassed,
                  visibleTestsTotal: visibleTests.length,
                  hiddenTestsPassed: hiddenPassed,
                  hiddenTestsTotal: hiddenTests.length,
                  computedScore: Math.min(15, computedScore),
                };

                codingResultsMap[String(q.id)] = autoSubmitResult;
                localStorage.setItem(`codingResult_${q.id}`, JSON.stringify(autoSubmitResult));
              } else {
                // No code or incomplete test data; set 0 score
                codingResultsMap[String(q.id)] = {
                  hasErrors: true,
                  visibleTestsPassed: 0,
                  visibleTestsTotal: 0,
                  hiddenTestsPassed: 0,
                  hiddenTestsTotal: 0,
                };
              }
            }
          } catch (e) {
            console.error("Failed to process coding question", q.id, e);
            codingResultsMap[String(q.id)] = {
              hasErrors: true,
              visibleTestsPassed: 0,
              visibleTestsTotal: 0,
              hiddenTestsPassed: 0,
              hiddenTestsTotal: 0,
            };
          }
        }
      }

      const questionsWithAnswers = questions.map((q) => ({
        id: q.id,
        category: q.category,
        question: q.question || q.title,
        userAnswer: answers[q.id] || "",
        correctAnswer: q.correctAnswer || "",
        keywordsJson: q.keywordsJson || "",
      }));

      const response = await axios.post("http://localhost:8080/api/assessment/submit", {
        username: user.username,
        level: parseInt(level),
        domain: domain.toUpperCase(),
        questionsWithAnswers,
        codingResults: Object.keys(codingResultsMap).length > 0 ? codingResultsMap : {},
      });

      if (response.data.success) {
        // Clear all coding-related localStorage after successful submit
        for (const q of questions) {
          if (q.category && q.category.toUpperCase() === "CODING") {
            localStorage.removeItem(`codingCode_${q.id}`);
            localStorage.removeItem(`codingLanguage_${q.id}`);
            localStorage.removeItem(`codingResult_${q.id}`);
            localStorage.removeItem(`codingScore_${q.id}`);
            localStorage.removeItem(`codingVisibleTests_${q.id}`);
            localStorage.removeItem(`codingHiddenTests_${q.id}`);
            localStorage.removeItem(`codingSubmitted_${q.id}`);
          }
        }

        // Clear answers localStorage
        localStorage.removeItem(answersKey);

        const resultData = {
          totalMarks: response.data.totalMarks,
          marksScored: response.data.marksScored,
          percentage: response.data.percentage,
          message: response.data.message,
          categoryScores: response.data.categoryScores,
        };
        navigate("/result", { state: { result: resultData } });
      } else {
        alert("Error: " + response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting assessment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  let currentCategory = "";

  return (
    <div className="container mt-5">

      {/* HEADER */}
      <div className="card shadow-lg border-0 p-4 mb-4 bg-light">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="fw-bold text-primary">
            LEVEL {level} — {domain.toUpperCase()} Assessment
          </h3>
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-outline-secondary"
              onClick={() => fetchQuestions(true)}
              disabled={submitted || loading}
              title="Reload Questions"
            >
              🔄 Reload
            </button>
            <span className="badge bg-danger fs-5 px-3 py-2">
              ⏳ {formatTime()}
            </span>
          </div>
        </div>
      </div>

      {/* QUESTIONS */}
      {questions.length === 0 ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary"></div>
          <p className="mt-3">Loading Questions...</p>
        </div>
      ) : (
        questions.map((q, index) => {
          const showHeading = q.category !== currentCategory;
          currentCategory = q.category;

          return (
            <div key={q.id}>
              {showHeading && (
                <div className="mt-4 mb-3">
                  <h4 className="fw-bold text-secondary border-bottom pb-2">
                    {q.category === "AI" && "🤖 AI & Emerging Technologies"}
                    {q.category === "APTITUDE" && "📊 Aptitude Section"}
                    {q.category === "ENGLISH" && "📘 English & Grammar"}
                    {q.category === "CODING" && "💻 Coding Section"}
                    {q.category === "CORE" && "⚙ Core Technical Concepts"}
                  </h4>
                </div>
              )}

              <div className="card shadow-sm mb-3 border-0">
                <div className="card-body">
             <h6 className="fw-semibold">
  Q{index + 1}. {q.category === "CODING" ? q.title : q.question}
</h6>

                  {/* Show difficulty only if NOT coding */}
                  {q.category !== "CODING" && (
                    <small className="text-muted">
                      {q.category} | {q.difficulty}
                    </small>
                  )}

                  {/* Simplified prompt for keyword-based questions */}
                  {q.keywordsJson && (
                    <div className="alert alert-info mt-3 mb-3 p-3">
                      <p className="small mb-0">enter atleast 30 words</p>
                    </div>
                  )}

                  {/* Show description hint for CORE and IT questions */}
                  {(q.category === "CORE" || q.category === "IT") && q.descriptionHint && !q.keywordsJson && (
                    <div className="alert alert-info mt-3 mb-3 p-3">
                      <strong>💡 Hint:</strong>
                      <p className="mb-0 mt-2 small">{q.descriptionHint}</p>
                    </div>
                  )}

                  {/* ================= MCQ ================= */}
                  {(q.category === "APTITUDE" || q.category === "ENGLISH") && q.optionA ? (
                    <div className="mt-3">
                      {[{
                        label: "A",
                        value: q.optionA,
                      },
                      {
                        label: "B",
                        value: q.optionB,
                      },
                      {
                        label: "C",
                        value: q.optionC,
                      },
                      {
                        label: "D",
                        value: q.optionD,
                      }].map((opt) => (
                        <div className="form-check" key={opt.label}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name={`question-${q.id}`}
                            value={opt.value}
                            disabled={submitted}
                            checked={answers[q.id] === opt.value}
                            onChange={(e) => {
                              const newAnswers = {
                                ...answers,
                                [q.id]: e.target.value,
                              };
                              setAnswers(newAnswers);
                              localStorage.setItem(answersKey, JSON.stringify(newAnswers));
                            }}
                          />
                          <label className="form-check-label">
                            {opt.label}. {opt.value}
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : q.category === "CODING" ? (
                    /* ================= CODING BUTTON ================= */
                    (() => {
                      const savedCode = localStorage.getItem(`codingCode_${q.id}`);
                      return (
                        <div className="mt-4">
                          {savedCode && (
                            <div className="mb-3">
                              <div className="alert alert-info p-3">
                                <strong>Your Code:</strong>
                                <pre style={{ backgroundColor: "#f5f5f5", padding: "10px", borderRadius: "4px", marginTop: "8px", fontSize: "12px", maxHeight: "150px", overflowY: "auto" }}>
                                  {savedCode}
                                </pre>
                              </div>
                            </div>
                          )}
                          <div className="text-center">
                            <button
                              className={"btn px-4 py-2" + (savedCode ? " btn-warning" : " btn-dark")}
                              onClick={() => navigate(`/coding/${q.id}`)}
                            >
                              {savedCode ? "✏️ Modify Code" : "🚀 Start Coding"}
                            </button>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    /* ================= CORE TEXTAREA ================= */
                    <textarea
                      className="form-control mt-3"
                      rows="3"
                      disabled={submitted}
                      value={answers[q.id] || ""}
                      placeholder="Enter your answer..."
                      onChange={(e) => {
                        const newAnswers = {
                          ...answers,
                          [q.id]: e.target.value,
                        };
                        setAnswers(newAnswers);
                        localStorage.setItem(answersKey, JSON.stringify(newAnswers));
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* SUBMIT BUTTON */}
      {!submitted && questions.length > 0 && (
        <div className="text-center mt-4 mb-5">
          <button
            className="btn btn-primary btn-lg px-5 shadow"
            onClick={() => submitAssessment(false)}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Test"}
          </button>
        </div>
      )}

      {/* SUBMITTING MESSAGE */}
      {loading && (
        <div className="alert alert-info text-center mt-4">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          Submitting your assessment...
        </div>
      )}
    </div>
  );
}

export default AssessmentPage;





