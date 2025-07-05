//Controlador para revisar el estado del despliegue de la app
class HealthController {
  async checkHealth(req, res) {
    console.log(`[HealthController] checkHealth called`);
    try {
      res.json({
        success: true,
        status: 'up',
        message: 'Servicio desplegado correctamente',
        timestamp: new Date().toISOString()
      });
    }//Esta caido   
    catch (error) {
      console.error(`[HealthController] Error in checkHealth:`, error);
      res.status(500).json({
        success: false,
        status: 'down',
        message: 'Error en el servicio',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }
}

module.exports = HealthController; 