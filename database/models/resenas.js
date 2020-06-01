module.exports = (sequelize, dataTypes) => {

// const Sequelize = require('sequelize');
// const sequelize = require('../config/config');

const Resena = sequelize.define('resenas', {
    id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    peliculaId: dataTypes.INTEGER,
    usuarioId: dataTypes.INTEGER,
    textoResena: dataTypes.STRING,
    puntaje: dataTypes.DECIMAL,
},
{tableName:'resenas'});

return Resena;
};