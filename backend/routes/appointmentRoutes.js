const express = require('express');
const {
    createAppointment,
    getAppointmentsByDoctor,
    updateAppointmentStatus
} = require('../controllers/appointmentController');

const router = express.Router();
const requireAuth = require('../middleware/requireAuth');

// Patient can create an appointment (requires JWT token)
router.post('/patients/appointments', requireAuth, createAppointment);

// Fetch appointments for a specific doctor
router.get('/doctor/:doctorId', requireAuth, getAppointmentsByDoctor);

// Update appointment status (approve or reject)
router.patch('/:appointmentId/status', updateAppointmentStatus);

module.exports = router;
