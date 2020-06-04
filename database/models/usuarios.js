module.exports = (sequelize, dataTypes) => {
    

    const Usuario = sequelize.define('usuarios', 
        {
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
        {tableName: 'usuarios'}
    );


    return Usuario;
};