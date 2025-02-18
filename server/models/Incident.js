const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: false
    },
    longitude: {
        type: Number,
        required: false
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String, // Stores image file path
        required: false
    },
    status: {
        type: String,
        enum: ['Reported', 'In Progress', 'Resolved', 'Closed'],
        default: 'Reported'
    }
}, { timestamps: true }); // Auto-manages createdAt & updatedAt

module.exports = mongoose.model('Incident', incidentSchema);
