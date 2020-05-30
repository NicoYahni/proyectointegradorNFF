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
    actoresDetalles: function(req, res){
        // var mysql      = require('mysql');
        // var connection = mysql.createConnection({
        //   host     : 'localhost',
        //   user     : 'root',
        //   password : ''
        // });

        // connection.connect();

        // connection.query('SELECT * FROM usuarios', function(err, rows, fields) {
        //   if (err) throw err;
        //      res.send('El nombre de usuario es: ', rows[0].nombreCompleto)


        // });

        // connection.end();


        res.send('[ "nombreCompleto":"juan"]"');
    },
    detalles: function(req, res){
        res.render('detalles')
    },
    buscador: function(req, res){
        res.render('buscador')
    },

}
