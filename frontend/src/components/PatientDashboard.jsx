import React from 'react';
import { Link } from 'react-router-dom';

function PatientDashboard() {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-10 px-4">
                <h1 className="text-4xl font-bold text-center text-navylight mb-8">Welcome to Your Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Appointments Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Appointments</h2>
                        <p className="text-gray-600 mb-6">
                            Schedule, reschedule, or cancel your appointments with ease.
                        </p>
                        <Link
                            to="/appointments"
                            className="bg-navylight text-white py-2 px-4 rounded hover:bg-navydark transition duration-200"
                        >
                            View Appointments
                        </Link>
                    </div>

                    {/* Medical History Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Medical History</h2>
                        <p className="text-gray-600 mb-6">
                            Review your past appointments and medical records.
                        </p>
                        <Link
                            to="/medical-history"
                            className="bg-navylight text-white py-2 px-4 rounded hover:bg-navydark transition duration-200"
                        >
                            View History
                        </Link>
                    </div>

                    {/* Profile Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Settings</h2>
                        <p className="text-gray-600 mb-6">
                            Update your personal information and preferences.
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
                            Stay updated with the latest health tips and appointment reminders.
                        </p>
                        <Link
                            to="/notifications"
                            className="bg-navylight text-white py-2 px-4 rounded hover:bg-navydark transition duration-200"
                        >
                            View Notifications
                        </Link>
                    </div>

                    {/* Payment Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment History</h2>
                        <p className="text-gray-600 mb-6">
                            Access your payment receipts and billing information.
                        </p>
                        <Link
                            to="/payments"
                            className="bg-navylight text-white py-2 px-4 rounded hover:bg-navydark transition duration-200"
                        >
                            View Payments
                        </Link>
                    </div>

                    {/* Health Tips Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Health Tips</h2>
                        <p className="text-gray-600 mb-6">
                            Explore articles and tips for maintaining a healthy lifestyle.
                        </p>
                        <Link
                            to="/health-tips"
                            className="bg-navylight text-white py-2 px-4 rounded hover:bg-navydark transition duration-200"
                        >
                            Read Tips
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientDashboard;
