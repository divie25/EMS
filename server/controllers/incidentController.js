const Incident = require('../models/Incident');
const User = require('../models/User');
const { sendincidentReportEmail } = require('../utils/email');

function generateuique() {
    return Math.floor(1000 + Math.random() * 9000); // Ensures a 4-digit number
  }
  

// Report a new incident
exports.reportIncident = async (req, res) => {
    try {
        const { title, description, location, severity, reportedBy } = req.body;
        const imagePath = req.file ? req.file.path : null;

        const newIncident = new Incident({
            title: title+generateuique(),
            description,
            location,
            severity,
            image: imagePath,
            reportedBy
        });

        await newIncident.save();
        res.status(201).json({ message: "Incident reported successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all reported incidents
exports.getIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find();
        res.status(200).json(incidents);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving incidents', error: error.message });
    }
};

// Update incident status
exports.updateIncident = async (req, res) => {
    try {
        const { id } = req.params;
        const { status , role,frommail } = req.body;
        console.log(role?role:"no");
        
        const updatedIncident = await Incident.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedIncident) {
            return res.status(404).json({ message: 'Incident not found' });
        }

        // Send email notification to user
       const reporterID= updatedIncident.reportedBy

        const reporter = await User.findById(reporterID)


        
         await sendincidentReportEmail(reporter.email,updatedIncident.title,updatedIncident.description,updatedIncident.location,status,role,frommail);

        const Totaluser = await User.find();
        Totaluser.map(async(user)=>{
            if (  user.role==="environmental_officer"||user.role==="admin") {
                     await sendincidentReportEmail(user.email,updatedIncident.title,updatedIncident.description,updatedIncident.location,status,role,frommail);
            }
        })

        res.status(200).json({ message: 'Incident updated successfully', incident: updatedIncident });

    } catch (error) {
        res.status(500).json({ message: 'Error updating incident', error: error.message });
    }
};

// Delete an incident
exports.deleteIncident = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedIncident = await Incident.findByIdAndDelete(id);
        if (!deletedIncident) {
            return res.status(404).json({ message: 'Incident not found' });
        }
        res.status(200).json({ message: 'Incident deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting incident', error: error.message });
    }
};

