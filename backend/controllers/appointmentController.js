// const mongoose = require('mongoose');
// const Appointment = require('../models/appointmentModel');
// const Doctor = require('../models/doctorModel');
// // const Patient = require('../models/patientModel'); // Assuming patient model exists

// // Create an appointment
// const createAppointment = async (req, res) => {
//     try {
//         const { doctorId, appointmentDate, appointmentTime, symptoms, patientId } = req.body;

//         console.log('Request Body:', req.body);

//         // Validate required fields
//         const missingFields = [];
//         if (!doctorId) missingFields.push('doctorId');
//         if (!appointmentDate) missingFields.push('appointmentDate');
//         if (!appointmentTime) missingFields.push('appointmentTime');
//         if (!symptoms) missingFields.push('symptoms');

//         if (missingFields.length > 0) {
//             return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
//         }

//         // Use patientId from the request body or fallback to req.user._id
//         const patient = patientId || req.user?._id;

//         if (!patient) {
//             return res.status(401).json({ error: 'Patient not authenticated' });
//         }

//         // Validate doctor existence
//         const doctor = await Doctor.findById(doctorId);
//         if (!doctor) {
//             return res.status(404).json({ error: 'Doctor not found' });
//         }

//         // Ensure appointment time is in the future
//         const today = new Date();
//         const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
//         if (appointmentDateTime <= today) {
//             return res.status(400).json({ error: 'Appointment time must be in the future' });
//         }

//         // Check if the appointment slot is already booked
//         const existingAppointment = await Appointment.findOne({
//             doctor: doctorId,
//             appointmentDate,
//             appointmentTime,
//         });
//         if (existingAppointment) {
//             return res.status(400).json({ error: 'Appointment slot is already booked' });
//         }

//         // Create a new appointment
//         const appointment = new Appointment({
//             patient,
//             doctor: doctorId,
//             appointmentDate,
//             appointmentTime,
//             symptoms,
//             status: 'Pending', // Default status
//         });

//         await appointment.save();
//         res.status(201).json(appointment);
//     } catch (error) {
//         console.error('Error creating appointment:', error);
//         res.status(500).json({ error: 'Failed to create appointment' });
//     }
// };

// // Get appointments by doctor
// const getAppointmentsByDoctor = async (req, res) => {
//     try {
//         const { doctorId } = req.params;
//         // console.log(doctorId);
//         if (!mongoose.Types.ObjectId.isValid(doctorId)) {
//             return res.status(400).json({ error: 'Invalid doctor ID' });
//         }

//         const appointments = await Appointment.find({ doctor: doctorId })
//             .populate('patient', 'fullName') // Populate patient details
//             .populate('doctor', 'fullName specialization'); // Populate doctor details

//         if (!appointments.length) {
//             return res.status(404).json({ error: 'No appointments found for this doctor' });
//         }

//         res.status(200).json(appointments);
//     } catch (error) {
//         console.error('Error fetching appointments:', error);
//         res.status(500).json({ error: 'Failed to fetch appointments' });
//     }
// };

// // Update appointment status
// const updateAppointmentStatus = async (req, res) => {
//     try {
//         const { appointmentId } = req.params;
//         const { status } = req.body;

//         console.log('Appointment ID:', appointmentId);
//         console.log('Status:', status);

//         // Validate appointment ID
//         if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
//             return res.status(400).json({ error: 'Invalid appointment ID' });
//         }

//         // Validate status
//         if (!status || !['Approved', 'Rejected'].includes(status)) {
//             return res.status(400).json({
//                 error: 'Invalid status. It should be "Approved" or "Rejected".',
//             });
//         }

//         // Find and update the appointment
//         const appointment = await Appointment.findByIdAndUpdate(
//             appointmentId,
//             { status },
//             { new: true }
//         );

//         if (!appointment) {
//             return res.status(404).json({ error: 'Appointment not found' });
//         }

//         console.log('Updated Appointment:', appointment);
//         res.status(200).json(appointment);
//     } catch (error) {
//         console.error('Error updating appointment status:', error);
//         res.status(500).json({ error: 'Failed to update appointment status' });
//     }
// };

// // Export the controllers
// module.exports = {
//     createAppointment,
//     getAppointmentsByDoctor,
//     updateAppointmentStatus,
// };





const mongoose = require('mongoose');
const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');
// const Patient = require('../models/patientModel'); // Uncomment if patient model exists

// Create an appointment
const createAppointment = async (req, res) => {
    try {
        const { doctorId, appointmentDate, appointmentTime, symptoms, patientId } = req.body;

        // Validate required fields
        const missingFields = [];
        if (!doctorId) missingFields.push('doctorId');
        if (!appointmentDate) missingFields.push('appointmentDate');
        if (!appointmentTime) missingFields.push('appointmentTime');
        if (!symptoms) missingFields.push('symptoms');

        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
        }

        // Use patientId from the request body or fallback to req.user._id
        const patient = patientId || req.user?._id;
        if (!patient) {
            return res.status(401).json({ error: 'Patient not authenticated' });
        }

        // Validate doctor existence
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // Ensure appointment time is in the future
        const today = new Date();
        const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
        if (appointmentDateTime <= today) {
            return res.status(400).json({ error: 'Appointment time must be in the future' });
        }

        // Check if the appointment slot is already booked
        const existingAppointment = await Appointment.findOne({
            doctor: doctorId,
            appointmentDate,
            appointmentTime,
        });
        if (existingAppointment) {
            return res.status(400).json({ error: 'Appointment slot is already booked' });
        }

        // Create a new appointment
        const appointment = new Appointment({
            patient,
            doctor: doctorId,
            appointmentDate,
            appointmentTime,
            symptoms,
            status: 'Pending', // Default status
        });

        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ error: 'Failed to create appointment' });
    }
};

// Get appointments by doctor
const getAppointmentsByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;

        // Validate doctor ID
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ error: 'Invalid doctor ID' });
        }

        const appointments = await Appointment.find({ doctor: doctorId })
            .populate('patient', 'fullName') // Populate patient details
            .populate('doctor', 'fullName specialization'); // Populate doctor details

        if (!appointments.length) {
            return res.status(404).json({ error: 'No appointments found for this doctor' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments by doctor:', error);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
};

// Get appointments by patient
const getAppointmentsByPatient = async (req, res) => {
    try {
        const { patientId } = req.params;

        // Validate patient ID
        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({ error: 'Invalid patient ID' });
        }

        const appointments = await Appointment.find({ patient: patientId })
            .populate('doctor', 'fullName specialization') // Populate doctor details
            .populate('patient', 'fullName'); // Populate patient details

        if (!appointments.length) {
            return res.status(404).json({ error: 'No appointments found for this patient' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments by patient:', error);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { status } = req.body;

        // Validate appointment ID
        if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
            return res.status(400).json({ error: 'Invalid appointment ID' });
        }

        // Validate status
        if (!status || !['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({
                error: 'Invalid status. It should be "Approved" or "Rejected".',
            });
        }

        // Find and update the appointment
        const appointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.status(200).json(appointment);
    } catch (error) {
        console.error('Error updating appointment status:', error);
        res.status(500).json({ error: 'Failed to update appointment status' });
    }
};

// Export the controllers
module.exports = {
    createAppointment,
    getAppointmentsByDoctor,
    getAppointmentsByPatient,
    updateAppointmentStatus,
};
