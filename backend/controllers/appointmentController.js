// const mongoose = require('mongoose');

const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel'); // assuming patient model exists

const createAppointment = async (req, res) => {
    try {
        const { doctorId, appointmentDate, appointmentTime, symptoms, patientId } = req.body;

        console.log('Request Body:', req.body);

        const missingFields = [];
        if (!doctorId) missingFields.push('doctorId');
        if (!appointmentDate) missingFields.push('appointmentDate');
        if (!appointmentTime) missingFields.push('appointmentTime');
        if (!symptoms) missingFields.push('symptoms');

        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
        }

        const patient = patientId || req.user._id; // patientId from the body or JWT

        if (!patient) {
            return res.status(401).json({ error: 'Patient not authenticated' });
        }

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        const today = new Date();
        const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}`);

        if (appointmentDateTime <= today) {
            return res.status(400).json({ error: 'Appointment time must be in the future' });
        }

        const existingAppointment = await Appointment.findOne({
            doctor: doctorId,
            appointmentDate,
            appointmentTime
        });

        if (existingAppointment) {
            return res.status(400).json({ error: 'Appointment slot is already booked' });
        }

        const appointment = new Appointment({
            patient: patient,
            doctor: doctorId,
            appointmentDate,
            appointmentTime,
            symptoms,
            status: 'Pending' // Default status
        });

        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ error: 'Failed to create appointment' });
    }
};

// Controller to fetch appointments by doctor
const getAppointmentsByDoctor = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        console.log(doctorId)
        // Fetch appointments for the specific doctor
        const appointments = await Appointment.find({ doctor: doctorId })
            .populate('patient', 'fullName') // Populate patient details
            .populate('doctor', 'fullName specialization'); // Populate doctor details
        
        console.log('Appointments:', appointments);
        if (!appointments.length) {
            return res.status(404).json({ error: 'No appointments found for this doctor' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
};

// Controller to update appointment status (approve or reject)
// const updateAppointmentStatus = async (req, res) => {
//     try {
//         const {appointmentId} = req.params;
//         console.log('Appointment ID:', req.params);
//         const { status } = req.body;

//         if (!status || !['Approved', 'Rejected'].includes(status)) {
//             return res.status(400).json({ error: 'Invalid status. It should be "Approved" or "Rejected".' });
//         }

//         // Find and update the appointment status
//         const appointment = await Appointment.findByIdAndUpdate(
//             appointmentId,
//             { status },
//             { new: true }
//         );

//         if (!appointment) {
//             return res.status(404).json({ error: 'Appointment not found' });
//         }

//         res.status(200).json(appointment);
//     } catch (error) {
//         console.error('Error updating appointment status:', error);
//         res.status(500).json({ error: 'Failed to update appointment status' });
//     }
// };

const updateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { status } = req.body;

        console.log('Appointment ID:', appointmentId); // Log incoming appointment ID
        console.log('Status:', status); // Log incoming status

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

        // Find and update appointment
        const appointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        console.log('Updated Appointment:', appointment); // Log updated appointment
        res.status(200).json(appointment);
    } catch (error) {
        console.error('Error updating appointment status:', error);
        res.status(500).json({ error: 'Failed to update appointment status' });
    }
};


module.exports = {
    createAppointment,
    getAppointmentsByDoctor,
    updateAppointmentStatus,
};
