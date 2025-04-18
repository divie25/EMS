const PollutionCompliance = require("../models/pollutionControllModel");

exports.addCompliance = async (req, res) => {
    try {
      const filePaths = req.files ? req.files.map(file => file.path) : [];
  
      const newRecord = new PollutionCompliance({
        ...req.body,
        documents: filePaths
      });
  
      await newRecord.save();
      res.status(201).json(newRecord);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

exports.getAllCompliances = async (req, res) => {
  const records = await PollutionCompliance.find();
  res.json(records);
};

// Update compliance status, inspection date, etc.
exports.updateCompliance = async (req, res) => {
  const { id } = req.params;
  const updated = await PollutionCompliance.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};
