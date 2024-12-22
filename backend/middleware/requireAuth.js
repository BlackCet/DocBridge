const jwt = require('jsonwebtoken');
const Patient = require('../models/patientModel');

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    try {
        // Extract and verify the token
        const token = authorization.split(' ')[1]; // Extract the token part
        const decoded = jwt.verify(token, process.env.SECRET); // Verify the token

        console.log('Decoded JWT:', decoded); // Debugging log
        req.patient = await Patient.findById(decoded._id).select('_id'); // Attach patient to request

        if (!req.patient) {
            throw new Error('Patient not found');
        }

        next(); // Continue to the next middleware or route handler
    } catch (error) {
        console.error('Error in requireAuth:', error.message); // Debugging log
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = requireAuth;
