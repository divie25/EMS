const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// Route to collect environmental data
router.post('/data', dataController.collectData);

// Route to retrieve environmental data
router.get('/data', dataController.getData);

// Route to retrieve specific environmental data by ID
router.get('/data/:id', dataController.getDataById);

// Route to update environmental data
router.put('/data/:id', dataController.updateData);

// Route to delete environmental data
router.delete('/data/:id', dataController.deleteData);

module.exports = router;