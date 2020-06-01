const Sequelize = require('sequelize');
const sequelize = require('../config/config');

const Resenas = sequelize.define('resenas', {
    id: Sequelize.DECIMAL,
    peliculaId: Sequelize.DECIMAL,
    usuarioId: Sequelize.DECIMAL,
    textoResena: Sequelize.STRING,
    puntaje: Sequelize.DECIMAL,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

module.exports = Resenas;