const PollutionCompliance = require("../models/pollutionControllModel");
const User = require("../models/User");
const { sendPollutionComplianceEmail } = require("../utils/pollutionemail");

exports.addCompliance = async (req, res) => {
    try {
      console.log(req.body);
      
      const filePaths = req.files ? req.files.map(file => file.path) : [];
  
      const newRecord = new PollutionCompliance({
        ...req.body,
        documents: filePaths
      });
  
      await newRecord.save();

const users= await User.find();

users.map (async (user) => {
  if (user.role === "admin"|| user.role === "environmental_officer") {

    await  sendPollutionComplianceEmail(newRecord,user.email)        
    
  }

})

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
