import React, { useState } from 'react';
import {useLogin} from '../hooks/useLogin';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your form submission logic here

        await login(email, password);
    };

    return (
        <div className=" flex items-center justify-center min-h-screen" style={{ color: "black" }}>
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

                    <p className="text-gray-700 mb-6">Whether you're looking for an online consultation or need support with in-person visits, DocBridge offers both essential and advanced features to ensure a smooth healthcare experience.</p>
                    <div className="border-b-2 border-gray-300 my-4 mx-1"></div>
                    <p className="mb-4">Our mission is to make healthcare more accessible, efficient, and patient-centric by offering a reliable and secure platform where doctors and patients can connect, communicate, and receive the care they deserve.</p>
                </div>
                <div className="md:w-1/2 mb-4 mx-1 md:mt-0 flex justify-center items-center mt-8 md:mt-0">
                    <div className="form-wrapper w-full max-w-sm bg-white p-8 rounded shadow-md">
                        <form className="login" onSubmit={handleSubmit}>
                            <h3 className="text-2xl text-gray-800 font-semibold mb-4">Patient Login</h3>
                            <label className="block mb-2 text-gray-600">Email address:</label>
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="border rounded w-full p-2 mb-4 bg-white"
                            />
                            <label className="block mb-2 text-gray-600">Password:</label>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className="border rounded w-full p-2 mb-4 bg-white"
                            />
                            <button className="bg-navylight hover:bg-navydark text-white rounded w-full py-2 transition duration-200">
                                Log in
                            </button>
                            {error && <p className="text-red-500 mt-4">{error}</p>}
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
