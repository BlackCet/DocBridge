import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Homepage from "./pages/Homepage";
import PatientLogin from "./pages/PatientLogin";
import Dashboard from "./pages/Dashboard";
import ListPractice from "./pages/ListPractice";
import LoginAsDoctor from "./pages/LoginAsDoctor";
import DoctorDashboardPage from "./pages/DoctorDashboardPage";
import AdminPage from "./pages/AdminPage";
import DoctorBySpecialisation from "./pages/DoctorBySpecialisation";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import AppointmentBookingPage from "./pages/AppointmentBookingPage";
import Chat from "./pages/Chat";
import DoctorAppointment from "./pages/DoctorAppointment";

function App() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);

  // Check if the user data is available (i.e., it's loaded from localStorage or any auth context)
  useEffect(() => {
    if (user !== undefined) {
      setLoading(false); // If the user state is loaded, set loading to false
    }
  }, [user]);

  // If the user data is still being loaded, show a loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={!user ? <Homepage /> : <Navigate to="/dashboard" />} />
          <Route path="/listpractice" element={!user ? <ListPractice /> : <Navigate to="/doctor" />} />
          <Route path="/patientlogin" element={!user ? <PatientLogin /> : <Navigate to="/dashboard" />} />
          <Route path="/doctorlogin" element={!user ? <LoginAsDoctor /> : <Navigate to="/doctordashboard" />} />
          <Route path="/doctorbyspecialisation/:specialisation" element={<DoctorBySpecialisation />} />
          <Route path="/book-appointment/:doctorId" element={user?.patient ? <AppointmentBookingPage /> : <Navigate to="/patientlogin" />} />
          <Route path="/profile/:doctorId" element={user ? <DoctorProfilePage /> : <Navigate to="/doctorlogin" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/patientlogin" />} />
          <Route path="/doctordashboard" element={user ? <DoctorDashboardPage /> : <Navigate to="/doctorlogin" />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/DoctorAppointment" element={<DoctorAppointment />} />
          <Route path="/chat" element={user? <Chat/> : <Navigate to="/patientlogin"/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;