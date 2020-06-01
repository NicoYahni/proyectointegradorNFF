const Sequelize = require('sequelize');
const sequelize = require('../database/config/config');

const Usuario = sequelize.define('usuarios', {
    id: Sequelize.INTEGER,
    nombreCompleto: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    fechaNacimiento: Sequelize.DATE,
},
{timestamps: false});


module.exports = Usuario;