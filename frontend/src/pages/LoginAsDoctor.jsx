import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DoctorLogin from '../components/DoctorLogin'

function LoginAsDoctor() {
  return (
    <div>
      <Navbar/>
      <DoctorLogin/>
      <Footer/>
    </div>
  )
}

export default LoginAsDoctor
