const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
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
    dateOfBirth: {
        type: Date,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    specialisation: {
        type: String,
        required: true
    },
    specialisationDetails: {
        type: String,
        required: true
    },
    usertype: {
        type: String,
        default: "doctor"
    },
    experience: {
        type: Number,
        required: true
    }
});

// Static method for signing up a doctor
doctorSchema.statics.signup = async function (email, password, username, fullName, phone, dateOfBirth, specialisation, specialisationDetails, experience) {
    // Validation
    if (!email || !password || !username || !fullName || !phone || !dateOfBirth || !specialisation || !specialisationDetails ||  !experience) {
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

    const doctor = await this.create({ email, password: hash, username, fullName, phone, dateOfBirth, specialisation, specialisationDetails, experience });

    return doctor;
};

// Static login method
doctorSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw new Error('All fields must be filled');
    }

    const doctor = await this.findOne({ email });
    if (!doctor) {
        throw new Error('Incorrect email');
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
        throw new Error('Incorrect password');
    }

    return doctor;
};

module.exports = mongoose.model('Doctor', doctorSchema);
