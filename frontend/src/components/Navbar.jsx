import React from "react";
import { Link } from 'react-router-dom';
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function Navbar() {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }


    return (
        <div>
            <div className="navbar" style={{ backgroundColor: "#213555", color: "#F5EFE7" }}>
                {/* Navbar Start - Logo and Dropdown */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content  bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                            style={{ backgroundColor: "#D8C4B6", color: "#213555" }}
                        >    <li>
                                <details>
                                    <summary style={{
                                        color: "#213555",
                                        fontWeight: "bold",
                                        padding: "10px 15px",
                                        borderRadius: "5px",
                                    }}>Login</summary>
                                    <ul className="p-2">
                                        <li><Link to="/doctorlogin" style={{ color: "#213555" }}>
                                            DOCTOR
                                        </Link></li>
                                        <li><Link to="/patientlogin" style={{ color: "#213555" }}>
                                            PATIENT
                                        </Link></li>
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <details className="relative">
                                    <summary
                                        style={{
                                            color: "#213555",
                                            fontWeight: "bold",
                                            padding: "10px 15px",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        Browse
                                    </summary>
                                    <ul
                                        className="p-2 max-h-[70vh] overflow-y-auto"
                                        style={{
                                            backgroundColor: "#D8C4B6",
                                            color: "#213555",
                                            width: "100%",
                                            maxWidth: "300px", // Adjust the width for small devices
                                            borderRadius: "8px",
                                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                            padding: "10px",
                                        }}
                                    >
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>General Practitioner</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Pediatrician</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Gynecologist</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Oncologist</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Endocrinologist</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Nephrologist</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Pulmonologist</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Ophthalmologist</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Gastroenterologist</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Urologist</a></li>

                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Cardiologist</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Dermatologist</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Neurologist</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Psychiatrist</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Radiologist</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Allergist</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Hematologist</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Infectious Disease Specialist</a></li>


                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Cardiac Surgeon</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Neurosurgeon</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Plastic Surgeon</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>General Surgeon</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Orthopedic Surgeon</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Ophthalmic Surgeon</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>ENT Surgeon</a></li>
                                        <li><a style={{ color: "#213555", fontSize: "14px" }}>Transplant Surgeon</a></li>
                                    </ul>
                                </details>
                            </li>


                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl hidden py-2 sm:block" style={{ color: "#F5EFE7" }}>
                        DocBridge
                    </a>
                </div>

                {/* Navbar Center - Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-4" style={{ color: "#F5EFE7" }}>
                        <li className="relative">
                            <details>
                                <summary style={{ color: "#F5EFE7", fontWeight: "bold", padding: "10px 15px", borderRadius: "5px" }}>
                                    Browse
                                </summary>
                                <div
                                    className="py-4 px-2 my-5 grid grid-cols-3 gap-8 absolute top-full left-0 z-10"
                                    style={{
                                        backgroundColor: "#D8C4B6",
                                        color: "#213555",
                                        width: "550px", // Increase width here
                                        borderRadius: "5px",
                                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                    }}
                                >
                                    {/* General Medicine Section */}
                                    <ul className="space-y-2">
                                        <li><strong>General Medicine</strong></li>
                                        <li><Link to={`/doctorbyspecialisation/General%20Practitioner`} style={{ color: "#213555" } } className="hover:bg-gray-200 p-2 rounded">General Practitioner</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Pediatrician`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Pediatrician</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Endocrinologist`}   style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Endocrinologist</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Nephrologist`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Nephrologist</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Pulmonologist`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Pulmonologist</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Gastroenterologist`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Gastroenterologist</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Oncologist`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Oncologist</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Rheumatologist`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Rheumatologist</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Infectious%20Disease%20Specialist`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Infectious Disease Specialist</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Allergist`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Allergist</Link></li>
                                    </ul>


                                    {/* Specialists Section */}
                                    <ul className="space-y-2">
                                        <li><strong>Specialists</strong></li>
                                        <li><Link to={`/doctorbyspecialisation/Cardiologist`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Cardiologist</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Dermatologist`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Dermatologist</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Neurologist`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Neurologist</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Psychiatrist`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Psychiatrist</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Radiologist`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Radiologist</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Hematologist`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Hematologist</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Infectious%20Disease%20Specialist`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Infectious Disease Specialist</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Ophthalmologist`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Ophthalmologist</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Orthopedist`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Orthopedist</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Pediatric%20Neurologist`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Pediatric Neurologist</Link></li>
                                    </ul>

                                    {/* Surgery Section */}
                                    <ul className="space-y-2">
                                        <li><strong>Surgery</strong></li>
                                        <li><Link to={`/doctorbyspecialisation/Orthopedic%20Surgeon`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Orthopedic Surgeon</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Plastic%20Surgeon`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Plastic Surgeon</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Cardiac%20Surgeon`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Cardiac Surgeon</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Neurosurgeon`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Neurosurgeon</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/General%20Surgeon`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">General Surgeon</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Ophthalmic%20Surgeon`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Ophthalmic Surgeon</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/ENT%20Surgeon`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">ENT Surgeon</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Transplant%20Surgeon`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Transplant Surgeon</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Urologic%20Surgeon`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Urologic Surgeon</Link></li>
                                        <li><Link to={`/doctorbyspecialisation/Vascular%20Surgeon`} style={{ color: "#213555" }} className="hover:bg-gray-200 p-2 rounded">Vascular Surgeon</Link></li>
                                    </ul>

                                </div>
                            </details>
                        </li>
                        {!user && ( // Conditionally render the Login button only if the user is not logged in
                            <li>
                                <details>
                                    <summary style={{ color: "#F5EFE7", fontWeight: "bold" }}>Login</summary>
                                    <ul className="p-2" style={{ backgroundColor: "#D8C4B6", color: "#213555" }}>
                                        <li><Link to="/doctorlogin" style={{ color: "#213555" }}>
                                            DOCTOR
                                        </Link></li>
                                        <li><Link to="/patientlogin" style={{ color: "#213555" }}>
                                            PATIENT
                                        </Link></li>
                                    </ul>
                                </details>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Navbar End - Buttons */}
                <div className="navbar-end flex gap-4">
                    {!user && (<Link
                        className="btn border-none"
                        style={{ backgroundColor: "#3E5879", color: "#F5EFE7" }}
                        to="/listpractice"
                    >
                        List your Practice
                    </Link>)}
                    {!user && (<Link
                        className="btn border-none"
                        style={{ backgroundColor: "#3E5879", color: "#F5EFE7" }}
                        to="/"
                    >
                        Signup
                    </Link>)}
                    {user && (
                        <div className="btn border-none" style={{ backgroundColor: "#3E5879", color: "#F5EFE7" }}>
                            Welcome, {user.patient?.username || user.doctor?.username}
                        </div>
                    )}
                    {user && (
                        <button
                            className="btn border-none"
                            style={{ backgroundColor: "#3E5879", color: "#F5EFE7" }}
                            onClick={handleClick}
                        >
                            Logout
                        </button>)}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
