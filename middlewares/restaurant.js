const { validateCoordinates } = require('../utils/restaurantUtils');

// Middleware para validar parámetros de de input para el endpoint de busqueda de restaurantes
const validateLocationParams = (req, res, next) => {
  try {
    const { latitud, longitud } = req.body;

    // Validar que se proporcionen coordenadas
    if (latitud === undefined || longitud === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Las coordenadas (latitud y longitud) son obligatorias'
      });
    }

    // Validar que las coordenadas sean números
    const lat = parseFloat(latitud);
    const lng = parseFloat(longitud);

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({
        success: false,
        message: 'Las coordenadas deben ser números válidos'
      });
    }

    // Validar rango de coordenadas usando la función de utils
    if (!validateCoordinates(lat, lng)) {
      return res.status(400).json({
        success: false,
        message: 'Las coordenadas están fuera del rango válido. Latitud: -90 a 90, Longitud: -180 a 180'
      });
    }

    // Si todas las validaciones pasan, continuar
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error en la validación de parámetros de ubicación',
      error: error.message
    });
  }
};

// Middleware para validar parámetros opcionales de location (cuando las coordenadas son opcionales)
const validateOptionalLocationParams = (req, res, next) => {
  try {
    const { latitud, longitud } = req.body;

    // Si se proporcionan coordenadas, validarlas
    if (latitud !== undefined || longitud !== undefined) {
      // Si se proporciona una coordenada, ambas deben estar presentes
      if (latitud === undefined || longitud === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Si se proporciona latitud o longitud, ambas coordenadas son obligatorias'
        });
      }

      const lat = parseFloat(latitud);
      const lng = parseFloat(longitud);

      if (isNaN(lat) || isNaN(lng)) {
        return res.status(400).json({
          success: false,
          message: 'Las coordenadas deben ser números válidos'
        });
      }

      if (!validateCoordinates(lat, lng)) {
        return res.status(400).json({
          success: false,
          message: 'Las coordenadas están fuera del rango válido. Latitud: -90 a 90, Longitud: -180 a 180'
        });
      }
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error en la validación de parámetros de ubicación',
      error: error.message
    });
  }
};

module.exports = {
  validateLocationParams,
  validateOptionalLocationParams
}; 