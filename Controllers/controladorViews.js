let DB = require('../database/models');
let op = DB.Sequelize.Op;
let bcryptjs = require('bcryptjs')
let moduloLogin = require('../modulo-login');




module.exports = {
    home: function(req, res){
        res.render('index', {
            nombreCompleto: '',
            logeado: false
        })
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
        res.render('login', {invalido: false});
        
    },
    validarUsuarioPassword: function (req, res){
   
      
        moduloLogin.validar(req.body.email,req.body.password) 
                    .then(
                        resultado => {
    
                           if(resultado == undefined){
                               res.render('login', {invalido: true});
                            //    res.redirect('/login');
                           }else{
                               console.log('Objeto Usuario:');
                               console.log(resultado.dataValues);
                               
                               DB.resenas.findAll({
                                where:{
                                    id: resultado.id
                                }
                               })
                               .then(function(reviews){
                                res.render('misResenas',{nombreCompleto:resultado.dataValues.nombreCompleto,
                                    usuario:resultado,
                                    reviews:reviews
                                });
                               })
                           }

                        }
                    );
        

        
    },
    registracion: function(req, res){
        res.render('registracion')

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
                        res.redirect('/login')
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
            DB.usuarios.findAll({
                where:{
                [op.or]: {
                    email:{[op.like]: "%"+ req.body.buscadorUsuario +"%" } ,
                    nombreCompleto:{[op.like]: "%"+ req.body.buscadorUsuario +"%" } 

                }
            }})
            .then(function(resultado) {
                res.render('usuarioBuscado', {
                    users: resultado
                })
            })
            .catch(e => console.log(e))
        },
            SearchById: function(req, res){
                DB.usuarios.findByPk(req.params.id)
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
                //return res.send(req.body)
                
                let passHash = bcryptjs.hashSync(req.body.passwordUsuario, 10) 
            
                DB.usuarios.create({
                    nombreCompleto: req.body.nombreUsuario,
                    email:req.body.emailUsuario, 
                    password:passHash,
                    fechaNacimiento: req.body.fechaDeNacimientoUsuario,
                })
                .then(function (usuarioCreado) {
                    return res.redirect('/login')
                })
               
            },
    },
    moduloLogin: {
        buscarPorEmail: function(email) {
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
    tiposdegeneros: function(req, res) {
        res.render('tiposdegeneros')
    },
    userDetail: function(req, res) {
        DB.usuarios.findByPk(req.params.id)
                .then(function(usuario){
                    DB.resenas.findAll({
                        where: {
                            usuarioId: usuario.id
                        }
                    })
                    .then(function(reviews){
                        res.render("userDetail", {
                            usuario: usuario,
                            reviews: reviews
                        })
                    })
                })
    },
    actorDetail: function(req, res) {
        res.render('actoresdetalles')
    },
    resenasMejores: function(req, res) {
        res.render('resenasMejores')
    },
    resenasPeores: function(req, res) {
        res.render('resenasPeores')
    },
    misResenas: function(req, res) {
        DB.usuarios.findByPk(req.params.id)
                .then(function(usuario){
                    DB.resenas.findAll({
                        where: {
                            usuarioId: usuario.id
                        }
                    })
                    .then(function(reviews){
                        res.render("misResenas", {
                            usuario: usuario,
                            reviews: reviews
                        })
                    })
                })
                DB.resenas.findAll({
                    where:{
                        id: resultado.id
                    }
                   })
                   .then(function(reviews){
                    res.render('misResenas',{nombreCompleto:resultado.dataValues.nombreCompleto,usuario:resultado,reviews:reviews});
                   })
    },
    editarResena: function(req, res) {
        DB.resenas.findAll({
            where :{
                textoResena: req.query.textoResena,
                puntaje: req.query.puntaje,
            }
            });

        //Promise.all([pedidoResena])
           // .then(function([Resena]) {
               // res.render("editarResena", {
                  //  textoResena: textoResena    ,
                   // puntaje: puntaje,
               // });
          //  })
        
    },
    borrarResena: function(req, res){
            DB.Resena.destroy({
                where: {
                    id: req.params.peliculaId
                }
            })
            res.redirect("/misResenas");
    },
    confirmUser: function(req, res){

}
}
