const MongoConexion = require('../../config/database');
const { validateTracking } = require('../../models/tracking');

class TrackingService {
  constructor() {
    this.collectionName = 'tracking';
  }

  // Obtener la colección de tracking
  async getCollection() {
    const mongoInstance = MongoConexion.getInstance();
    const db = await mongoInstance.connect();
    return db.collection(this.collectionName);
  }

  // Guardar registro de tracking
  async saveTracking(trackingData) {
    try {
      // Validar datos de tracking
      const { error, value } = validateTracking(trackingData);
      if (error) {
        throw new Error(error.details[0].message);
      }

      const collection = await this.getCollection();

      // Crear el registro de tracking en los modelos manejados con mongodb
      const newTracking = {
        email: value.email,
        method: value.method,
        endpoint: value.endpoint,
        createdAt: new Date()
      };

      const result = await collection.insertOne(newTracking);
      
      return {
        id: result.insertedId,
        ...newTracking
      };
    } catch (error) {
      console.error('Error al guardar tracking:', error);
      throw error;
    }
  }

  // Obtener registros de tracking por email
  async getTrackingByEmail(email) {
    try {
      const collection = await this.getCollection();
      const trackingRecords = await collection.find({ email }).toArray();
      return trackingRecords;
    } catch (error) {
      console.error('Error al obtener tracking por email:', error);
      throw error;
    }
  }

  // Obtener todos los eventos de tracking en la aplicacion
  async getAllTracking() {
    try {
      const collection = await this.getCollection();
      const trackingRecords = await collection.find({}).toArray();
      return trackingRecords;
    } catch (error) {
      console.error('Error al obtener todos los tracking:', error);
      throw error;
    }
  }
}

module.exports = TrackingService; 