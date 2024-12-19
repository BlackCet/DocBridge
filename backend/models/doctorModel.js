const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://example.com/default-doctor-profile.jpg",
    },
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
    }],
});

// Static signup method
doctorSchema.statics.signup = async function (email, password, name, specialization) {
    if (!email || !password || !name || !specialization) {
        throw new Error('All fields must be filled.');
    }

    if (!validator.isEmail(email)) {
        throw new Error('Invalid email');
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error('Password not strong enough');
    }

    const emailExists = await this.findOne({ email });

    if (emailExists) {
        throw new Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doctor = await this.create({ email, password: hash, name, specialization });

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
