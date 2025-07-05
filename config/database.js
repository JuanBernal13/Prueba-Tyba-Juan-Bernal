const { MongoClient, Db } = require('mongodb');

//Implementacion de conexion a mongoDB usando Singleton.
class MongoConexion {
  static instance;
  client;
  db;

  constructor() {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
    this.client = new MongoClient(uri);
  }
//Singleton para evitar multiples conexiones a la base de datos
  static getInstance() {
    if (!MongoConexion.instance) {
      MongoConexion.instance = new MongoConexion();
    }
    return MongoConexion.instance;
  }
  
  async connect(dbName = process.env.DB_NAME || 'tyba_db') {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db(dbName);
      console.log('Connectado a la base de datos');
    }
    return this.db;
  }
}

module.exports = MongoConexion;
