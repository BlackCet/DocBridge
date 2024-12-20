import React, { useState } from 'react';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: '',
        phone: '',
        gender: '',
        dateOfBirth: '',
    });
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data to Send:", formData);  // Log the data

        if (!validatePassword(formData.password)) {
            setResponseMessage('Password must be at least 8 characters long, contain a capital letter, a lowercase letter, a number, and a special character.');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/patients/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),  // Send the data directly
            });

            const data = await response.json();
            if (response.ok) {
                setResponseMessage('Signup successful! Welcome to DocBridge.');
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    fullName: '',
                    phone: '',
                    gender: '',
                    dateOfBirth: '',
                });
            } else {
                setResponseMessage(`Signup failed: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            setResponseMessage(`An error occurred: ${error.message}`);
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen" style={{ color: 'black' }}>
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
                        Whether you're looking for an online consultation or need support with in-person visits,
                        DocBridge offers both essential and advanced features to ensure a smooth healthcare experience.
                    </p>
                    <div className="border-b-2 border-gray-300 my-4 mx-1"></div>
                    <p className="mb-4">
                        Our mission is to make healthcare more accessible, efficient, and patient-centric by offering a
                        reliable and secure platform where doctors and patients can connect, communicate, and receive
                        the care they deserve.
                    </p>
                </div>
                <div className="md:w-1/2 mb-4 mx-1 md:mt-0 flex justify-center items-center mt-8 md:mt-0">
                    <div className="form-wrapper w-full max-w-sm bg-white p-8 rounded shadow-md">
                        <form className="signup" onSubmit={handleSubmit}>
                            <h3 className="text-2xl text-gray-800 font-semibold mb-4">Signup</h3>
                            <label className="block mb-2 text-gray-600">Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="border rounded w-full p-2 mb-4 bg-white"
                                required
                            />
                            <label className="block mb-2 text-gray-600">Email address:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border rounded w-full p-2 mb-4 bg-white"
                                required
                            />
                            <label className="block mb-2 text-gray-600">Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="border rounded w-full p-2 mb-4 bg-white"
                                required
                            />
                            <label className="block mb-2 text-gray-600">Full Name:</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="border rounded w-full p-2 mb-4 bg-white"
                                required
                            />
                            <label className="block mb-2 text-gray-600">Phone:</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="border rounded w-full p-2 mb-4 bg-white"
                                required
                            />
                            <label className="block mb-2 text-gray-600">Gender:</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="border rounded w-full p-2 mb-4 bg-white"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <label className="block mb-2 text-gray-600">Date of Birth:</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className="border rounded w-full p-2 mb-4 bg-white"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-navylight hover:bg-navydark text-white rounded w-full py-2 transition duration-200"
                            >
                                Sign up
                            </button>
                        </form>
                        {responseMessage && (
                            <p className="mt-4 text-center text-gray-800">{responseMessage}</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Signup;
