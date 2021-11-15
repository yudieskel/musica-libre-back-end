//Crear una clase para definir el modelo
const { Sequelize } = require("sequelize"),
  { sequelize: db } = require('../db');

const Usuario = db.define('usuario', {
    id: {
        type: Sequelize.BIGINT,// postgre BIGINT
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING(50), // postgre VARCHAR
        allowNull: false
    },
    correo: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    clave: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    rol: {
        type: Sequelize.STRING(20),
        defaultValue: 'usuario'
    },
    token: {
        type: Sequelize.STRING(60),
        defaultValue: 'Vacío'
    },
    expiracion: {
        type: Sequelize.STRING(30),
        defaultValue: 'Vacío'
    }
});

 module.exports = Usuario