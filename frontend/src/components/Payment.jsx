import React, { useState, useEffect } from "react";

const doctorsList = [
    { name: "Dr. Ramesh Verma", specialization: "Cardiologist" },
    { name: "Dr. Anita Sharma", specialization: "Neurologist" },
    { name: "Dr. Vikram Patel", specialization: "Orthopedic Surgeon" },
    { name: "Dr. Sneha Kapoor", specialization: "Pediatrician" },
    { name: "Dr. Arjun Mehta", specialization: "Dermatologist" },
];

const Payment = ({ amount }) => {
    const [loading, setLoading] = useState(false);
    const [doctor, setDoctor] = useState({});
    const [patient, setPatient] = useState({ name: "", email: "", phone: "" });

    // Ensure a consistent final amount
    const finalAmount = amount * 1.05;

    useEffect(() => {
        const randomDoctor = doctorsList[Math.floor(Math.random() * doctorsList.length)];
        setDoctor(randomDoctor);
    }, []);

    const handleChange = (e) => {
        setPatient({ ...patient, [e.target.name]: e.target.value });
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            if (document.querySelector("script[src='https://checkout.razorpay.com/v1/checkout.js']")) {
                resolve(true);
                return;
            }

            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        try {
            setLoading(true);

            const razorpayLoaded = await loadRazorpay();
            if (!razorpayLoaded) {
                alert("⚠️ Failed to load Razorpay SDK.");
                setLoading(false);
                return;
            }

            const response = await fetch("http://localhost:4000/api/payment/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: finalAmount }) // Use consistent amount
            });

            const data = await response.json();
            if (!data.id) throw new Error("Failed to create order.");

            const options = {
                key: import.meta.env.VITE_RAZOR_KEY,
                amount: data.amount,
                currency: "INR",
                name: "Healthcare Services",
                description: `Consultation Fee for ${doctor.name}`,
                order_id: data.id,
                handler: async function (response) {
                    const verifyResponse = await fetch("http://localhost:4000/api/payment/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(response)
                    });

                    const verifyData = await verifyResponse.json();

                    if (verifyData.success) {
                        alert(`✅ Payment Successful for ${doctor.name}`);
                    } else {
                        alert("❌ Payment Verification Failed!");
                    }
                },
                prefill: {
                    name: patient.name || "John Doe",
                    email: patient.email || "johndoe@example.com",
                    contact: patient.phone || "9999999999"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            setLoading(false);

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            setLoading(false);
            console.error("Payment Error:", error);
            alert("⚠️ Payment Error. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-beigelight p-6">
            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl flex flex-col gap-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <div>
                        <h2 className="text-xl font-bold text-navydark">{doctor.name}</h2>
                        <p className="text-sm text-navylight">{doctor.specialization}</p>
                    </div>
                    <p className="text-xl font-semibold text-navydark">₹{finalAmount.toFixed(2)}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                <input
    type="text"
    name="name"
    value={patient.name}
    onChange={handleChange}
    className="p-3 border rounded-lg bg-beigelight focus:outline-none focus:ring-2 focus:ring-navylight"
    placeholder="Name"
/>
<input
    type="email"
    name="email"
    value={patient.email}
    onChange={handleChange}
    className="p-3 border rounded-lg bg-beigelight focus:outline-none focus:ring-2 focus:ring-navylight"
    placeholder="Email"
/>
<input
    type="tel"
    name="phone"
    value={patient.phone}
    onChange={handleChange}
    className="p-3 border rounded-lg bg-beigelight focus:outline-none focus:ring-2 focus:ring-navylight"
    placeholder="Phone"
/>

                </div>

                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className={`w-full py-3 rounded-lg text-white font-semibold ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-navydark hover:bg-navylight transition"
                    }`}
                >
                    {loading ? "Processing..." : `Pay ₹${finalAmount.toFixed(2)}`}
                </button>
            </div>
        </div>
    );
};

export default Payment;
