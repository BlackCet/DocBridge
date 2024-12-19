const Patient = require('../models/patientModel');

// Signup handler for patient
const signup = async (req, res) => {
    const { email, password, username, fullName, phone, gender, dateOfBirth } = req.body;

    try {
        const newPatient = await Patient.signup(email, password, username, fullName, phone, gender, dateOfBirth);
        res.status(201).json({ message: 'Patient created successfully', patient: newPatient });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login handler for patient
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const patient = await Patient.login(email, password);
        res.status(200).json({ message: 'Login successful', patient });
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
        const patient = await Patient.findByIdAndUpdate(patientId, updateData, { new: true });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(200).json({ message: 'Profile updated', patient });
    } catch (error) {
        res.status(500).json({ error: 'Error updating profile' });
    }
};

module.exports = { signup, login, getProfile, updateProfile };
