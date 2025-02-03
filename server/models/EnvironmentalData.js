const mongoose = require('mongoose');

const environmentalDataSchema = new mongoose.Schema({
    airQuality: {
        type: Number,
        required: true,
    },
    waterQuality: {
        type: Number,
        required: true,
    },
    noisePollution: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    location: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('EnvironmentalData', environmentalDataSchema);