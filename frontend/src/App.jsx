import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import {useAuthContext} from "./hooks/useAuthContext";

import Homepage from "./pages/Homepage";
import PatientLogin from "./pages/PatientLogin";
import Chat from "./pages/Chat";

function App() {
  const {user} = useAuthContext();

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/patientlogin" element={<PatientLogin/>} />
          <Route path="/chat" element={<Chat/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;