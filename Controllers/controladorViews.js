module.exports = {
    home: function(req, res){
        res.render('index')
    },
    popular: function(req, res){
            res.render('popular')
    },

    upcoming: function(req, res){
            res.render('upcoming')
    },
    actors: function(req, res){
        res.render('actors')

    },
    generos: function(req, res){
        res.render('generos')

    },
    favoritos: function(req, res){
        res.render('favoritos')

    },
    login: function(req, res){
        res.render('login')

    },
    registracion: function(req, res){
        res.render('registracion')

    },
    usuarios: function(req, res){

        console.log(req);

        // var config = require('../database/config/config.js');
        // var mysql = require('mysql');
        // var connection = mysql.createConnection(config.databaseOptions);
       
        
        // connection.connect();

        // connection.query('INSERT INTO usuarios (lista de campos) values (lista de valores) ', function(err, rows, fields) {
        //   if (err) throw err;
        //      res.status(200).send(rows[0].nombreCompleto) ; ///porque tiro error depreciated
        //      //200 porq es la peticion de ok del get
        //  });

          //YYYY-MM-DD
        //  connection.end();
        res.status(201).send('Se creó el usuario satisfactoriamente.')

    },
    actoresDetalles: function(req, res){


        var config = require('../database/config/config.js');
        var mysql = require('mysql');
        var connection = mysql.createConnection(config.databaseOptions);
       
        /*Comienzo la conexion a la base de datos */
        connection.connect();

        connection.query('SELECT * FROM usuarios', function(err, rows, fields) {

          /**devuelvo el nombre completo */
          if (err) throw err;
             res.status(200).send(rows[0].nombreCompleto) ; ///porque tiro error depreciated
             //200 porq es la peticion de ok del get


         });

         connection.end();

    },
    detalles: function(req, res){
        res.render('detalles')
    },
    buscador: function(req, res){
        res.render('buscador')
    },
    buscadorUsuarios: function(req, res){
        res.render('buscadorUsuarios')
    },

}
