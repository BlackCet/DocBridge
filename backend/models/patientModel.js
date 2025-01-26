const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: "https://example.com/default-profile-picture.jpg" // Placeholder URL
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    medicalHistory: {
        type: [String],
        default: []
    },
    usertype: {
        type: String,
        default: "patient"
    },
    appointments: [{
        type: Schema.Types.ObjectId,
        ref: 'Appointment'
    }]
});

// Static method for signing up a patient
patientSchema.statics.signup = async function (email, password, username, fullName, phone, gender, dateOfBirth) {
    // Validation
    if (!email || !password || !username || !fullName || !phone || !gender || !dateOfBirth) {
        throw new Error('All fields must be filled');
    }

    if (!validator.isEmail(email)) {
        throw new Error('Invalid email format');
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error('Password not strong enough');
    }

    const emailExists = await this.findOne({ email });
    const usernameExists = await this.findOne({ username });

    if (emailExists) {
        throw new Error('Email already in use');
    }

    if (usernameExists) {
        throw new Error('Username already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const patient = await this.create({ email, password: hash, username, fullName, phone, gender, dateOfBirth });

    return patient;
};

// Static login method
patientSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw new Error('All fields must be filled');
    }

    const patient = await this.findOne({ email });
    if (!patient) {
        throw new Error('Incorrect email');
    }

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
        throw new Error('Incorrect password');
    }

    return patient;
};

module.exports = mongoose.model('Patient', patientSchema);
