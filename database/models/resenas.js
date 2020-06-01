const Sequelize = require('sequelize');
const sequelize = require('../config/config');

const Resena = sequelize.define('resenas', {
    id: Sequelize.INTEGER,
    peliculaId: Sequelize.INTEGER,
    usuarioId: Sequelize.INTEGER,
    textoResena: Sequelize.STRING,
    puntaje: Sequelize.DECIMAL,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

module.exports = Resena;