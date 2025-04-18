const mongoose = require("mongoose");

const pollutionComplianceSchema = new mongoose.Schema({
  entityName: String,
  industryType: String,
  location: String,
  complianceStatus: { type: String, enum: ['Compliant', 'Non-compliant'], default: 'Non-compliant' },
  lastInspectionDate: Date,
  nextInspectionDate: Date,
  documents: [String], // URLs of uploaded docs
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PollutionCompliance", pollutionComplianceSchema);
