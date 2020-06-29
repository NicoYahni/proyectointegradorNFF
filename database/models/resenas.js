module.exports = (sequelize, dataTypes) => {          // MODEL: representacion de nuestra tabla en el codigo
                            
                                            //  Con esto obtenemos recursos que nos permiten realizar consultas e interacciones con la base de datos de manera simplificada.

const Resena = sequelize.define('resenas', {
    id: {
        type: dataTypes.INTEGER,                    //Data type:  copias de la base de datos el data type de cada dato, en este caso id tendria data type integer
        primaryKey: true,
        autoIncrement: true,
    },
    peliculaId: dataTypes.INTEGER,
    usuarioId: dataTypes.INTEGER,
    textoResena: dataTypes.STRING,                         // en este caso el data type
    puntaje: dataTypes.DECIMAL,                           // en este caso es decimal
},
{tableName:'resenas'});

return Resena;
};