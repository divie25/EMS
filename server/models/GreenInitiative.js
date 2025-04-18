const mongoose = require("mongoose");

const greenInitiativeSchema = new mongoose.Schema({
  initiativeName: String,
  organization: String,
  type: { type: String, enum: ['Tree Planting', 'Recycling', 'Renewable Energy', 'Awareness Campaign', 'Other'] },
  description: String,
  impact: String, // e.g., "500 trees planted"
  images: [String], // Optional proof
  date: Date,
  location:String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("GreenInitiative", greenInitiativeSchema);
