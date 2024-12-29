const express = require('express');
const { signup, login, getProfile, getDoctors, getDocAppointment, updateDoctor, approveDoctor, getDoctorsByspecialisation } = require('../controllers/doctorController');

const router = express.Router();

const requireAuth = require('../middleware/requireAuth');

// Doctor signup route
router.post('/signup', signup);

// Doctor login route
router.post('/login', login);

// Get doctor profile route
router.get('/profile/:doctorId', requireAuth, getProfile); 

//Get doctor profile for appointment booking
router.get('/appointmentprofile/:doctorId', getDocAppointment);  //unauthorised

// Update doctor profile route
router.patch('/profile/:doctorId', requireAuth, updateDoctor);

// get the list of all doctors
router.get('/docs', getDoctors);

// approve the doctor
router.patch('/:doctorId/approve', approveDoctor);

// Get doctors by specialisation route
router.get('/specialisation/:specialisation', getDoctorsByspecialisation);

module.exports = router;
