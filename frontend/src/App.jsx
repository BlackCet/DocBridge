import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Homepage from "./pages/Homepage";
import PatientLogin from "./pages/PatientLogin";
import Dashboard from "./pages/Dashboard";
import ListPractice from "./pages/ListPractice";
import LoginAsDoctor from "./pages/LoginAsDoctor";
import DoctorDashboardPage from "./pages/DoctorDashboardPage";
import AdminPage from "./pages/AdminPage";


function App() {
  const { user } = useAuthContext();

  //check roles
  const isDoctor = user?.doctor !== undefined; // Check if logged-in user is a doctor
  const isPatient = user?.patient !== undefined; // Check if logged-in user is a patient

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>

          {/* Public routes */}
          <Route path="/" element={!user ? <Homepage /> : <Navigate to="/dashboard" />} />
          <Route path="/listpractice" element={!user ? <ListPractice /> : <Navigate to="/doctor"/>} />
          <Route path="/patientlogin" element={!user ? <PatientLogin /> : <Navigate to="/dashboard" />} />
          <Route path="/doctorlogin" element={!user ? <LoginAsDoctor /> : <Navigate to="/doctordashboard" />} />


          {/* Protected routes */}
          <Route path="/dashboard" element={isPatient ? <Dashboard /> : <Navigate to="/patientlogin" />} />
          <Route path="/doctordashboard" element={isDoctor ? <DoctorDashboardPage /> : <Navigate to="/doctorlogin" />} />

          {/* Admin route */}
          <Route path="/admin" element= {<AdminPage/>} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;