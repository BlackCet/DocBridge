const Doctor = require('../models/doctorModel');
const jwt = require('jsonwebtoken');

// Create a token function
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Signup handler for doctor
const signup = async (req, res) => {
    const { email, password, username, fullName, phone, dateOfBirth, specialisation, specialisationDetails, experience } = req.body;

    try {
        const newDoctor = await Doctor.signup(email, password, username, fullName, phone, dateOfBirth, specialisation, specialisationDetails, experience);
        const token = createToken(newDoctor._id);
        res.status(201).json({ message: 'Doctor created successfully', doctor: newDoctor, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login handler for doctor
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const doctor = await Doctor.login(email, password);
        const token = createToken(doctor._id);
        res.status(200).json({ message: 'Login successful', doctor, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get doctor profile
const getProfile = async (req, res) => {
    const { doctorId } = req.params;

    try {
        const doctor = await Doctor.findById(doctorId).select('-password'); // Don't send password
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching profile' });
    }
};

// Update doctor profile
const updateProfile = async (req, res) => {
    const { doctorId } = req.params;
    const updateData = req.body;

    try {
        // Find and update the doctor profile
        const doctor = await Doctor.findByIdAndUpdate(doctorId, updateData, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation is applied
        }).select('-password'); // Exclude password from the response

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', doctor });
    } catch (error) {
        console.error('Error updating profile:', error.message);

        // Handle validation errors specifically
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Invalid update data', details: error.errors });
        }

        res.status(500).json({ error: 'Error updating profile' });
    }
};

// Get all doctors
getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching doctors' });
    }
}

//function to approve the doctor
const approveDoctor = async (req, res) => {
    const { doctorId } = req.params;
    try {
        const doctor = await Doctor.findByIdAndUpdate(doctorId, { isApproved: true }, {
            new: true,
            runValidators: true,
        }).select('-password');
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.status(200).json({ message: 'Doctor approved successfully', doctor });
    } catch (error) {
        console.error('Error approving doctor:', error.message);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Invalid update data', details: error.errors });
        }
        res.status(500).json({ error: 'Error approving doctor' });
    }
};

module.exports = { signup, login, getProfile, updateProfile, getDoctors, approveDoctor };
