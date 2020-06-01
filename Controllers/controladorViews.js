const DB = require('../database/models');
const OP = DB.Sequelize.Op;
const bcryptjs = require('bcryptjs');

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
    usuarios:{
        buscadorUsuario: function(req, res) {
            res.render('buscadorUsuario');
        },
        usuarioBuscado: function(req, res){
            DB.User.findAll({
                where:{
                [op.or]: {
                    email:{[op.like]: "%"+ req.query.buscadorUsuario +"%" } ,
                    username:{[op.like]: "%"+ req.query.buscadorUsuario +"%" } 

                }
            }})
            .then(function(resultado) {
                res.send(resultado)
            })
        },
            SearchById: function(req, res){
                DB.user.findByPk(req.params.id)
                .then(function(usuario){
                    DB.review.findAll({
                        where: {
                            idUser: usuario.id
                        }
                    })
                    .then(function(reviews){

                    })
                })
                
            }

        

    },
    serieDetail: function(req,res) {
            DB.review.findAll({
                where:{
                    idSeries:req.query.idSerie
                }
            })
            .then(function(reviews){
                res.render('serieDetails',{
                    idSerie: req.query.idSerie,
                    reviews: reviews
                })
            })

    },
    actoresDetalles: function(req, res){


        var config = require('../database/config/config');
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
    usuarioBuscado: function(req, res){

        res.render('usuarioBuscado')
    },

}
