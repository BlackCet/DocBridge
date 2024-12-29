const jwt = require('jsonwebtoken');
const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');

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

        // Determine if the route is for a patient or doctor based on the URL or other criteria
        let user;
        if (req.originalUrl.includes('/patients/')) {
            // If the route contains "/patients/", query the Patient collection
            user = await Patient.findById(decoded._id).select('_id');
        } else if (req.originalUrl.includes('/doctors/')) {
            // If the route contains "/doctors/", query the Doctor collection
            user = await Doctor.findById(decoded._id).select('_id');
        } else {
            // If neither route is found, throw an error
            throw new Error('Invalid user route');
        }

        // If the user is not found, throw an error
        if (!user) {
            throw new Error('User not found');
        }

        // Attach the user (Patient or Doctor) to the request object
        req.user = user;

        next(); // Continue to the next middleware or route handler
    } catch (error) {
        console.error('Error in requireAuth:', error.message); // Debugging log
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = requireAuth;
