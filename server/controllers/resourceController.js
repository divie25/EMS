const Resource = require('../models/Resource');

// Create a new resource
exports.createResource = async (req, res) => {
    try {
        const resource = new Resource(req.body);
        await resource.save();
        res.status(201).json(resource);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all resources
exports.getAllResources = async (req, res) => {
    try {
        const resources = await Resource.find();
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a resource by ID
exports.getResourceById = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a resource by ID
exports.updateResource = async (req, res) => {
    try {
        const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.status(200).json(resource);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a resource by ID
exports.deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findByIdAndDelete(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};