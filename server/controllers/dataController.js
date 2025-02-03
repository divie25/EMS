const EnvironmentalData = require('../models/EnvironmentalData');

// Function to collect environmental data
exports.collectData = async (req, res) => {
    try {
        const data = new EnvironmentalData(req.body);
        await data.save();
        res.status(201).json({ message: 'Data collected successfully', data });
    } catch (error) {
        res.status(400).json({ message: 'Error collecting data', error });
    }
};

// Function to retrieve environmental data
exports.getData = async (req, res) => {
    try {
        const data = await EnvironmentalData.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving data', error });
    }
};

// Function to get data by ID
exports.getDataById = async (req, res) => {
    try {
        const data = await EnvironmentalData.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving data', error });
    }
};

// Function to update environmental data
exports.updateData = async (req, res) => {
    try {
        const data = await EnvironmentalData.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json({ message: 'Data updated successfully', data });
    } catch (error) {
        res.status(400).json({ message: 'Error updating data', error });
    }
};

// Function to delete environmental data
exports.deleteData = async (req, res) => {
    try {
        const data = await EnvironmentalData.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting data', error });
    }
};