const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['Park', 'Forest', 'Water Body'], required: true },
    location: { type: String, required: true },
    maintenanceStatus: { type: String, enum: ['Good', 'Average', 'Poor'], default: 'Good' },
    biodiversityInfo: { type: String },
    reportHistory: [{ 
        date: { type: Date, default: Date.now },
        status: String,
        notes: String 
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, { timestamps: true });

module.exports = mongoose.model('Resource', ResourceSchema);
