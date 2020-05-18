const DB = require('../database/models');
const OP = DB.Sequalize.OP;

module.exports = {
    detallesActor: function(req,res){
        DB
        .sequalize
        .query('SELECT*FROM actors')
        .then(function(resultados){
            return res.send(resultados[0]);

        }) 
        .catch(function(errors){
            return res.send(errors);
        });    
    }
}