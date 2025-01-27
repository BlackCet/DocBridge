import { useState, useEffect } from "react";

const PatientAppointmentManage = ({ patientId }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            try {
                console.log("Fetching Appointment...");
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/appointments/patient/${patientId}`);
                const data = await response.json();

                console.log("API Response:", data); // Debugging
                if (!response.ok) {
                    throw new Error(data.error || "Failed to fetch appointments");
                }
                console.log("Fetched Appointments Data:", data);
                setAppointments(data);
                
            } catch (err) {
                setError(`Failed to load appointments: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        if (patientId) {
            fetchAppointments();
        }
    }, [patientId]);

    
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="min-h-screen">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-center">Appointments for Patient</h1>
                 {appointments.length === 0 ? (
                    <p className="text-center italic">No appointments available.</p>
                ) : ( 
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b text-center">Doctor Name</th>
                                    <th className="py-2 px-4 border-b text-center">Appointment Date</th>
                                    <th className="py-2 px-4 border-b text-center">Appointment Time</th>
                                    <th className="py-2 px-4 border-b text-center">Symptoms</th>
                                    <th className="py-2 px-4 border-b text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appointment) => (
                                    <tr key={appointment._id}>
                                        
                                        <td className="py-2 px-4 border-b text-center">{appointment.doctor?.fullName || "N/A"}</td>
                                        <td className="py-2 px-4 border-b text-center">
                                            {new Date(appointment.appointmentDate).toLocaleDateString()}
                                        </td>
                                        <td className="py-2 px-4 border-b text-center">{appointment.appointmentTime || "N/A"}</td>
                                        <td className="py-2 px-4 border-b text-center">{appointment.symptoms || "N/A"}</td>
                                        <td className="py-2 px-4 border-b text-center">{appointment.status || "N/A"}</td>
                                        <td className="py-2 px-4 border-b text-center">
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 )} 
            </div>
        </div>
    );
};

export default PatientAppointmentManage;
