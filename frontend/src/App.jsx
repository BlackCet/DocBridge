import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Homepage from "./pages/Homepage";
import PatientLogin from "./pages/PatientLogin";
import Dashboard from "./pages/Dashboard";
import ListPractice from "./pages/ListPractice";
import LoginAsDoctor from "./pages/LoginAsDoctor";
import DoctorDashboardPage from "./pages/DoctorDashboardPage";

function App() {
  const { user } = useAuthContext();

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={!user ? <Homepage /> : <Navigate to={user.usertype === "patient" ? "/dashboard" : "/doctordashboard"} />} />
          <Route path="/patientlogin" element={!user ? <PatientLogin /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user && user.usertype === "patient" ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/listpractice" element={!user ? <ListPractice /> : <Navigate to="/doctorlogin" />} />
          <Route path="/doctorlogin" element={!user ? <LoginAsDoctor /> : <Navigate to="/doctordashboard" />} />
          <Route path="/doctordashboard" element={user && user.usertype === "doctor" ? <DoctorDashboardPage /> : <Navigate to="/" />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;