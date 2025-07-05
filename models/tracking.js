const Joi = require('joi');

const trackingSchema = Joi.object({
    id: Joi.string().optional(),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'El email debe tener un formato válido',
        'any.required': 'El email es obligatorio'
      }),
    method: Joi.string()
      .valid('GET', 'POST')
      .required()
      .messages({
        'any.only': 'El método debe ser GET, POST',
        'any.required': 'El método HTTP es obligatorio'
      }),
    endpoint: Joi.string()
      .required()
      .messages({
        'any.required': 'El endpoint es obligatorio'
      })
  });

// Función para validar datos de tracking
const validateTracking = (trackingData) => {
  return trackingSchema.validate(trackingData);
};

module.exports = {
    trackingSchema,
    validateTracking
}