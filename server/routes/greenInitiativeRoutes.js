const express = require('express');
const router = express.Router();
const greenInitiativeController = require('../controllers/greenInitiativeController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to create a new green initiative
router.post('/', authMiddleware.authMiddleware, greenInitiativeController.createGreenInitiative);

// Route to get all green initiatives
router.get('/', greenInitiativeController.getGreenInitiatives);

// Route to get a specific green initiative by ID
router.get('/:id', greenInitiativeController.getGreenInitiativeById);

// Route to update a green initiative by ID
router.put('/:id', authMiddleware.authMiddleware, greenInitiativeController.updateGreenInitiative);

// Route to delete a green initiative by ID
router.delete('/:id', authMiddleware.authMiddleware, greenInitiativeController.deleteGreenInitiative);

module.exports = router;