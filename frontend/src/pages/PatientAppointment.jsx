import React from 'react';
import Navbar from '../components/Navbar';
import PatientAppointmentManage from '../components/PatientAppointmentManage';
import Footer from '../components/Footer';
import { useAuthContext } from "../hooks/useAuthContext";

function PatientAppointment() {
    const { user } = useAuthContext(); 
    const patientId = user.patient._id;
    return (
        <div>
            <Navbar />
            <PatientAppointmentManage patientId={patientId}/>
            <Footer />
        </div>
    );
}

export default PatientAppointment;