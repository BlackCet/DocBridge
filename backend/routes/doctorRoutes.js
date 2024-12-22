const express = require('express');
const Doctor = require('../models/doctorModel');
const jwt = require('jsonwebtoken');

const router = express.Router();

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });

// Doctor signup
router.post('/signup', async (req, res) => {
    const { email, password, name, specialization } = req.body;

    try {
        const doctor = await Doctor.signup(email, password, name, specialization);
        const token = createToken(doctor._id);
        res.status(201).json({ doctor: doctor.name, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Doctor login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const doctor = await Doctor.login(email, password);
        const token = createToken(doctor._id);
        res.status(200).json({ doctor: doctor.name, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
