const mongoose = require('mongoose');

const greenInitiativeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    participants: {
        type: Number,
        default: 0
    },
    impactMetrics: {
        treesPlanted: {
            type: Number,
            default: 0
        },
        wasteCollected: {
            type: Number,
            default: 0
        },
        communityEngagement: {
            type: Number,
            default: 0
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('GreenInitiative', greenInitiativeSchema);