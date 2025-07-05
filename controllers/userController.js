const UserService = require('../services/userService/userService');

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  // Registrar usuario
  async register(req, res) {
    console.log(`[UserController] register called`);
    try {
      console.log(`Registro de usuario`);
      const user = await this.userService.registerUser(req.body);
      
      // Crear sesión para el usuario recién registrado
      req.session.user = {
        id: user.id,
        email: user.email
      };
      
      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: user
      });
    } catch (error) {
      console.error(`[UserController] Error in register:`, error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Login de usuario
  async login(req, res) {
    console.log(`[UserController] login called`);
    try {
      const user = await this.userService.loginUser(req.body);
      
      // Crear sesión para el usuario
      req.session.user = {
        id: user.id,
        email: user.email
      };
      
      res.status(200).json({
        success: true,
        message: 'Login exitoso',
        data: user
      });
    } catch (error) {
      console.error(`[UserController] Error in login:`, error);
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  }

  // Logout de usuario
  async logout(req, res) {
    console.log(`[UserController] logout called`);
    try {
      req.session.destroy((err) => {
        if (err) {
          console.error(`[UserController] Error destroying session:`, err);
          return res.status(500).json({
            success: false,
            message: 'Error al cerrar sesión'
          });
        }
        
        // Limpiar la cookie de sesión
        res.clearCookie('connect.sid');
        
        res.status(200).json({
          success: true,
          message: 'Logout exitoso'
        });
      });
    } catch (error) {
      console.error(`[UserController] Error in logout:`, error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Obtener todos los emails de usuarios
  async getAllEmails(req, res) {
    console.log(`[UserController] getAllEmails called`);
    try {
      const emails = await this.userService.getAllUserEmails();
      res.status(200).json({
        success: true,
        data: emails
      });
    } catch (error) {
      console.error(`[UserController] Error in getAllEmails:`, error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = UserController; 