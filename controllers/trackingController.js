const TrackingService = require('../services/trackingService/trackingService');

class TrackingController {
  constructor() {
    this.trackingService = new TrackingService();
  }

  // Obtener historial de tracking para el usuario autenticado
  async getHistory(req, res) {
    console.log(`[TrackingController] getTracking of user ${req.user.email} called`);
    try {
      const userEmail = req.user.email;
      
      const trackingHistory = await this.trackingService.getTrackingByEmail(userEmail);
      
      // Ordenar por fecha más reciente primero
      const sortedHistory = trackingHistory.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      res.status(200).json({
        success: true,
        message: `Historial de actividad para ${userEmail}`,
        data: {
          user: userEmail,
          totalRecords: sortedHistory.length,
          history: sortedHistory
        }
      });
    } catch (error) {
      console.error('Error al obtener historial:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener el historial de actividad',
        error: error.message
      });
    }
  }

  async getAllTracking(req, res) {
    console.log(`[TrackingController] getAllTracking called`);
    try {
      const trackingRecords = await this.trackingService.getAllTracking();
      res.status(200).json({
        success: true,
        message: 'Todas las transacciones realizadas en la aplicacion',
        data: trackingRecords
      });
      
    } catch (error) {
      console.error('Error al obtener todos las transacciones:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener todos las transacciones',
        error: error.message
      });
    }
  }
}

module.exports = TrackingController; 