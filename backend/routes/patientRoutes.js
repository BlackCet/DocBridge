const express = require('express');
const { signup, login, getProfile, updateProfile } = require('../controllers/patientController');

const router = express.Router();

const requireAuth = require('../middleware/requireAuth');

// Patient signup route
router.post('/signup', signup);

// Patient login route
router.post('/login', login);

// Get patient profile route
router.get('/:patientId/profile', requireAuth, getProfile);

// Update patient profile route
router.put('/:patientId/profile', requireAuth, updateProfile);

module.exports = router;
