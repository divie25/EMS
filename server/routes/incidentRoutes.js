const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to report a new incident
// authMiddleware.authMiddleware --- old
router.post('/report', incidentController.reportIncident);

// Route to get all reported incidents
router.get('/', incidentController.getIncidents);

// Route to get a specific incident by ID
router.get('/:id', incidentController.updateIncident);

// Route to update the status of an incident
router.put('/:id/status', authMiddleware.authMiddleware, incidentController.updateIncident);

// Route to delete an incident
router.delete('/:id', authMiddleware.authMiddleware, incidentController.deleteIncident);

module.exports = router;