const LocationService = require('../services/restaurantService/locationService');

//Controlador para buscar restaurantes cercanos a coordenadas
class LocationController {
    //Busqueda de restaurantes cercanos a coordenadas dadas.
  async buscarRestaurantes(req, res) {
    console.log(`[LocationController] Iniciando búsqueda de restaurantes cercanos`);
    console.log(`[LocationController] Datos de entrada recibidos: Latitud ${req.body.latitud}, Longitud ${req.body.longitud}, Radio ${req.body.radius || 5000}`);
    
    try {
      const { latitud, longitud, radius = 5000 } = req.body;
      
      // Validar que latitud y longitud sean números válidos
      if (latitud === null || longitud === null || isNaN(parseFloat(latitud)) || isNaN(parseFloat(longitud))) {
        console.warn(`[LocationController] Advertencia: Latitud o longitud no válidas. Latitud: ${latitud}, Longitud: ${longitud}`);
        throw new Error('Latitud y longitud son requeridas y deben ser números válidos.');
      }
      
      console.log(`[LocationController] Llamando a LocationService para buscar restaurantes...`);
      const restaurants = await LocationService.searchRestaurants(
        parseFloat(latitud),
        parseFloat(longitud),
        parseInt(radius)
      );
      
      console.log(`[LocationController] ${restaurants.length} restaurantes encontrados exitosamente.`);
      res.json({
        success: true,
        message: `${restaurants.length} restaurantes mas cercanos encontrados exitosamente`,
        data: restaurants,
        count: restaurants.length
      });
      
      console.log(`[LocationController] Respuesta enviada con ${restaurants.length} restaurantes.`);
    } catch (error) {
      console.error(`[LocationController] Error en buscarRestaurantes:`, error.message);
      console.error(`[LocationController] Stack trace del error:`, error.stack);
      
      res.status(500).json({
        success: false,
        message: error.message
      });
      
      console.log(`[LocationController] Respuesta de error enviada al cliente.`);
    }
  }
}

//Se puede agregar mas funciones para realizar otro tipo de busquedas.

module.exports = LocationController; 