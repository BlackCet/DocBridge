import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import {useAuthContext} from "./hooks/useAuthContext";

import Homepage from "./pages/Homepage";
import PatientLogin from "./pages/PatientLogin";
import Dashboard from "./pages/Dashboard";

function App() {
  const {user} = useAuthContext();

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={!user ? <Homepage /> : <Navigate to="/dashboard" />} />
          <Route path="/patientlogin" element={!user ? <PatientLogin /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/patientlogin" />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;