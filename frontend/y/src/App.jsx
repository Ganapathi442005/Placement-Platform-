import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Preparation from "./pages/Preparation";
import CompanyDetails from "./pages/CompanyDetails";
import CompanyPreparation from "./pages/CompanyPreparation";
import ProcessDetails from "./pages/ProcessDetails";

import TestHome from "./pages/TestHome";
import LevelSelect from "./pages/LevelSelect";
import TestInfo from "./pages/TestInfo";
import AssessmentPage from "./pages/AssessmentPage";
import CodingPage from "./pages/CodingPage";
import ResultPage from "./pages/ResultPage";
import PastMarksPage from "./pages/PastMarksPage";
import AdminDashboard from "./pages/AdminDashboard";

function AppContent() {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Placement Preparation */}
        <Route path="/preparation" element={<Preparation />} />

        {/* Company Details */}
        <Route path="/company/:name" element={<CompanyDetails />} />

        {/* Company Preparation Details */}
        <Route
          path="/company/:name/preparation"
          element={<CompanyPreparation />}
        />

        <Route
          path="/company/:name/process/:process"
          element={<ProcessDetails />}
        />

        {/* Assessment Routes */}
        <Route path="/test" element={<TestHome />} />
        <Route path="/test/:level" element={<LevelSelect />} />
        <Route path="/test/:level/:domain" element={<TestInfo />} />
        <Route path="/assessment/:level/:domain" element={<AssessmentPage />} />
        <Route path="/coding/:id" element={<CodingPage />} />

        {/* Result and Past Marks Routes */}
        <Route path="/result" element={<ResultPage />} />
        <Route path="/past-marks" element={<PastMarksPage />} />

        {/* Admin Route */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
