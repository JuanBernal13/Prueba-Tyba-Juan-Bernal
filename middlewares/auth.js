// Middleware para verificar sesión de usuario
const authenticateSession = (req, res, next) => {
  // Verificar si hay una sesión activa
  if (!req.session || !req.session.user) {
    return res.status(401).json({
      success: false,
      message: 'Sesión requerida. Por favor inicia sesión.'
    });
  }
 
  req.user = req.session.user;
  next();
};

module.exports = {
  authenticateSession
}; 