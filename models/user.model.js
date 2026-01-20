const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [ 3, 'Username must be at least 3 characters long'],
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [ 3, 'Email must be at least 3 characters long'],
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: [ 5, 'Password must be at least 5 characters long']
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;