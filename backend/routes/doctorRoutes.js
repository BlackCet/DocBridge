const express = require('express');
const { signup, login, getProfile, updateProfile } = require('../controllers/doctorController');

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

module.exports = router;
