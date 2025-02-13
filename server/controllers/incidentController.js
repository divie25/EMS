const Incident = require('../models/Incident');

// Report a new incident
exports.reportIncident = async (req, res) => {
    try {
        const { title, description, location, status,reportedBy } = req.body;
        console.log(req.body);
        
        const newIncident = new Incident({ title, description, location, status,reportedBy });
        await newIncident.save();
        res.status(201).json({ message: 'Incident reported successfully', incident: newIncident });
    } catch (error) {
        res.status(500).json({ message: 'Error reporting incident', error: error.message });
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
        const { status } = req.body;
        const updatedIncident = await Incident.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedIncident) {
            return res.status(404).json({ message: 'Incident not found' });
        }
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