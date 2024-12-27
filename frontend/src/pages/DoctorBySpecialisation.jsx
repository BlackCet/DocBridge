import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuthContext } from '../hooks/useAuthContext';

const DoctorBySpecialisation = () => {
    const { specialisation } = useParams();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();  // Hook to navigate to a different route
    const { user } = useAuthContext();  // Assuming you have this custom hook for authentication

    const calculateAge = (dateOfBirth) => {
        if (!dateOfBirth) {
            return "N/A";  // Return a default value if dateOfBirth is not available
        }

        const birthDate = new Date(dateOfBirth);
        if (isNaN(birthDate)) {
            return "Invalid Date";  // Handle invalid date format
        }

        const currentDate = new Date();
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDifference = currentDate.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    useEffect(() => {
        const fetchDoctors = async () => {
            const minLoadingTime = 500;  // Minimum loading time in milliseconds
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctors/specialisation/${specialisation}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDoctors(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching doctors:', error);
                setDoctors([]);  // Set doctors to an empty array in case of an error
                setLoading(false);
            }

            setTimeout(() => {
                setLoading(false);
            }, minLoadingTime);
        };

        fetchDoctors();
    }, [specialisation]);

    // Handle book appointment button click
    const handleBookAppointment = (doctorId) => {
        if (user && user.patient.usertype === "patient") {
            // Redirect to the booking page with the doctorId
            navigate(`/book-appointment/${doctorId}`); // Assuming you have a route like /book-appointment/:doctorId
        } else if (user) {
            // If the user is logged in but not a patient
            alert("Only patients can book appointments.");
        } else {
            // If no user is logged in, redirect to the login page
            navigate("/patientlogin");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <p className="text-2xl font-semibold text-navydark mb-4">Loading doctors for {specialisation}, please wait...</p>
                    <div className="border-t-4 border-blue-600 border-solid w-16 h-16 rounded-full animate-spin mx-auto"></div>
                </div>
            </div>
        );
    }

    return (
        <div key={specialisation}>
            <Navbar />
            <div className="min-h-screen p-6">
                <h1 className="text-3xl font-semibold text-center text-navydark mb-6">Doctors: {specialisation}</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" key={specialisation}>
                    {doctors.length > 0 ? (
                        doctors.map((doctor) => (
                            <div
                                key={doctor._id}
                                className="bg-beigedark rounded-lg shadow-lg overflow-hidden flex flex-col items-center md:flex-row md:items-start"
                            >
                                {/* Profile Picture */}
                                <img
                                    src={doctor.profilePicture}
                                    alt={`${doctor.fullName}'s Profile`}
                                    className="w-32 h-32 md:w-36 md:h-36 rounded-full mt-4 md:mt-0 mx-auto md:mx-4 object-cover border-4 border-navylight"
                                />

                                {/* Doctor's Details */}
                                <div className="p-6 text-center md:text-left flex-1">
                                    <h3 className="text-xl font-semibold text-navylight mb-2">
                                        {doctor.fullName}
                                    </h3>
                                    <p className="text-navydark text-sm mb-2">
                                        Specialisation:{" "}
                                        <span className="font-medium text-blue-600">
                                            {doctor.specialisation}
                                        </span>
                                    </p>
                                    <p className="text-navydark text-sm mb-4">
                                        Experience: {doctor.experience} years
                                    </p>
                                    <p className="text-navydark text-sm mb-2">
                                        Contact:{" "}
                                        <span className="font-medium text-blue-600">{doctor.phone}</span>
                                    </p>
                                    <p className="text-navydark text-sm mb-2">
                                        Age:{" "}
                                        <span className="font-medium text-blue-600">
                                            {calculateAge(doctor.dateOfBirth)}
                                        </span>
                                    </p>
                                    <div className="flex justify-between items-center mt-4">
                                        <button
                                            className={`bg-navylight text-white px-4 py-2 rounded-md hover:bg-navydark transition duration-300 ${user && user.patient.usertype !== "patient" ? "cursor-not-allowed opacity-50" : ""}`}
                                            onClick={() => handleBookAppointment(doctor._id)} // Pass doctor ID to the function
                                            disabled={user && user.patient.usertype !== "patient"}  // Disable the button if the user is not a patient
                                        >
                                            Book Appointment
                                        </button>
                                        <span className="text-navydark text-sm">
                                            {doctor.experience} years
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-navydark">
                            No doctors found for this specialization.
                        </p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DoctorBySpecialisation;
