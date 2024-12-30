const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    symptoms: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled']
    }
}, { timestamps: true });

// Add a unique index to ensure no two appointments are booked at the same time for the same doctor
appointmentSchema.index({ doctor: 1, appointmentDate: 1, appointmentTime: 1 }, { unique: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
