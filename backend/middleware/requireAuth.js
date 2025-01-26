// const jwt = require('jsonwebtoken');
// const Patient = require('../models/patientModel');
// const Doctor = require('../models/doctorModel');

// const requireAuth = async (req, res, next) => {
//     const { authorization } = req.headers;

//     if (!authorization) {
//         return res.status(401).json({ error: 'Authorization token required' });
//     }

//     try {
//         // Extract and verify the token
//         const token = authorization.split(' ')[1];

//         if (!token) {
//             return res.status(401).json({ error: 'Authorization token format is incorrect' });
//         }

//         const decoded = jwt.verify(token, process.env.SECRET);

//         console.log('Decoded JWT:', decoded); // Debugging log

//         let user;

//         // Check if the user is a patient or doctor
//         if (req.originalUrl.includes('/patients/')) {
//             user = await Patient.findById(decoded._id).select('_id');
//         } else if (req.originalUrl.includes('/doctors/')) {
//             user = await Doctor.findById(decoded._id).select('_id');
//         } else {
//             throw new Error('Invalid user route');
//         }

//         if (!user) {
//             return res.status(401).json({ error: 'User not found' });
//         }

//         req.user = user; // Attach the user to the request object

//         next(); // Proceed to the next middleware or route handler
//     } catch (error) {
//         console.error('Error in requireAuth:', error.message);
//         if (error.name === 'JsonWebTokenError') {
//             return res.status(401).json({ error: 'Invalid token' });
//         } else if (error.name === 'TokenExpiredError') {
//             return res.status(401).json({ error: 'Token has expired' });
//         }
//         res.status(401).json({ error: 'Request is not authorized' });
//     }
// };

// module.exports = requireAuth;



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
        const token = authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authorization token format is incorrect' });
        }

        const decoded = jwt.verify(token, process.env.SECRET);
        console.log('Decoded JWT:', decoded); // Debugging log

        let user;
        // Check if the route is for patients or doctors
        if (req.params.patientId) {
            user = await Patient.findById(decoded._id).select('_id');
        } else if (req.params.doctorId) {
            user = await Doctor.findById(decoded._id).select('_id');
        } else {
            return res.status(400).json({ error: 'Invalid route' });
        }

        if (!user) {
            console.log(`User not found: ${decoded._id}`);
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = user; // Attach the user to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error in requireAuth:', error.message);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired' });
        }
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = requireAuth;
