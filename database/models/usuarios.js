const Sequelize = require('sequelize');
const sequelize = require('../config/config');

const Usuario = sequelize.define('usuarios', {
    id: Sequelize.INTEGER,
    nombreCompleto: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    fechaNacimiento: Sequelize.DATE,
});

module.exports = Usuario;