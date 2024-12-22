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
                                    <summary style={{ color: "#213555" }}>Login</summary>
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
                                <details>
                                    <summary style={{ color: "#213555" }}>Browse</summary>
                                    <ul className="p-2">
                                        <li><a style={{ color: "#213555" }}>General Practitioner</a></li>
                                        <li><a style={{ color: "#213555" }}>Cardiologist</a></li>
                                        <li><a style={{ color: "#213555" }}>Dermatologist</a></li>
                                        <li><a style={{ color: "#213555" }}>Neurologist</a></li>
                                        <li><a style={{ color: "#213555" }}>Psychiatrist</a></li>
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
                        <li>
                            <details>
                                <summary style={{ color: "#F5EFE7" }}>Browse</summary>
                                <ul className="p-2" style={{ backgroundColor: "#D8C4B6", color: "#213555" }}>
                                    <li><a style={{ color: "#213555" }}>General Practitioner</a></li>
                                    <li><a style={{ color: "#213555" }}>Cardiologist</a></li>
                                    <li><a style={{ color: "#213555" }}>Dermatologist</a></li>
                                    <li><a style={{ color: "#213555" }}>Neurologist</a></li>
                                    <li><a style={{ color: "#213555" }}>Psychiatrist</a></li>
                                </ul>
                            </details>
                        </li>
                        {!user && ( // Conditionally render the Login button only if the user is not logged in
                            <li>
                                <details>
                                    <summary style={{ color: "#F5EFE7" }}>Login</summary>
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
