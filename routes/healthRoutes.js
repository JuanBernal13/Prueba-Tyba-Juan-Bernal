const express = require('express');
const HealthController = require('../controllers/healthController');

const router = express.Router();
const healthController = new HealthController();

// Health check endpoint
router.get('/health', async (req, res) => {
  await healthController.checkHealth(req, res);
});

module.exports = router; 