import { useState, useEffect } from "react";

const Admin = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch doctors
    useEffect(() => {
        const fetchDoctors = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctors/docs`);
                const data = await response.json();
                setDoctors(data);
            } catch (err) {
                setError("Failed to load doctors");
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    // Approve a doctor
    const handleApproval = async (id, isApproved) => {
        try {
            await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctors/${id}/approve`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isApproved }),
            });
            setDoctors((prev) =>
                prev.map((doc) =>
                    doc._id === id ? { ...doc, isApproved } : doc
                )
            );
            alert(`Doctor ${isApproved ? "approved" : "rejected"}`);
        } catch (err) {
            alert("Failed to update approval status");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="min-h-screen">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-center">Admin Panel</h1>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-center">Name</th>
                            <th className="py-2 px-4 border-b text-center">Email</th>
                            <th className="py-2 px-4 border-b text-center">Specialization</th>
                            <th className="py-2 px-4 border-b text-center">Approval Status</th>
                            <th className="py-2 px-4 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor) => (
                            <tr key={doctor._id}>
                                <td className="py-2 px-4 border-b text-center">{doctor.fullName}</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <a
                                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${doctor.email}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {doctor.email}
                                    </a>
                                </td>
                                <td className="py-2 px-4 border-b text-center">
                                    {doctor.specialisation}
                                    {doctor.specialisationDetails && (
                                        <p>
                                            <a
                                                href={doctor.specialisationDetails}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Click here for details
                                            </a>
                                        </p>
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b text-center">
                                    {doctor.isApproved ? "Approved" : "Pending"}
                                </td>
                                <td className="py-2 px-4 border-b text-center">
                                    {!doctor.isApproved && (
                                        <>
                                            <button
                                                className="bg-green-500 text-white py-1 px-2 mr-2 rounded"
                                                onClick={() => handleApproval(doctor._id, true)}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="bg-red-500 text-white py-1 px-2 rounded"
                                                onClick={() => handleApproval(doctor._id, false)}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
