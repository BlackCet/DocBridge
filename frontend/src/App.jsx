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
import VideoCall from "./pages/VideoCall";
import VideoRoom from "./pages/VideoRoom";

function App() {
  const { user } = useAuthContext();

  const isDoctor = user?.doctor !== undefined;
  const isPatient = user?.patient !== undefined;

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={!user ? <Homepage /> : <Navigate to={isDoctor ? "/doctordashboard" : "/dashboard"} />}
          />
          <Route
            path="/listpractice"
            element={!user ? <ListPractice /> : <Navigate to={isDoctor ? "/doctordashboard" : "/dashboard"} />}
          />
          <Route
            path="/patientlogin"
            element={!user ? <PatientLogin /> : <Navigate to={isDoctor ? "/doctordashboard" : "/dashboard"} />}
          />
          <Route
            path="/doctorlogin"
            element={!user ? <LoginAsDoctor /> : <Navigate to={isDoctor ? "/doctordashboard" : "/dashboard"} />}
          />

          {/* Patient Dashboard */}
          <Route
            path="/dashboard"
            element={
              user
                ? isPatient
                  ? <Dashboard />
                  : <Navigate to={isDoctor ? "/doctordashboard" : "/"} />
                : <Navigate to="/patientlogin" />
            }
          />

          {/* Doctor Dashboard */}
          <Route
            path="/doctordashboard"
            element={
              user
                ? isDoctor
                  ? <DoctorDashboardPage />
                  : <Navigate to={isPatient ? "/dashboard" : "/"} />
                : <Navigate to="/doctorlogin" />
            }
          />

          {/* Specialized Routes */}
          <Route path="/doctorbyspecialisation/:specialisation" element={<DoctorBySpecialisation />} />
          <Route
            path="/book-appointment/:doctorId"
            element={
              user
                ? isPatient
                  ? <AppointmentBookingPage />
                  : <Navigate to="/" />
                : <Navigate to="/patientlogin" />
            }
          />
          <Route
            path="/profile/:doctorId"
            element={
              user
                ? (isDoctor || isPatient)
                  ? <DoctorProfilePage />
                  : <Navigate to="/" />
                : <Navigate to="/doctorlogin" />
            }
          />

          {/* Admin */}
          <Route path="/admin" element={user ? <AdminPage /> : <Navigate to="/" />} />

          {/* Misc */}
          <Route path="/Chat" element={<Chat />} />
          <Route path="/VideoCall" element={<VideoCall />} />
          <Route path="/VideoRoom/:id" element={<VideoRoom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
