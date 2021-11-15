//Crear una clase para definir el modelo
const { Sequelize } = require("sequelize"),
  { sequelize: db } = require('../db');

const Contacto = db.define('contacto', {
    id: {
        type: Sequelize.BIGINT,// postgre BIGINT
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING(50), // postgre VARCHAR(50)
        allowNull: false
    },
    dirección: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    correo: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
});

 module.exports = Contacto