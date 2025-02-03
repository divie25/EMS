const express = require('express');
const router = express.Router();
const wasteController = require('../controllers/wasteController');

// Route to get all waste management activities
router.get('/', wasteController.getAllWasteEntries);

// Route to create a new waste management activity
router.post('/', wasteController.createWasteEntry);

// Route to get a specific waste management activity by ID
// router.get('/:id', wasteController.);

// Route to update a specific waste management activity by ID
router.put('/:id', wasteController.updateWasteEntry);

// Route to delete a specific waste management activity by ID
router.delete('/:id', wasteController.deleteWasteEntry);

module.exports = router;