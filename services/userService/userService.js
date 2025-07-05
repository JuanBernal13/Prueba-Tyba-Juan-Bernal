const MongoConexion = require('../../config/database');
const { validateUser, validateLogin } = require('../../models/user');
const UserServiceUtils = require('./userServiceUtils');

class UserService {
  constructor() {
    this.collectionName = 'users';
  }

  // Obtener la colección de usuarios
  async getCollection() {
    const mongoInstance = MongoConexion.getInstance();
    const db = await mongoInstance.connect();
    return db.collection(this.collectionName);                                                              
  }

  // Registrar un nuevo usuario
  async registerUser(userData) {
    // Validar datos del usuario
    const { error, value } = validateUser(userData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const collection = await this.getCollection();

    // Verificar si el usuario ya existe
    const existingUser = await collection.findOne({ email: value.email });
    if (existingUser) {
      throw new Error('El usuario ya existe con este email');
    }

    // Hashear la contraseña
    const hashedPassword = await UserServiceUtils.hashPassword(value.password);

    // Crear el usuario
    const newUser = {
      email: value.email,
      password: hashedPassword,
      createdAt: new Date()
    };

    const result = await collection.insertOne(newUser);
    
    // Retornar el usuario sin la contraseña
    return {
      id: result.insertedId,
      email: newUser.email,
      createdAt: newUser.createdAt
    };
  }

  // Login de usuario
  async loginUser(loginData) {
    // Validar datos de login
    const { error, value } = validateLogin(loginData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const collection = await this.getCollection();

    const user = await collection.findOne({ email: value.email });
    if (!user) {
      throw new Error('No existe el email registrado en la base de datos');
    }

    // Comparar contraseñas
    const isPasswordValid = await UserServiceUtils.comparePassword(value.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas. Contraseña incorrecta');
    }

    // Retornar datos del usuario para la sesión
    return {
      id: user._id,
      email: user.email,
      createdAt: user.createdAt    
    };
  }

  // Obtener todos los emails de los usuarios
  async getAllUserEmails() {
    const collection = await this.getCollection();
    
    const users = await collection.find({}, { projection: { email: 1, _id: 0 } }).toArray();
    
    // Retornar solo los emails en un array
    return users.map(user => user.email);
  }
}

module.exports = UserService; 