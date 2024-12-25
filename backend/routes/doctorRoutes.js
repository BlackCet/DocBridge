const express = require('express');
const { signup, login, getProfile, updateProfile, getDoctors, approveDoctor, getDoctorsByspecialisation } = require('../controllers/doctorController');

const router = express.Router();

const requireAuth = require('../middleware/requireAuth');

// Doctor signup route
router.post('/signup', signup);

// Doctor login route
router.post('/login', login);

// Get doctor profile route
router.get('/:doctorId/profile', requireAuth, getProfile);

// Update doctor profile route
router.put('/:doctorId/profile', requireAuth, updateProfile);

// get the list of all doctors
router.get('/docs', getDoctors);

// approve the doctor
router.patch('/:doctorId/approve', approveDoctor);

// Get doctors by specialisation route
router.get('/specialisation/:specialisation', getDoctorsByspecialisation);

module.exports = router;
