import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PatientDashboard from '../components/PatientDashboard'

function Dashboard() {
  return (
    <div>
      <Navbar/>
      <PatientDashboard/>
      <Footer/>
    </div>
  )
}

export default Dashboard