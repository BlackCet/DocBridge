import React, { useState } from 'react'; 
import { useSignup } from '../hooks/useSignup';

function Signup() {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('Male'); // Default to Male
    const [dateOfBirth, setDateOfBirth] = useState('');
    const { signup, isLoading, error } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Call signup with the form data
        await signup(fullName, username, email, password, phone, gender, dateOfBirth);
    };

    return (
        <div>
            <div className="bg-gray-100 flex items-center justify-center min-h-screen" style={{ color: "black" }}>
                <section className="bg-light-gray px-6 py-20 mx-4 w-full flex flex-col md:flex-row justify-center items-center">
                    <div className="md:w-1/2 mx-5 flex flex-col justify-center items-center text-center md:text-left">
                        <h1 className="my-6 font-bold text-navylight">
                            <span className="text-7xl">D</span>
                            <span className="text-6xl">o</span>
                            <span className="text-5xl">c</span>
                            <span className="text-4xl">B</span>
                            <span className="text-3xl">r</span>
                            <span className="text-4xl">i</span>
                            <span className="text-5xl">d</span>
                            <span className="text-6xl">g</span>
                            <span className="text-7xl">e</span>
                        </h1>

                        <p className="text-gray-700 mb-6">
                            Whether you're looking for an online consultation or need support with in-person visits, DocBridge offers both essential and advanced features to ensure a smooth healthcare experience.
                        </p>
                        <div className="border-b-2 border-gray-300 my-4 mx-1"></div>
                        <p className="mb-4">
                            Our mission is to make healthcare more accessible, efficient, and patient-centric by offering a reliable and secure platform where doctors and patients can connect, communicate, and receive the care they deserve.
                        </p>
                    </div>
                    <div className="md:w-1/2 mb-4 mx-1 md:mt-0 flex justify-center items-center mt-8 md:mt-0">
                        <div className="form-wrapper w-full max-w-sm bg-white p-8 rounded shadow-md">
                            <form className="signup" onSubmit={handleSubmit}>
                                <h3 className="text-2xl text-gray-800 font-semibold mb-4">Signup</h3>

                                {/* Full Name */}
                                <label className="block mb-2 text-gray-600">Full Name:</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="border rounded w-full p-2 mb-4 bg-white"
                                />

                                {/* Username */}
                                <label className="block mb-2 text-gray-600">Username:</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="border rounded w-full p-2 mb-4 bg-white"
                                />

                                {/* Email */}
                                <label className="block mb-2 text-gray-600">Email address:</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border rounded w-full p-2 mb-4 bg-white"
                                />

                                {/* Password */}
                                <label className="block mb-2 text-gray-600">Password:</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border rounded w-full p-2 mb-4 bg-white"
                                />

                                {/* Phone */}
                                <label className="block mb-2 text-gray-600">Phone:</label>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="border rounded w-full p-2 mb-4 bg-white"
                                />

                                {/* Gender */}
                                <label className="block mb-2 text-gray-600">Gender:</label>
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="border rounded w-full p-2 mb-4 bg-white"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>

                                {/* Date of Birth */}
                                <label className="block mb-2 text-gray-600">Date of Birth:</label>
                                <input
                                    type="date"
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    className="border rounded w-full p-2 mb-4 bg-white"
                                />

                                {/* Submit Button */}
                                <button className="bg-navylight hover:bg-navydark text-white rounded w-full py-2 transition duration-200">
                                    Sign up
                                </button>
                                {error && <div className="error">{error}</div>}
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Signup;
