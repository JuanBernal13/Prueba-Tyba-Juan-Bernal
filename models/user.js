const Joi = require('joi');

// Validacion de modelo del usuario con Joi
const userSchema = Joi.object({
  id: Joi.string().optional(),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'El email debe tener un formato válido',
      'any.required': 'El email es obligatorio'
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'La contraseña debe tener al menos 6 caracteres',
      'any.required': 'La contraseña es obligatoria'
    })
});

// Esquema para login (El que se espera que se reciba)
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'El email debe tener un formato válido',
      'any.required': 'El email es obligatorio'
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'La contraseña es obligatoria'
    })
});

// Función para validar datos de usuario
const validateUser = (userData) => {
  return userSchema.validate(userData);
};

// Función para validar datos de login
const validateLogin = (loginData) => {
  return loginSchema.validate(loginData);
};

module.exports = {
  validateUser,
  validateLogin,
  userSchema,
  loginSchema
};
