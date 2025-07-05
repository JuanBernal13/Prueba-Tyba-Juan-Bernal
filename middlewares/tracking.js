const TrackingService = require('../services/trackingService/trackingService');

const trackingMiddleware = async (req, res, next) => {
  try {
    // Only track if there's an active session
    
      const trackingService = new TrackingService();
      
      //Verificar si el usuario esta logeado o no, obtener el email del usuario
      const email = (req.session && req.session.user && req.session.user.email) || req.email || 'admin@admin.com';
        const trackingData = {
        email: email,
        method: req.method,
        endpoint: req.originalUrl || req.url
      };

      trackingService.saveTracking(trackingData).catch(error => {
        console.error('Error al guardar tracking:', error);
      });
    

    next();
  } catch (error) {
    console.error('Error en tracking middleware:', error);
    next();
  }
};

module.exports = {
    trackingMiddleware
}; 