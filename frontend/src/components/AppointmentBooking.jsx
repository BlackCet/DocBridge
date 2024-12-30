import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const BookAppointment = () => {
    const { doctorId } = useParams();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);
    const [appointmentDetails, setAppointmentDetails] = useState({
        patientId: user._id,
        doctorId: doctorId || '',
        appointmentDate: '',
        appointmentTime: '',
        symptoms: '',
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [appointmentBooked, setAppointmentBooked] = useState(false); // State to track if appointment is booked

    useEffect(() => {
        if (!user) {
            setError("User not found");
            setLoading(false);
            return;
        }

        setAppointmentDetails({
            patientId: user._id,
            doctorId: doctorId || '',
            appointmentDate: '',
            appointmentTime: '',
            symptoms: '',
        });

        if (doctorId && user.token) {
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
        } else {
            setError("Doctor ID or user token missing.");
            setLoading(false);
        }
    }, [doctorId, user]);

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

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

        const { doctorId, appointmentDate, appointmentTime, symptoms } = appointmentDetails;

        if (!appointmentDate || !appointmentTime || !symptoms) {
            setError('Please fill in all the details.');
            setSubmitting(false);
            return;
        }

        const today = new Date();
        const selectedDate = new Date(`${appointmentDate}T${appointmentTime}:00`);

        if (selectedDate <= today) {
            setError('Appointment date and time must be in the future.');
            setSubmitting(false);
            return;
        }

        if (!user?.token) {
            setError('You are not authenticated.');
            setSubmitting(false);
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/appointments/patients/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    doctorId: doctorId,
                    appointmentDate,
                    appointmentTime,
                    symptoms,
                    patientId: user._id,
                }),
            });

            if (!response.ok) {
                const responseBody = await response.json();
                throw new Error(responseBody.error || 'Error booking the appointment.');
            }

            setAppointmentBooked(true);  // Set the appointmentBooked state to true to show the success message
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
                Book Appointment with Dr. {doctor?.fullName}
            </h1>
            <div className="flex justify-center mb-6">
                <img
                    src={doctor?.profilePicture || '/default-profile.png'}
                    alt={`${doctor?.fullName}'s Profile`}
                    className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover"
                />
            </div>

            <div className="flex justify-center mb-6">
                <div className="bg-white shadow-lg rounded-lg p-4 max-w-lg w-full mx-auto">
                    <h2 className="text-lg font-semibold mb-2">Doctor Information</h2>
                    <p><strong>Specialisation:</strong> {doctor?.specialisation}</p>
                    {doctor?.specialisationDetails && (
                        <p><strong>Specialisation Details:</strong>
                            <a href={doctor?.specialisationDetails} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                Click here for details
                            </a>
                        </p>
                    )}
                    <p><strong>Experience:</strong> {doctor?.experience} years</p>
                    <p><strong>Email:</strong>
                        <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${doctor?.email}`} target="_blank"
                            rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {doctor?.email}
                        </a>
                    </p>
                    <p><strong>Phone:</strong> {doctor?.phone}</p>
                    <p><strong>Age:</strong> {doctor?.dateOfBirth ? calculateAge(doctor.dateOfBirth) : "N/A"} years</p>
                </div>
            </div>

            <div className="flex justify-center mb-6">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
                    <h2 className="text-xl font-semibold mb-4">Appointment Details</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 my-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-gray-700">Appointment Date</label>
                                <input
                                    type="date"
                                    name="appointmentDate"
                                    value={appointmentDetails.appointmentDate}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md"
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
                                    className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4 w-full">
                            <label className="block text-gray-700">Symptoms</label>
                            <textarea
                                name="symptoms"
                                value={appointmentDetails.symptoms}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md"
                                placeholder="Describe your symptoms"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <button
                                type="submit"
                                className={`w-full p-3 bg-navylight hover:bg-navydark text-white font-semibold rounded-md ${submitting ? "opacity-50" : ""}`}
                                disabled={submitting}
                            >
                                {submitting ? 'Submitting...' : 'Book Appointment'}
                            </button>
                        </div>
                    </form>
                    {error && (
                        <div className="mt-4 text-red-600 text-center">
                            <p>{error}</p>
                        </div>
                    )}
                    {appointmentBooked && (
                        <div className="mt-4 text-green-600 text-center">
                            <p>Appointment booked, wait for confirmation from the doctor.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;
