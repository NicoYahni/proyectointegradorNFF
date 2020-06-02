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

    }       ,
    usuarios:{
        buscadorUsuarios: function(req, res) {
            res.render('buscadorUsuarios');
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
                
            }, createUsuario: function(req,res){
                console.log(req.body.nombreUsuario);
                console.log(req.body.passwordUsuario);
                var bcrypt = require('bcryptjs')
                bcrypt.hash(req.body.passwordUsuario, 10, function(err, hash) {
                    DB.usuarios.create({
                        nombreCompleto: req.body.nombreUsuario,
                        email:req.body.emailUsuario, 
                        password:req.body.passwordUsuario,
                        fechaNacimiento:req.body.fechaNacimientoUsuario,
                    });
                    console.log(hash);
                });
                res.status(201).send('') ;
            },
    },
    moduloLogin: {
        chequearUsuario: function (email) {
            return DB.usuarios.findOne({
                where : {
                    email: email
                }
            })
            .then( function(usuario){
                return res.send(usuario);
            })

        }, buscarPorEmail: function(email) {
            return DB.usuarios.findOne({
                where : {
                    email:email
                }
            })
            .then(resultado => {
                return resultado
            })
        }, validar: function(email, pass){
            return DB.usuarios.findOne({
                where : {
                    email : email,
                    password: pass
                },
            })
            .then(results => {
                console.log(results)
                return results;
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
