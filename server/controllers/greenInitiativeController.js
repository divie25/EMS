const GreenInitiative = require('../models/GreenInitiative');

// Create a new green initiative
exports.createGreenInitiative = async (req, res) => {
    try {
        const initiative = new GreenInitiative(req.body);
        await initiative.save();
        res.status(201).json(initiative);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all green initiatives
exports.getGreenInitiatives = async (req, res) => {
    try {
        const initiatives = await GreenInitiative.find();
        res.status(200).json(initiatives);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific green initiative by ID
exports.getGreenInitiativeById = async (req, res) => {
    try {
        const initiative = await GreenInitiative.findById(req.params.id);
        if (!initiative) return res.status(404).json({ message: 'Initiative not found' });
        res.status(200).json(initiative);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a green initiative
exports.updateGreenInitiative = async (req, res) => {
    try {
        const initiative = await GreenInitiative.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!initiative) return res.status(404).json({ message: 'Initiative not found' });
        res.status(200).json(initiative);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a green initiative
exports.deleteGreenInitiative = async (req, res) => {
    try {
        const initiative = await GreenInitiative.findByIdAndDelete(req.params.id);
        if (!initiative) return res.status(404).json({ message: 'Initiative not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};