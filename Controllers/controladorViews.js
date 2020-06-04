const DB = require('../database/models');
const OP = DB.Sequelize.Op;
const bcryptjs = require('bcryptjs');
let moduloLogin = require('../modulo-login');


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
    home: function (req, res) {
        res.render('home')
    },
    chequearQueCoincidaMail: function (req, res) {
        moduloLogin.chequearUsuario(req.body.email)
        .then(resultado => {
            // return res.send('El resultado es: ' + resultado)
            if (resultado) {
                
                moduloLogin.validar(req.body.email, req.body.clave)
                .then(function (usuario) {
                    if(usuario == false){
                        console.log('No validaron los datos')
                    }
                    else{
                        DB.resenas.create({
                            peliculaId: req.body.peliculaId,
                            textoResena:req.body.textoResena, 
                            puntaje:req.body.puntaje,
                            usuarioId: usuario.id,
                        })
                        res.redirect('/detalles')
                    }
                })
                
            }
        })
    },

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
        res.render('detalles', {
            peliculaId: req.query.IdDePeliculas,
        })
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
