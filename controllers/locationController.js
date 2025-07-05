const LocationService = require('../services/restaurantService/locationService');

//Controlador para buscar restaurantes cercanos a coordenadas
class LocationController {
    //Busqueda de restaurantes cercanos a coordenadas dadas.
  async buscarRestaurantes(req, res) {
    console.log(`[LocationController] buscarRestaurantes called`);
    try {
      const { latitud, longitud, radius = 5000 } = req.body;
      
      const restaurants = await LocationService.searchRestaurants(
        latitud ? parseFloat(latitud) : null,
        longitud ? parseFloat(longitud) : null,
        parseInt(radius)
      );
      
      res.json({
        success: true,
        message: '10 restaurantes mas cercanos encontrados exitosamente',
        data: restaurants,
        count: restaurants.length
      });
    } catch (error) {
      console.error(`[LocationController] Error in buscarRestaurantes:`, error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

//Se puede agregar mas funciones para realizar otro tipo de busquedas.

module.exports = LocationController; 