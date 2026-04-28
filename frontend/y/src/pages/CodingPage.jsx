import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import axios from "axios";

function CodingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [visibleTests, setVisibleTests] = useState([]);
  const [hiddenTests, setHiddenTests] = useState([]);

  const [results, setResults] = useState([]);
  const [submitResults, setSubmitResults] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [running, setRunning] = useState(false);
  const [hiddenTestProgress, setHiddenTestProgress] = useState(0);
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);

  const starterCodes = {
    java: `public class Main {
    public static void main(String[] args) {
        
    }
}`,
    cpp: `#include <iostream>
using namespace std;

int main() {
    
    return 0;
}`,
    c: `#include <stdio.h>

int main() {
    
    return 0;
}`,
    python: `def main():
    pass

if __name__ == "__main__":
    main()`
  };

  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState(() => {
    const saved = localStorage.getItem(`codingCode_${id}`);
    return saved || starterCodes.java;
  });

  // Load question and restore code from localStorage
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/questions/coding/${id}`)
      .then((res) => {
        setQuestion(res.data.question);
        setVisibleTests(res.data.visibleTestCases);
        setHiddenTests(res.data.hiddenTestCases);
        
        // Save test cases to localStorage for auto-submit
        try {
          localStorage.setItem(`codingVisibleTests_${id}`, JSON.stringify(res.data.visibleTestCases));
          localStorage.setItem(`codingHiddenTests_${id}`, JSON.stringify(res.data.hiddenTestCases));
        } catch (e) {
          console.error("Failed to save test cases", e);
        }
        
        // Restore code from localStorage if available
        const savedCode = localStorage.getItem(`codingCode_${id}`);
        const savedLanguage = localStorage.getItem(`codingLanguage_${id}`);
        if (savedCode) {
          setCode(savedCode);
        }
        if (savedLanguage) {
          setLanguage(savedLanguage);
        }
      })
      .catch((e) => console.error(e));
  }, [id]);

  // Handle page restore from bfcache (back/forward navigation)
  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        // Page was restored from bfcache
        const savedCode = localStorage.getItem(`codingCode_${id}`);
        const savedLanguage = localStorage.getItem(`codingLanguage_${id}`);
        if (savedCode) {
          setCode(savedCode);
        }
        if (savedLanguage) {
          setLanguage(savedLanguage);
        }
      }
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [id]);

  // Save code to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(`codingCode_${id}`, code);
    } catch (e) {
      console.error("Failed to save code to localStorage", e);
    }
  }, [code, id]);

  // Save language to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(`codingLanguage_${id}`, language);
    } catch (e) {
      console.error("Failed to save language to localStorage", e);
    }
  }, [language, id]);

  // RUN (Visible Test Cases Only)
  const runCode = async () => {
    setRunning(true);
    let temp = [];

    for (let test of visibleTests) {
      const res = await axios.post("http://localhost:8080/api/code/run", {
        code,
        language,
        input: test.input,
      });

      const output = res.data.stdout?.trim() || res.data.compile_output || res.data.stderr || "";

      temp.push({
        input: test.input,
        expected: test.expectedOutput.trim(),
        output,
        passed: output === test.expectedOutput.trim(),
      });
    }

    setResults(temp);
    setRunning(false);
  };

  // SUBMIT (Visible + Hidden Test Cases), persist per-question summary and score
  const submitCode = async () => {
    setSubmitting(true);
    setIsSubmitComplete(false);
    setHiddenTestProgress(0);

    let visibleTemp = [];
    let anyErrors = false;

    for (let test of visibleTests) {
      const res = await axios.post("http://localhost:8080/api/code/run", {
        code,
        language,
        input: test.input,
      });

      const compileOutput = res.data.compile_output;
      const stderr = res.data.stderr;
      const stdout = res.data.stdout?.trim();

      const output = stdout || compileOutput || stderr || "";
      if (compileOutput || stderr) anyErrors = true;

      visibleTemp.push({
        input: test.input,
        expected: test.expectedOutput.trim(),
        output,
        passed: output === test.expectedOutput.trim(),
      });
    }

    setResults(visibleTemp);

    let hiddenTemp = [];
    for (let idx = 0; idx < hiddenTests.length; idx++) {
      const test = hiddenTests[idx];
      const res = await axios.post("http://localhost:8080/api/code/run", {
        code,
        language,
        input: test.input,
      });

      const compileOutput = res.data.compile_output;
      const stderr = res.data.stderr;
      const stdout = res.data.stdout?.trim();

      const output = stdout || compileOutput || stderr || "";
      if (compileOutput || stderr) anyErrors = true;

      const testResult = {
        input: test.input,
        expected: test.expectedOutput.trim(),
        output,
        passed: output === test.expectedOutput.trim(),
      };

      hiddenTemp.push(testResult);
      setSubmitResults([...hiddenTemp]);
      setHiddenTestProgress(idx + 1);

      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    const codingSummary = {
      hasErrors: anyErrors,
      visibleTestsPassed: visibleTemp.filter((t) => t.passed).length,
      visibleTestsTotal: visibleTemp.length,
      hiddenTestsPassed: hiddenTemp.filter((t) => t.passed).length,
      hiddenTestsTotal: hiddenTemp.length,
    };

    const totalPassed = (codingSummary.visibleTestsPassed || 0) + (codingSummary.hiddenTestsPassed || 0);
    const codeNoError = !codingSummary.hasErrors;
    const computedScore = (codeNoError ? 2 : 0) + Math.min(totalPassed, 13);
    codingSummary.computedScore = Math.min(15, computedScore);

    try {
      localStorage.setItem(`codingResult_${id}`, JSON.stringify(codingSummary));
      localStorage.setItem(`codingScore_${id}`, String(codingSummary.computedScore));
      // Mark question as submitted so AssessmentPage knows this was submitted
      localStorage.setItem(`codingSubmitted_${id}`, "true");
    } catch (e) {
      console.error("Failed to save coding result to localStorage", e);
    }

    setSubmitting(false);
    setIsSubmitComplete(true);
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* LEFT PANEL */}
      <div style={{ width: "50%", padding: "20px", overflowY: "auto" }}>
        <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>

        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <h4>Constraints:</h4>
        <pre>{question.constraints}</pre>

        <h4>Examples:</h4>
        {visibleTests.map((t, i) => (
          <div key={i}>
            <strong>Input:</strong>
            <pre>{t.input}</pre>
            <strong>Output:</strong>
            <pre>{t.expectedOutput}</pre>
            <strong>Explanation:</strong>
            <p>{t.explanation}</p>
            <hr />
          </div>
        ))}

        {/* TEST RESULTS */}
        {results.length > 0 && (
          <div>
            <h4 style={{ marginTop: "20px", color: "#28a745" }}>✅ Run Results</h4>
            {results.map((r, i) => (
              <div key={i} style={{ marginBottom: "10px", padding: "8px", backgroundColor: r.passed ? "#d4edda" : "#f8d7da", borderRadius: "4px", color: "#000" }}>
                <strong>Test Case {i + 1}: {r.passed ? "✅ PASSED" : "❌ FAILED"}</strong>
                <div style={{ fontSize: "12px", marginTop: "4px" }}>
                  <div><strong>Input:</strong> {r.input}</div>
                  <div><strong>Expected:</strong> {r.expected}</div>
                  <div><strong>Your Output:</strong> {r.output}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* HIDDEN TEST RESULTS (After Submit) */}
        {(submitting || submitResults.length > 0) && (
          <div>
            <h4 style={{ marginTop: "20px", color: "#007bff" }}>🔒 Hidden Test Cases ({hiddenTestProgress}/{hiddenTests.length})</h4>
            {submitResults.map((r, i) => (
              <div key={i} style={{ marginBottom: "10px", padding: "8px", backgroundColor: r.passed ? "#d1ecf1" : "#f8d7da", borderRadius: "4px", color: "#000" }}>
                <strong>Hidden Test {i + 1}: {r.passed ? "✅ PASSED" : "❌ FAILED"}</strong>
                <div style={{ fontSize: "12px", marginTop: "4px" }}>
                  <div><strong>Input:</strong> {r.input}</div>
                  <div><strong>Expected:</strong> {r.expected}</div>
                  <div><strong>Your Output:</strong> {r.output}</div>
                </div>
              </div>
            ))}
            {submitting && submitResults.length < hiddenTests.length && (
              <div style={{ padding: "10px", textAlign: "center", color: "#007bff" }}>
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                Testing hidden test case {hiddenTestProgress + 1}...
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div style={{ width: "50%", display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: 8 }}>
          <div className="btn-group" role="group" aria-label="Language selector">
            {[
              { key: "java", label: "Java" },
              { key: "cpp", label: "C++" },
              { key: "c", label: "C" },
              { key: "python", label: "Python" },
            ].map((lang) => (
              <button
                key={lang.key}
                type="button"
                className={"btn " + (language === lang.key ? "btn-primary" : "btn-outline-secondary")}
                onClick={() => {
                  setLanguage(lang.key);
                  setCode(starterCodes[lang.key]);
                }}
                style={{ minWidth: 80 }}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        <Editor height="55%" language={language === "cpp" ? "cpp" : language} theme="vs-dark" value={code} onChange={(value) => setCode(value)} />

        <div style={{ padding: "10px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button className="btn btn-success btn-lg px-4" onClick={runCode} disabled={running || submitting}>
            {running ? "⏳ Running..." : "▶️ Run"}
          </button>
          <button className="btn btn-primary btn-lg px-4" onClick={submitCode} disabled={submitting || running}>
            {submitting ? `⏳ Testing ${hiddenTestProgress}/${hiddenTests.length}...` : "✅ Submit"}
          </button>
          {isSubmitComplete && (
            <button className="btn btn-info btn-lg px-4" onClick={() => navigate(-1)}>
              ➡️ Next
            </button>
          )}
        </div>


      </div>
    </div>
  );
}

export default CodingPage;
