const Sequelize = require('sequelize');
const sequelize = require('../config/config');

const Usuarios = sequelize.define('usuarios', {
    id: Sequelize.DECIMAL,
    nombreCompleto: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    fechaNacimiento: Sequelize.DATE,
});

module.exports = Usuarios;