const express = require('express');
const { signup, login, getProfile, updateProfile } = require('../controllers/patientController');

const router = express.Router();

// Patient signup route
router.post('/signup', signup);

// Patient login route
router.post('/login', login);

// Get patient profile route
router.get('/:patientId/profile', getProfile);

// Update patient profile route
router.put('/:patientId/profile', updateProfile);

module.exports = router;
