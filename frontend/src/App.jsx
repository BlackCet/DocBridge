import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Homepage from "./pages/Homepage";
import PatientLogin from "./pages/PatientLogin";
import Dashboard from "./pages/Dashboard";
import ListPractice from "./pages/ListPractice";
import LoginAsDoctor from "./pages/LoginAsDoctor";
import DoctorDashboardPage from "./pages/DoctorDashboardPage";
import Admin from "./pages/Admin";

function App() {
  const { user } = useAuthContext();

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={!user ? <Homepage /> : <Navigate to="/dashboard" />} />
          <Route path="/listpractice" element={!user ? <ListPractice /> : <Navigate to="/doctor"/>} />
          <Route path="/patientlogin" element={!user ? <PatientLogin /> : <Navigate to="/dashboard" />} />
          <Route path="/doctorlogin" element={!user ? <LoginAsDoctor /> : <Navigate to="/doctordashboard" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/patientlogin" />} />
          <Route path="/doctordashboard" element={user ? <DoctorDashboardPage /> : <Navigate to="/doctorlogin" />} />
          <Route path="/admin" element=<Admin /> />
        </Routes>
      </div>
    </Router>
  );
}

export default App;