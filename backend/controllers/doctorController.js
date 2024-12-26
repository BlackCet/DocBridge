const Doctor = require('../models/doctorModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // for hashing passwords

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
const updateDoctor = async (req, res) => {
    try {
        const { username, profilePicture, fullName, phone, email, password, specialisation, specialisationDetails, experience } = req.body;
        const doctorId = req.user._id;

        // Prepare updates object
        const updates = {};

        // Check and update fields only if they are provided
        if (username) updates.username = username;
        if (profilePicture) updates.profilePicture = profilePicture;
        if (fullName) updates.fullName = fullName;
        if (phone) updates.phone = phone;
        if (specialisation) updates.specialisation = specialisation;
        if (specialisationDetails) updates.specialisationDetails = specialisationDetails;
        if (experience) updates.experience = experience;

        // If email is being updated, check if it's already in use
        if (email) {
            const existingDoctor = await Doctor.findOne({ email });
            if (existingDoctor && existingDoctor._id.toString() !== doctorId.toString()) {
                return res.status(400).json({ error: "Email is already in use by another doctor" });
            }
            updates.email = email;
        }

        // If password is provided, hash it before updating
        if (password) {
            const salt = await bcrypt.genSalt(10); // generate a salt
            updates.password = await bcrypt.hash(password, salt); // hash the password
        }

        // Update the doctor document
        const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, updates, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validations run
        });

        // If no doctor is found, return an error
        if (!updatedDoctor) {
            return res.status(404).json({ error: "Doctor not found" });
        }

        // Return the updated doctor information
        res.status(200).json(updatedDoctor);
    } catch (error) {
        console.error("Error updating doctor profile:", error);
        res.status(500).json({ error: "Failed to update profile" });
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

// Get doctors by specialisation
const getDoctorsByspecialisation = async (req, res) => {
    const { specialisation } = req.params;
    //console.log("Received specialisation:", specialisation); // Add this log

    try {
        // Find doctors by specialisation
        const doctors = await Doctor.find({ specialisation: specialisation });
        if (doctors.length === 0) {
            return res.status(404).json({ error: 'No doctors found with this specialisation' });
        }
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching doctors by specialisation' });
    }
};


module.exports = { signup, login, getProfile, updateDoctor, getDoctors, approveDoctor, getDoctorsByspecialisation };
