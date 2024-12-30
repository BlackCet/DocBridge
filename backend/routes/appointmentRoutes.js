const express = require('express');
const {
    createAppointment
} = require('../controllers/appointmentController');

const router = express.Router();
const requireAuth = require('../middleware/requireAuth');

// Patient can create an appointment (requires JWT token)
router.post('/patients/appointments', requireAuth, createAppointment);


module.exports = router;
