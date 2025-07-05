require('dotenv').config();
const express = require('express');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const locationRoutes = require('./routes/restaurantRoutes');
const healthRoutes = require('./routes/healthRoutes');

const app = express();

// Configuración de sesiones de los usuarios
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

app.use(express.json());

// Registro de rutas  
app.use('/api/v1', userRoutes);
app.use('/api/v1', locationRoutes);
app.use('/api/v1', healthRoutes);


console.log('Prueba de tests');
// Inicio de la aplicacion
app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${process.env.PORT}`);
});

