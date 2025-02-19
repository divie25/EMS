const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    role: {
        type: String,
        enum: ['admin', 'environmental_officer', 'public'],
        default: 'public'
    },
    profile: {
        firstName: {
            type: String,
            // required: true
        },
        lastName: {
            type: String,
            // required: true
        },
        phone: {
            type: String
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);