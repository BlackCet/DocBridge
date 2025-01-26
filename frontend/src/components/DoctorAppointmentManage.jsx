// import { useState, useEffect } from "react";

// const DoctorAppointmentManage = ({ doctorId }) => {
//     const [appointments, setAppointments] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     // Fetch appointments for the given doctorId
//     useEffect(() => {
//         const fetchAppointments = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/appointments/doctor/${doctorId}`);
//                 const data = await response.json();

//                 if (!response.ok) {
//                     throw new Error(data.error || 'Failed to fetch appointments');
//                 }

//                 setAppointments(data);
//             } catch (err) {
//                 setError(`Failed to load appointments: ${err.message}`);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (doctorId) {
//             fetchAppointments();
//         }
//     }, [doctorId]);

//     // Handle approving or rejecting the appointment
//     const handleStatusChange = async (appointmentId, status) => {
//         try {
//             const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/appointments/${appointmentId}/status`, {
//                 method: "PATCH",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ status }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.error || 'Failed to update status');
//             }

//             const updatedAppointment = await response.json();
//             setAppointments((prev) =>
//                 prev.map((appointment) =>
//                     appointment._id === appointmentId ? updatedAppointment : appointment
//                 )
//             );
//         } catch (err) {
//             alert(`Failed to update status: ${err.message}`);
//         }
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;
    

//     return (
//         <div className="min-h-screen">
//             <div className="container mx-auto p-4">
//                 <h1 className="text-2xl font-bold mb-4 text-center">Appointments for Doctor</h1>
//                 <table className="min-w-full bg-white border border-gray-300">
//                     <thead>
//                         <tr>
//                             <th className="py-2 px-4 border-b text-center">Patient Name</th>
//                             <th className="py-2 px-4 border-b text-center">Appointment Date</th>
//                             <th className="py-2 px-4 border-b text-center">Appointment Time</th>
//                             <th className="py-2 px-4 border-b text-center">Symptoms</th>
//                             <th className="py-2 px-4 border-b text-center">Status</th>
//                             <th className="py-2 px-4 border-b text-center">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {appointments.map((appointment) => (
//                             <tr key={appointment._id}>
//                                 <td className="py-2 px-4 border-b text-center">{appointment.patient.fullName}</td>
//                                 <td className="py-2 px-4 border-b text-center">
//                                     {new Date(appointment.appointmentDate).toLocaleDateString()}
//                                 </td>
//                                 <td className="py-2 px-4 border-b text-center">{appointment.appointmentTime}</td>
//                                 <td className="py-2 px-4 border-b text-center">{appointment.symptoms}</td>
//                                 <td className="py-2 px-4 border-b text-center">{appointment.status}</td>
//                                 <td className="py-2 px-4 border-b text-center">
//                                     {appointment.status === "Pending" && (
//                                         <>
//                                             <button
//                                                 className="bg-green-500 text-white py-1 px-2 mr-2 rounded"
//                                                 onClick={() => handleStatusChange(appointment._id, "Approved")}
//                                             >
//                                                 Approve
//                                             </button>
//                                             <button
//                                                 className="bg-red-500 text-white py-1 px-2 rounded"
//                                                 onClick={() => handleStatusChange(appointment._id, "Rejected")}
//                                             >
//                                                 Reject
//                                             </button>
//                                         </>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default DoctorAppointmentManage;

import { useState, useEffect } from "react";

const DoctorAppointmentManage = ({ doctorId }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            try {
                console.log("Fetching Appointment...");
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/appointments/doctor/${doctorId}`);
                const data = await response.json();

                console.log("API Response:", data); // Debugging
                if (!response.ok) {
                    throw new Error(data.error || "Failed to fetch appointments");
                }
                setAppointments(data);
                
            } catch (err) {
                setError(`Failed to load appointments: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        if (doctorId) {
            fetchAppointments();
        }
    }, [doctorId]);

    const handleStatusChange = async (appointmentId, status) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/appointments/${appointmentId}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update status");
            }

            const updatedAppointment = await response.json();
            setAppointments((prev) =>
                prev.map((appointment) =>
                    appointment._id === appointmentId ? updatedAppointment : appointment
                )
            );
        } catch (err) {
            alert(`Failed to update status: ${err.message}`);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="min-h-screen">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-center">Appointments for Doctor</h1>
                {appointments.length === 0 ? (
                    <p className="text-center italic">No appointments available.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b text-center">Patient Name</th>
                                    <th className="py-2 px-4 border-b text-center">Appointment Date</th>
                                    <th className="py-2 px-4 border-b text-center">Appointment Time</th>
                                    <th className="py-2 px-4 border-b text-center">Symptoms</th>
                                    <th className="py-2 px-4 border-b text-center">Status</th>
                                    <th className="py-2 px-4 border-b text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appointment) => (
                                    <tr key={appointment._id}>
                                        <td className="py-2 px-4 border-b text-center">{appointment.patient?.fullName || "N/A"}</td>
                                        <td className="py-2 px-4 border-b text-center">
                                            {new Date(appointment.appointmentDate).toLocaleDateString()}
                                        </td>
                                        <td className="py-2 px-4 border-b text-center">{appointment.appointmentTime || "N/A"}</td>
                                        <td className="py-2 px-4 border-b text-center">{appointment.symptoms || "N/A"}</td>
                                        <td className="py-2 px-4 border-b text-center">{appointment.status || "N/A"}</td>
                                        <td className="py-2 px-4 border-b text-center">
                                            {appointment.status === "Pending" ? (
                                                <>
                                                    <button
                                                        className="bg-green-500 text-white py-1 px-2 mr-2 rounded"
                                                        onClick={() => handleStatusChange(appointment._id, "Approved")}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="bg-red-500 text-white py-1 px-2 rounded"
                                                        onClick={() => handleStatusChange(appointment._id, "Rejected")}
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            ) : (
                                                <span className="italic">No actions available</span>
                                            )}
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

export default DoctorAppointmentManage;
