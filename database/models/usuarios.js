module.exports = (sequelize, dataTypes) => {
    const Sequelize = require('sequelize');
    const config = require('../config/config');
    
    var sequelize = new Sequelize(config.development);

const Usuario = sequelize.define('usuarios', {
    id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombreCompleto: dataTypes.STRING,
    email: dataTypes.STRING,
    password: dataTypes.STRING,
    fechaNacimiento: dataTypes.DATE,
},
{tableName: 'usuarios'});


return Usuario;
};