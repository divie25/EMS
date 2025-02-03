const mongoose = require('mongoose');

const wasteSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    collectionSchedule: {
        type: Date,
        required: true,
    },
    recyclingInformation: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'In Progress'],
        default: 'Pending',
    },
}, { timestamps: true });

module.exports = mongoose.model('Waste', wasteSchema);