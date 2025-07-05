//Controlador para revisar el estado del despliegue de la app
class HealthController {
  async checkHealth(req, res) {
    console.log(`[HealthController] Iniciando verificación de salud del servicio`);
    
    try {
      console.log(`[HealthController] Verificando estado del servicio...`);
      
      res.json({
        success: true,
        status: 'up',
        message: 'Servicio desplegado correctamente',
        timestamp: new Date().toISOString()
      });
      
      console.log(`[HealthController] Respuesta de health check enviada exitosamente`);
      console.log(`[HealthController] Estado del servicio: ACTIVO`);
      
    }//Esta caido   
    catch (error) {
      console.error(`[HealthController] Error crítico en verificación de salud:`, error.message);
      console.error(`[HealthController] Stack trace del error:`, error.stack);
      console.error(`[HealthController] Timestamp del error: ${new Date().toISOString()}`);
      
      res.status(500).json({
        success: false,
        status: 'down',
        message: 'Error en el servicio',
        error: error.message,
        timestamp: new Date().toISOString()
      });
      
      console.log(`[HealthController] Respuesta de error enviada al cliente`);
    }
  }
}

module.exports = HealthController; 