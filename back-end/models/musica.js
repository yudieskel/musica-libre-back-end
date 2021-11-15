//Crear una clase para definir el modelo
const { Sequelize } = require('sequelize'),
  { sequelize: db } = require('../db');

const Musica = db.define('musica', {
    id: {
        type: Sequelize.BIGINT,// postgre BIGINT
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: Sequelize.STRING(100), // postgre VARCHAR(100)
        allowNull: false
    },
    autor: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    albun: {
        type: Sequelize.STRING(30), // postgre VARCHAR(30)
        defaultValue: 'Música Libre'
    },
    genero: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    año: {
        type: Sequelize.STRING(4),  // postgre VARCHAR(4)
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING(4),
        defaultValue: 'MP3'
    },
    ruta: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
});

 module.exports = Musica