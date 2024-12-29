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

function App() {
  const { user } = useAuthContext();

  // Role checks
  const isDoctor = user?.doctor !== undefined;
  const isPatient = user?.patient !== undefined;

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>

          {/* Public routes */}
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

          {/* Patient dashboard */}
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

          {/* Doctor dashboard */}
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

          {/* changes pulled from teh frontend branch */}
          <Route
            path="/doctorbyspecialisation/:specialisation"
            element={
              <DoctorBySpecialisation />
            }
          />
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
                ? isDoctor || isPatient
                  ? <DoctorProfilePage />
                  : <Navigate to="/" />
                : <Navigate to="/doctorlogin" />
            }
          />

          {/* Admin panel */}
          <Route
            path="/admin"
            element=<AdminPage />
          />

<Route path="/Chat" element={<Chat />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
