const express = require('express');
const UserController = require('../controllers/userController');
const TrackingController = require('../controllers/trackingController');
const { authenticateSession } = require('../middlewares/auth');
const { trackingMiddleware } = require('../middlewares/tracking');

const router = express.Router();
const userController = new UserController();
const trackingController = new TrackingController();

//Implementacion del tracking para todas las rutas
router.use(trackingMiddleware);

// Rutas sin autenticacion requerida
router.post('/register', async (req, res) => {
  await userController.register(req, res);
});

router.post('/login', async (req, res) => {
  await userController.login(req, res);
});

// Ruta de logout
router.post('/logout',authenticateSession, async (req, res) => {
  await userController.logout(req, res);
});

// Ingreso a perfil del usuario que se encuentra logeado
router.get('/profile', authenticateSession, async (req, res) => {
  res.json({
    success: true,
    message: `Perfil del usuario logeado de email ${req.user.email}`,
    user: req.user
  });
});
// Obtener historial de actividad del usuario autenticado
router.get('/historial', authenticateSession, async (req, res) => {
  await trackingController.getHistory(req, res);
});

// Obtener todos los tracking
router.get('/historialApp', authenticateSession, async (req, res) => {
  await trackingController.getAllTracking(req, res);
});

// Obtener todos los emails de los usuarios que se han registrado en la aplicacion
router.get('/emails', authenticateSession, async (req, res) => {
  await userController.getAllEmails(req, res);
});


module.exports = router; 