import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Specialization</th>
            <th className="py-2 px-4 border-b">Approval Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id}>
              <td className="py-2 px-4 border-b">{doctor.fullName}</td>
              <td className="py-2 px-4 border-b">{doctor.email}</td>
              <td className="py-2 px-4 border-b">{doctor.specialisation}</td>
              <td className="py-2 px-4 border-b">
                {doctor.isApproved ? "Approved" : "Pending"}
              </td>
              <td className="py-2 px-4 border-b">
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
      <Footer />
    </div>
  );
};

export default Admin;
