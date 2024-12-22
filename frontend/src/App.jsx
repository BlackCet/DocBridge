import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import PatientLogin from "./pages/PatientLogin";
import Chat from './pages/Chat';
function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/patientlogin" element={<PatientLogin/>} />
          <Route path="/chat" element ={<Chat/>}/>  --changes by sakshi 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
