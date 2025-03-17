import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Payment from '../components/Payment'

function PaymentPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar/>
      <div style={{ flex: "1", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Payment amount={1} /> 
      </div>
      <Footer/>
    </div>
  )
}

export default PaymentPage
