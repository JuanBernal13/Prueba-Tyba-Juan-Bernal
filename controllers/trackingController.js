const TrackingService = require('../services/trackingService/trackingService');

class TrackingController {
  constructor() {
    this.trackingService = new TrackingService();
  }

  // Obtener historial de tracking para el usuario autenticado
  async getHistory(req, res) {
    console.log(`[TrackingController] Iniciando obtención de historial de tracking para el usuario ${req.user.email}`);
    
    try {
      const userEmail = req.user.email;
      console.log(`[TrackingController] Solicitando historial para el email: ${userEmail}`);
      
      const trackingHistory = await this.trackingService.getTrackingByEmail(userEmail);
      
      console.log(`[TrackingController] Historial de tracking obtenido. Registros encontrados: ${trackingHistory.length}`);
      // Ordenar por fecha más reciente primero
      const sortedHistory = trackingHistory.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      console.log(`[TrackingController] Historial ordenado por fecha. Total de registros: ${sortedHistory.length}`);
      res.status(200).json({
        success: true,
        message: `Historial de actividad para ${userEmail}`,
        data: {
          user: userEmail,
          totalRecords: sortedHistory.length,
          history: sortedHistory
        }
      });
      
      console.log(`[TrackingController] Respuesta de historial de tracking enviada exitosamente.`);
    } catch (error) {
      console.error(`[TrackingController] Error al obtener historial para el usuario ${req.user.email}:`, error.message);
      console.error(`[TrackingController] Stack trace del error:`, error.stack);
      
      res.status(500).json({
        success: false,
        message: 'Error al obtener el historial de actividad',
        error: error.message
      });
      
      console.log(`[TrackingController] Respuesta de error enviada al cliente.`);
    }
  }

  async getAllTracking(req, res) {
    console.log(`[TrackingController] Iniciando obtención de todas las transacciones de la aplicación`);
    
    try {
      const trackingRecords = await this.trackingService.getAllTracking();
      console.log(`[TrackingController] Todas las transacciones obtenidas. Total de registros: ${trackingRecords.length}`);
      
      res.status(200).json({
        success: true,
        message: 'Todas las transacciones realizadas en la aplicacion',
        data: trackingRecords
      });
      
      console.log(`[TrackingController] Respuesta de todas las transacciones enviada exitosamente.`);
    } catch (error) {
      console.error(`[TrackingController] Error al obtener todas las transacciones:`, error.message);
      console.error(`[TrackingController] Stack trace del error:`, error.stack);
      
      res.status(500).json({
        success: false,
        message: 'Error al obtener todos las transacciones',
        error: error.message
      });
      
      console.log(`[TrackingController] Respuesta de error enviada al cliente.`);
    }
  }
}

module.exports = TrackingController; 