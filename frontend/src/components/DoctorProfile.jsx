import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from 'react-router-dom';

const DoctorProfile = () => {
    const { user } = useAuthContext();
    const { doctorId } = useParams();  // Get doctorId from the URL
    const [profileData, setProfileData] = useState(null);
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newProfilePicture, setNewProfilePicture] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newSpecialisation, setNewSpecialisation] = useState("");
    const [newSpecialisationDetails, setNewSpecialisationDetails] = useState("");
    const [newExperience, setNewExperience] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        setError(null);  // Reset error on each useEffect call

        if (!doctorId) {
            setError("Doctor ID is missing.");
            return;
        }

        const fetchProfileData = async () => {
            if (!doctorId) {
                setError("Doctor ID is missing.");
                return;
            }
            if (!user || !user.token) {
                setError("User data is missing or incomplete.");
                return; // Early exit if user or user token is missing
            }

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/doctors/profile/${doctorId}`,  // Using doctorId from the URL
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                    setNewUsername(data.username);
                    setNewEmail(data.email);
                    setNewProfilePicture(
                        data.profilePicture ||
                        "https://tse3.mm.bing.net/th?id=OIP.7dTfyRneXPY5b7pj0NKuUgHaHa&pid=Api&P=0&h=180"
                    );
                    setNewPhone(data.phone);
                    setNewSpecialisation(data.specialisation);
                    setNewSpecialisationDetails(data.specialisationDetails);
                    setNewExperience(data.experience);
                } else {
                    setError("Failed to fetch doctor profile data.");
                }
            } catch (error) {
                setError("Error fetching doctor profile data.");
                console.error("Failed to fetch doctor profile data:", error);
            }
        };

        fetchProfileData();
    }, [user, doctorId]);  // Re-fetch data when doctorId or user changes

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow-lg">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-blue-500">Loading...</p>
            </div>
        );
    }

    const handleUpdateProfile = async () => {
        const updatedProfile = {
            username: newUsername,
            email: newEmail,
            password: newPassword,
            profilePicture: newProfilePicture,
            phone: newPhone,
            specialisation: newSpecialisation,
            specialisationDetails: newSpecialisationDetails,
            experience: newExperience,
        };

        // Ensure experience is a valid number
        if (isNaN(newExperience) || newExperience <= 0) {
            setError("Experience must be a positive number.");
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/doctors/profile/${doctorId}`,
                {
                    method: 'PATCH', // Changed to PATCH for partial update
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                    body: JSON.stringify(updatedProfile),
                }
            );

            if (response.ok) {
                const data = await response.json();
                setProfileData(data);
                setIsEditing(false);
            } else {
                setError("Failed to update profile.");
            }
        } catch (error) {
            setError("Error updating profile.");
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className=" min-h-screen">
            <div className="max-w-lg mx-auto my-5 bg-white border border-beigedark rounded-lg shadow-lg p-6 text-center">
                <h1 className="text-3xl font-semibold text-navydark mb-6">
                    Doctor Profile
                </h1>
                <img
                    src={`${newProfilePicture}?${Date.now()}`}
                    alt="Profile"
                    className="w-28 h-28 rounded-full mx-auto mb-4 shadow-lg"
                />
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            className="block w-full mt-2 mb-4 p-3 border border-navylight rounded focus:outline-none focus:border-navydark placeholder-gray-400 bg-gray-100"
                            value={newProfilePicture}
                            onChange={(e) => setNewProfilePicture(e.target.value)}
                            placeholder="Profile picture URL"
                        />

                        <input
                            type="text"
                            className="block w-full mt-2 mb-4 p-3 border border-navylight rounded focus:outline-none focus:border-navydark placeholder-gray-400 bg-gray-100"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            placeholder="Username"
                        />
                        <input
                            type="email"
                            className="block w-full mt-2 mb-4 p-3 border border-navylight rounded focus:outline-none focus:border-navydark placeholder-gray-400 bg-gray-100"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            className="block w-full mt-2 mb-4 p-3 border border-navylight rounded focus:outline-none focus:border-navydark placeholder-gray-400 bg-gray-100"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Password (Hidden)"
                        />
                        <input
                            type="text"
                            className="block w-full mt-2 mb-4 p-3 border border-navylight rounded focus:outline-none focus:border-navydark placeholder-gray-400 bg-gray-100"
                            value={newPhone}
                            onChange={(e) => setNewPhone(e.target.value)}
                            placeholder="Phone Number"
                        />
                        <input
                            type="text"
                            className="block w-full mt-2 mb-4 p-3 border border-navylight rounded focus:outline-none focus:border-navydark placeholder-gray-400 bg-gray-100"
                            value={newSpecialisation}
                            onChange={(e) => setNewSpecialisation(e.target.value)}
                            placeholder="Specialisation"
                        />
                        <textarea
                            className="block w-full mt-2 mb-4 p-3 border border-navylight rounded focus:outline-none focus:border-navydark placeholder-gray-400 bg-gray-100"
                            value={newSpecialisationDetails}
                            onChange={(e) => setNewSpecialisationDetails(e.target.value)}
                            placeholder="Specialisation Details"
                        />
                        <input
                            type="number"
                            className="block w-full mt-2 mb-4 p-3 border border-navylight rounded focus:outline-none focus:border-navydark placeholder-gray-400 bg-gray-100"
                            value={newExperience}
                            onChange={(e) => setNewExperience(e.target.value)}
                            placeholder="Years of Experience"
                        />
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold text-navylight mb-2">
                            {profileData.username}
                        </h2>
                        <p className="text-navylight text-sm mb-4">{profileData.email}</p>
                        <p className="text-navydark font-medium mb-4">
                            Phone: {profileData.phone}
                        </p>
                        <p className="text-navydark font-medium mb-4">
                            Specialisation: {profileData.specialisation}
                        </p>
                        <p className="text-navydark font-medium mb-4">
                            Specialisation Details:
                            <a
                                href={profileData.specialisationDetails}
                                className="text-blue-500"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Link
                            </a>
                        </p>


                        <p className="text-navydark font-medium mb-4">
                            Experience: {profileData.experience} years
                        </p>
                    </>
                )}

                {isEditing ? (
                    <div className="flex justify-center gap-6 mt-6">
                        <button
                            className="px-6 py-2 bg-navydark text-beigelight font-semibold rounded-lg hover:bg-navylight transition"
                            onClick={handleUpdateProfile}
                        >
                            Save Changes
                        </button>
                        <button
                            className="px-6 py-2 bg-beigedark text-navydark font-semibold rounded-lg hover:bg-beigelight transition"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button
                        className="text-sm text-beigelight hover:text-navylight font-semibold bg-navylight hover:bg-navydark rounded-lg px-6 py-3 mt-4 transition-colors duration-200"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    );
};

export default DoctorProfile;
