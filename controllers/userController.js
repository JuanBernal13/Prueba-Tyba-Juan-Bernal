const UserService = require('../services/userService/userService');

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  // Registrar usuario
  async register(req, res) {
    console.log(`[UserController] Iniciando registro de usuario.`);
    console.log(`[UserController] Datos de registro recibidos para email: ${req.body.email}`);
    
    try {
      console.log(`[UserController] Llamando a UserService para registrar usuario...`);
      const user = await this.userService.registerUser(req.body);
      
      // Crear sesión para el usuario recién registrado
      req.session.user = {
        id: user.id,
        email: user.email
      };
      console.log(`[UserController] Sesión creada para el usuario ${user.email}. ID de sesión: ${req.session.id}`);
      
      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: user
      });
      
      console.log(`[UserController] Usuario ${user.email} registrado y respuesta enviada exitosamente.`);
    } catch (error) {
      console.error(`[UserController] Error en el registro de usuario para email ${req.body.email}:`, error.message);
      console.error(`[UserController] Stack trace del error:`, error.stack);
      
      res.status(400).json({
        success: false,
        message: error.message
      });
      
      console.log(`[UserController] Respuesta de error enviada al cliente durante el registro.`);
    }
  }

  // Login de usuario
  async login(req, res) {
    console.log(`[UserController] Iniciando proceso de login.`);
    console.log(`[UserController] Intento de login para email: ${req.body.email}`);
    
    try {
      console.log(`[UserController] Llamando a UserService para autenticar usuario...`);
      const user = await this.userService.loginUser(req.body);
      
      // Crear sesión para el usuario
      req.session.user = {
        id: user.id,
        email: user.email
      };
      console.log(`[UserController] Sesión creada para el usuario ${user.email}. ID de sesión: ${req.session.id}`);
      
      res.status(200).json({
        success: true,
        message: 'Login exitoso',
        data: user
      });
      
      console.log(`[UserController] Login exitoso para el usuario ${user.email} y respuesta enviada.`);
    } catch (error) {
      console.error(`[UserController] Error en el login para el email ${req.body.email}:`, error.message);
      console.error(`[UserController] Stack trace del error:`, error.stack);
      
      res.status(401).json({
        success: false,
        message: error.message
      });
      
      console.log(`[UserController] Respuesta de error enviada al cliente durante el login.`);
    }
  }

  // Logout de usuario
  async logout(req, res) {
    console.log(`[UserController] Iniciando cierre de sesión.`);
    const userEmail = req.session.user ? req.session.user.email : 'desconocido';
    console.log(`[UserController] Intentando cerrar sesión para el usuario: ${userEmail}`);
    
    try {
      req.session.destroy((err) => {
        if (err) {
          console.error(`[UserController] Error al destruir la sesión para ${userEmail}:`, err.message);
          console.error(`[UserController] Stack trace del error de sesión:`, err.stack);
          return res.status(500).json({
            success: false,
            message: 'Error al cerrar sesión'
          });
        }
        
        // Limpiar la cookie de sesión
        res.clearCookie('connect.sid');
        console.log(`[UserController] Cookie de sesión 'connect.sid' limpiada.`);
        
        res.status(200).json({
          success: true,
          message: 'Logout exitoso'
        });
        
        console.log(`[UserController] Cierre de sesión exitoso para el usuario ${userEmail}.`);
      });
    } catch (error) {
      console.error(`[UserController] Error general en logout para ${userEmail}:`, error.message);
      console.error(`[UserController] Stack trace del error general:`, error.stack);
      res.status(500).json({
        success: false,
        message: error.message
      });
      
      console.log(`[UserController] Respuesta de error enviada al cliente durante el logout.`);
    }
  }

  // Obtener todos los emails de usuarios
  async getAllEmails(req, res) {
    console.log(`[UserController] Iniciando obtención de todos los emails de usuarios.`);
    
    try {
      console.log(`[UserController] Llamando a UserService para obtener todos los emails...`);
      const emails = await this.userService.getAllUserEmails();
      console.log(`[UserController] ${emails.length} emails de usuarios encontrados.`);
      
      res.status(200).json({
        success: true,
        data: emails
      });
      
      console.log(`[UserController] Respuesta enviada con ${emails.length} emails de usuarios.`);
    } catch (error) {
      console.error(`[UserController] Error al obtener todos los emails de usuarios:`, error.message);
      console.error(`[UserController] Stack trace del error:`, error.stack);
      
      res.status(500).json({
        success: false,
        message: error.message
      });
      
      console.log(`[UserController] Respuesta de error enviada al cliente al obtener emails.`);
    }
  }
}

module.exports = UserController; 