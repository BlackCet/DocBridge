import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'; // Assuming this is where you access the user's info

const BookAppointment = () => {
    const { doctorId } = useParams(); // Get doctor ID from URL
    const { user } = useAuthContext(); // Get the authenticated user
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);
    const [appointmentDetails, setAppointmentDetails] = useState({
        patientName: user ? user.fullName : '',
        patientEmail: user ? user.email : '',
        patientPhone: user ? user.phone : '',
        appointmentDate: '',
        appointmentTime: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch doctor details by doctorId
        const fetchDoctor = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctors/${doctorId}`);
                if (!response.ok) {
                    throw new Error('Doctor not found');
                }
                const data = await response.json();
                setDoctor(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchDoctor();
    }, [doctorId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointmentDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { patientName, patientEmail, patientPhone, appointmentDate, appointmentTime } = appointmentDetails;

        if (!patientName || !patientEmail || !patientPhone || !appointmentDate || !appointmentTime) {
            setError('Please fill in all the details');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    doctorId,
                    patientName,
                    patientEmail,
                    patientPhone,
                    appointmentDate,
                    appointmentTime,
                }),
            });

            if (!response.ok) {
                throw new Error('Error booking the appointment');
            }

            // Redirect to confirmation page or dashboard after successful booking
            navigate(`/appointments/confirmation`);
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <p>Loading doctor details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-semibold text-center mb-6">Book Appointment with {doctor.fullName}</h1>
            <div className="flex justify-center mb-6">
                <img
                    src={doctor.profilePicture}
                    alt={`${doctor.fullName}'s Profile`}
                    className="w-32 h-32 rounded-full border-4 border-navylight object-cover"
                />
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Patient Name</label>
                        <input
                            type="text"
                            name="patientName"
                            value={appointmentDetails.patientName}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Patient Email</label>
                        <input
                            type="email"
                            name="patientEmail"
                            value={appointmentDetails.patientEmail}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Patient Phone</label>
                        <input
                            type="text"
                            name="patientPhone"
                            value={appointmentDetails.patientPhone}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Appointment Date</label>
                        <input
                            type="date"
                            name="appointmentDate"
                            value={appointmentDetails.appointmentDate}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Appointment Time</label>
                        <input
                            type="time"
                            name="appointmentTime"
                            value={appointmentDetails.appointmentTime}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                    >
                        Book Appointment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookAppointment;
