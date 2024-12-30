const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');

const createAppointment = async (req, res) => {
    try {
        const { doctorId, appointmentDate, appointmentTime, symptoms, patientId } = req.body;

        // Log the incoming request body to see the actual data being posted
        console.log('Request Body:', req.body);

        // Validate the required fields and specify which ones are missing
        const missingFields = [];
        if (!doctorId) missingFields.push('doctorId');
        if (!appointmentDate) missingFields.push('appointmentDate');
        if (!appointmentTime) missingFields.push('appointmentTime');
        if (!symptoms) missingFields.push('symptoms');

        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
        }

        // Use the patientId from the request body or fallback to req.user._id if not provided
        const patient = patientId || req.user._id; // Check if patientId exists in the body, otherwise use the JWT patientId

        if (!patient) {
            return res.status(401).json({ error: 'Patient not authenticated' });
        }

        // Check if the doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // Check if the appointment time is in the future
        const today = new Date();
        const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
        
        if (appointmentDateTime <= today) {
            return res.status(400).json({ error: 'Appointment time must be in the future' });
        }

        // Check if the appointment slot is already taken
        const existingAppointment = await Appointment.findOne({
            doctor: doctorId,
            appointmentDate,
            appointmentTime
        });
        if (existingAppointment) {
            return res.status(400).json({ error: 'Appointment slot is already booked' });
        }

        // Create a new appointment with the patient's ID (patientId) from the request body or JWT
        const appointment = new Appointment({
            patient: patient, // Use patientId from the body or JWT
            doctor: doctorId,
            appointmentDate,
            appointmentTime,
            symptoms,
            status: 'Pending' // Default status to "Pending"
        });

        await appointment.save();

        // Respond with the created appointment details
        res.status(201).json(appointment);
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ error: 'Failed to create appointment' });
    }
};



module.exports = {
    createAppointment,
};
