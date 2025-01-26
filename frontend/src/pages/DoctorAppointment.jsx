import React from 'react'
import Navbar from '../components/Navbar'
import DoctorAppointmentManage from '../components/DoctorAppointmentManage'
import Footer from '../components/Footer'

function DoctorAppointment() {
    return (
      <div>
        <Navbar/>
        <DoctorAppointmentManage/>
        <Footer/>
      </div>
    )
  }
  
  export default DoctorAppointment
