const { Sequelize } = require("sequelize"),
             config = require('config');

//Crear una nueva instancia de Sequelize('database', 'username', 'password', options{})
const sequelize = new Sequelize(
    config.get('sequelize.database'), 
    config.get('sequelize.username'), 
    config.get('sequelize.password'), {
      host: config.get('sequelize.host'),
      dialect: 'postgres'
    } 
  );

module.exports = {
  sequelize
}
