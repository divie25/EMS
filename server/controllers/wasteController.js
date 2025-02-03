const Waste = require('../models/Waste');

// Create a new waste management entry
exports.createWasteEntry = async (req, res) => {
    try {
        const wasteData = new Waste(req.body);
        await wasteData.save();
        res.status(201).json(wasteData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all waste management entries
exports.getAllWasteEntries = async (req, res) => {
    try {
        const wasteEntries = await Waste.find();
        res.status(200).json(wasteEntries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a waste management entry
exports.updateWasteEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedWaste = await Waste.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedWaste) {
            return res.status(404).json({ message: 'Waste entry not found' });
        }
        res.status(200).json(updatedWaste);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a waste management entry
exports.deleteWasteEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedWaste = await Waste.findByIdAndDelete(id);
        if (!deletedWaste) {
            return res.status(404).json({ message: 'Waste entry not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};