const bcrypt = require('bcrypt');
//Clase de utilidad para el servicio de usuario

class UserServiceUtils {
  // Función para hashear contraseña
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(password, salt);
  }

  // Función para comparar contraseñas
  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = UserServiceUtils; 