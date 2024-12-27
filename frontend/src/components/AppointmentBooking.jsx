import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const BookAppointment = () => {
    const { doctorId } = useParams();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);
    const [appointmentDetails, setAppointmentDetails] = useState({
        patientName: user?.fullName || '',
        patientEmail: user?.email || '',
        patientPhone: user?.phone || '',
        appointmentDate: '',
        appointmentTime: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setError(null);  // Reset error on each useEffect call
        if (!doctorId) {
            setError("Doctor ID is missing.");
            return;
        }
        if (!user || !user.token) {
            setError("User data is missing or incomplete.");
            return;
        }

        const fetchDoctor = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctors/appointmentprofile/${doctorId}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setDoctor(data);
                } else {
                    setError("Failed to fetch doctor details.");
                }
            } catch (err) {
                setError("Error fetching doctor details.");
            } finally {
                setLoading(false);
            }
        };

        fetchDoctor();
    }, [doctorId, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointmentDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const { patientName, patientEmail, patientPhone, appointmentDate, appointmentTime } =
            appointmentDetails;

        if (!patientName || !patientEmail || !patientPhone || !appointmentDate || !appointmentTime) {
            setError('Please fill in all the details.');
            setSubmitting(false);
            return;
        }

        const today = new Date();
        const selectedDate = new Date(`${appointmentDate}T${appointmentTime}`);
        if (selectedDate <= today) {
            setError('Appointment date and time must be in the future.');
            setSubmitting(false);
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
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
                throw new Error('Error booking the appointment.');
            }

            navigate(`/appointments/confirmation`, {
                state: { doctorName: doctor?.fullName, ...appointmentDetails },
            });
        } catch (err) {
            setError(err.message || 'Failed to book appointment.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-blue-500">Loading doctor details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="bg-red-100 text-red-800 p-4 rounded">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-semibold text-center mb-6">
                Book Appointment with {doctor?.fullName}
            </h1>
            <div className="flex justify-center mb-6">
                <img
                    src={doctor?.profilePicture || '/default-profile.png'}
                    alt={`${doctor?.fullName}'s Profile`}
                    className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover"
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
                            placeholder="Enter your full name"
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
                            placeholder="Enter your email"
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
                            placeholder="Enter your phone number"
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
                        className={`w-full py-3 font-semibold rounded-md ${submitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        disabled={submitting}
                    >
                        {submitting ? 'Booking...' : 'Book Appointment'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookAppointment;
