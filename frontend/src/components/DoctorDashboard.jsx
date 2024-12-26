import React from 'react';
import { Link } from 'react-router-dom';

function DoctorDashboard() {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-10 px-4">
                <h1 className="text-4xl font-bold text-center text-navylight mb-8">Welcome to DOCTOR Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Appointments Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Appointments</h2>
                        <p className="text-gray-600 mb-6">
                            View, approve, or reschedule appointments with your patients.
                        </p>
                        <Link
                            to="/appointments"
                            className="bg-navylight text-white py-2 px-4 rounded hover:bg-navydark transition duration-200"
                        >
                            Manage Appointments
                        </Link>
                    </div>

                    {/* Patient Records Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Patient Records</h2>
                        <p className="text-gray-600 mb-6">
                            Access and update patient medical histories and treatment plans.
                        </p>
                        <Link
                            to="/patient-records"
                            className="bg-navylight text-white py-2 px-4 rounded hover:bg-navydark transition duration-200"
                        >
                            View Records
                        </Link>
                    </div>

                    {/* Profile Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Settings</h2>
                        <p className="text-gray-600 mb-6">
                            Update your professional profile and availability settings.
                        </p>
                        <Link
                            to="/profile"
                            className="bg-navylight text-white py-2 px-4 rounded hover:bg-navydark transition duration-200"
                        >
                            Update Profile
                        </Link>
                    </div>

                    {/* Notifications Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notifications</h2>
                        <p className="text-gray-600 mb-6">
                            Stay updated with important alerts and patient inquiries.
                        </p>
                        <Link
                            to="/notifications"
                            className="bg-navylight text-white py-2 px-4 rounded hover:bg-navydark transition duration-200"
                        >
                            View Notifications
                        </Link>
                    </div>

                    {/* Billing Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Billing and Payments</h2>
                        <p className="text-gray-600 mb-6">
                            Manage invoices and track payments from patients.
                        </p>
                        <Link
                            to="/billing"
                            className="bg-navylight text-white py-2 px-4 rounded hover:bg-navydark transition duration-200"
                        >
                            Manage Billing
                        </Link>
                    </div>

                    {/* Health Articles Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Health Articles</h2>
                        <p className="text-gray-600 mb-6">
                            Share insights and write articles to guide your patients.
                        </p>
                        <Link
                            to="/health-articles"
                            className="bg-navylight text-white py-2 px-4 rounded hover:bg-navydark transition duration-200"
                        >
                            Write Articles
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default DoctorDashboard;
