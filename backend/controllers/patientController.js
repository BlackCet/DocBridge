const Patient = require('../models/patientModel');
const jwt = require('jsonwebtoken');

// Create a token function
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Signup handler for patient
const signup = async (req, res) => {
    const { email, password, username, fullName, phone, gender, dateOfBirth } = req.body;

    try {
        const newPatient = await Patient.signup(email, password, username, fullName, phone, gender, dateOfBirth);
        const token = createToken(newPatient._id);
        res.status(201).json({ message: 'Patient created successfully', patient: newPatient, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Login handler for patient
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const patient = await Patient.login(email, password);
        const token = createToken(patient._id);
        res.status(200).json({ message: 'Login successful', patient, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get patient profile
const getProfile = async (req, res) => {
    const { patientId } = req.params;

    try {
        const patient = await Patient.findById(patientId).select('-password'); // Don't send password
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching profile' });
    }
};



// Update patient profile
const updateProfile = async (req, res) => {
    const { patientId } = req.params;
    const updateData = req.body;

    try {
        // Find and update the patient profile
        const patient = await Patient.findByIdAndUpdate(patientId, updateData, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation is applied
        }).select('-password'); // Exclude password from the response

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', patient });
    } catch (error) {
        console.error('Error updating profile:', error.message);

        // Handle validation errors specifically
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Invalid update data', details: error.errors });
        }

        res.status(500).json({ error: 'Error updating profile' });
    }
};


module.exports = { signup, login, getProfile, updateProfile };
