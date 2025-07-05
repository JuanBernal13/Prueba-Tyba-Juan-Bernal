const express = require('express');
const LocationController = require('../controllers/locationController');
const { authenticateSession } = require('../middlewares/auth');
const { trackingMiddleware } = require('../middlewares/tracking');
const { validateOptionalLocationParams } = require('../middlewares/restaurant');

const router = express.Router();
const locationController = new LocationController();

router.use(trackingMiddleware);

// Buscar restaurantes cercanos a coordenadas
router.post('/restaurants', authenticateSession, validateOptionalLocationParams, async (req, res) => {
  await locationController.buscarRestaurantes(req, res);
});

module.exports = router; 