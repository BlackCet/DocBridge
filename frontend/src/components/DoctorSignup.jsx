import React, { useState } from 'react';
import { useSignup } from '../hooks/useDoctorSignup';

function Signup() {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('Male');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [specialisation, setSpecialisation] = useState('');
    const [specialisationDetails, setSpecialisationDetails] = useState('');
    const [experience, setExperience] = useState('');
    const { signup, isLoading, error } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !email || !password || !username || !fullName || !phone ||
            !gender || !dateOfBirth || !specialisation || !specialisationDetails ||
            !experience
        ) {
            alert('Please fill in all fields.');
            return;
        }

        const payload = {
            email,
            password,
            username,
            fullName,
            phone,
            gender,
            dateOfBirth,
            specialisation,
            specialisationDetails,
            experience,
        };

        console.log('Payload being sent:', payload);

        await signup(payload); // Assuming `signup` accepts a JSON payload
    };


    return (
        <div>
            <div className="bg-gray-100 flex items-center justify-center min-h-screen" style={{ color: "black" }}>
                <section className="bg-light-gray px-6 py-16 mx-4 w-full flex flex-col items-center">
                    {/* Introductory Text */}
                    <p className="text-md text-navydark mb-2 text-center">
                        DocBridge helps you bring in more new patients and keep them coming back –
                        while saving your practice valuable time.
                    </p>

                    <p className="text-md text-navydark mb-8 text-center">
                        List your practice today and make it easier for patients to find and connect with you.
                    </p>

                    <div className="form-wrapper w-full max-w-4xl bg-white p-8 rounded shadow-md">
                        <form className="signup" onSubmit={handleSubmit}>
                            <h3 className="text-2xl text-gray-800 font-semibold mb-6 text-center">List your Practice</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div>
                                    <label className="block mb-2 text-gray-600">Full Name:</label>
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Enter your full name"
                                        className="border rounded w-full p-2 bg-white"
                                    />
                                </div>

                                {/* Username */}
                                <div>
                                    <label className="block mb-2 text-gray-600">Username:</label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="This is how your patients will see you"
                                        className="border rounded w-full p-2 bg-white"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block mb-2 text-gray-600">Email address:</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your Email"
                                        className="border rounded w-full p-2 bg-white"
                                    />
                                </div>
                                {/* Password */}
                                <div>
                                    <label className="block mb-2 text-gray-600">Password:</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter a strong password"
                                        className="border rounded w-full p-2 mb-4 bg-white"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block mb-2 text-gray-600">Phone:</label>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Enter your Phone"
                                        className="border rounded w-full p-2 bg-white"
                                    />
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="block mb-2 text-gray-600">Gender:</label>
                                    <select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        placeholder="Enter your gender"
                                        className="border rounded w-full p-2 bg-white"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* Date of Birth */}
                                <div>
                                    <label className="block mb-2 text-gray-600">Date of Birth:</label>
                                    <input
                                        type="date"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        placeholder="DOB"
                                        className="border rounded w-full p-2 bg-white"
                                    />
                                </div>

                                {/* Specialisation */}
                                <div>
                                    <label className="block mb-2 text-gray-600">Specialisation:</label>
                                    <input
                                        type="text"
                                        value={specialisation}
                                        onChange={(e) => setSpecialisation(e.target.value)}
                                        placeholder="What is your Specialisation"
                                        className="border rounded w-full p-2 bg-white"
                                    />
                                </div>

                                {/* Specialisation Details */}
                                <div>
                                    <label className="block mb-2 text-gray-600">Specialisation Details Link:</label>
                                    <input
                                        type="text"
                                        value={specialisationDetails}
                                        onChange={(e) => setSpecialisationDetails(e.target.value)}
                                        placeholder="Drive link containing the certification and license"
                                        className="border rounded w-full p-2 bg-white"
                                    />
                                </div>

                                {/* Experience */}
                                <div>
                                    <label className="block mb-2 text-gray-600">Experience (in years):</label>
                                    <input
                                        type="number"
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                        className="border rounded w-full p-2 bg-white"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                className="bg-navylight hover:bg-navydark text-white rounded w-full py-2 mt-6 transition duration-200"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing up...' : 'Sign up'}
                            </button>

                            {error && <div className="text-red-500 mt-4">{error}</div>}
                        </form>
                    </div>
                </section>
            </div>
        </div>

    );
}

export default Signup;
