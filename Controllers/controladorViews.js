let DB = require('../database/models');  //requiere al modelo de base de datos

let op = DB.Sequelize.Op;  // permite el uso de operadores (ej: like, )

let bcryptjs = require('bcryptjs') // requires al bycryt para poder encryptar o hashear la contrasenia, tenes q instalarlo en la terminal antes.

let moduloLogin = require('../modulo-login'); //require el archivo modulo login que contiene las funciones que hacen q el usario se pueda loggear




module.exports = {
    home: function(req, res){
        res.render('index', {
            nombreCompleto: '',        // funcion que renderiza la vista de la pagina principa, SOLO SI no esta loggeado
            logeado: false
        })
    },
    popular: function(req, res){
            res.render('popular')   // funcion que renderiza la vista de popular
    },

    upcoming: function(req, res){
            res.render('upcoming')   // """"""""""""""""""""""""""" de upcoming
    },
    actors: function(req, res){
        res.render('actors')        // """"""""""""""""""""""""""" de upcoming

    },
    generos: function(req, res){
        res.render('generos')      // """"""""""""""""""""""""""" de generos

    },
    favoritos: function(req, res){  
        res.render('favoritos')      // """"""""""""""""""""""""""" de favoritos

    },
    login: function(req, res){
        res.render('login', {invalido: false});  // // """"""""""""""""""""""""""" de login SOLO SI la funcion invalido = False, ya que si seria verdadera esta haria q el view cambie
        
    },

    validarUsuarioPassword: function (req, res){
   
        
        moduloLogin.validar(req.body.email,req.body.password)        //establece al modulo login como funcion
                    .then(
                        resultado => {                              // se crea la funcion resultado q toma como parametros req.body.email y req.body.password
     
                           if(resultado == undefined){                  //se refiere a la funcion resultado establecida en el modulo login q a a vez esta adentro de buscarPorEmail
                               res.render('login', {invalido: true});   //si el resultado es undefined la vista de login se renderiza con el if de invalido: true
                            //    res.redirect('/login');
                           }else{
                               console.log('Objeto Usuario:');
                               console.log(resultado.dataValues);          
                               if(req.body.fromPage == 'misResenas'){        //      ????
        
                                res.redirect('/misResenas?id='+resultado.dataValues.id);
                                
                               }else{

                                res.render('index',{nombreCompleto:resultado.dataValues.nombreCompleto, logeado: true}); //?????
                               }
                               

                                ;
                              

                           }


                        }
                    );
        

        
    },
    registracion: function(req, res){
        res.render('registracion')                                // funcion que renderiza la vista de popular

    },
    chequearQueCoincidaMail: function (req, res) {           //estableces la funcion     
        moduloLogin.chequearUsuario(req.body.email)          //llamas a la funcion chequearUsuario del modulolgoin tomando como parametro req.body.mail
        .then(resultado => {
            // return res.send('El resultado es: ' + resultado)
            if (resultado) {
                
                moduloLogin.validar(req.body.email, req.body.clave)
                .then(function (usuario) {
                    if(usuario == false){                                      //????????????? post s boyd get es query
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

    usuarios:{               //   {} con funciones que pertenezcan a usuarios
        buscadorUsuarios: function(req, res) {
            res.render('buscadorUsuarios');           // funcion que renderiza la vista de buscador de usuarios
        },
        usuarioBuscado: function(req, res){
            DB.usuarios.findAll({             //Busca a todos los resultados en la carpeta usuarios en la database
                where:{
                [op.or]: {
                    email:{[op.like]: "%"+ req.body.buscadorUsuario +"%" } ,                 //los porcenatjes estan para que busque lo que esta adentro de ellos, el operador like permite que funcione los % como buscador ya q busca algo parecido. Tomando de base el req.body.usuario.
                    nombreCompleto:{[op.like]: "%"+ req.body.buscadorUsuario +"%" }          // el req.body.buscadorUsuario es lo q el usuario busco
                                                                                            // se esta buscando el email y el nombreCompleto

                }
            }})
            .then(function(resultado) {
                res.render('usuarioBuscado', {                 // funcion que renderiza la vista usuario buscado, incluye el contenido q busco el usuario, q seria user = resultado
                    users: resultado
                })
            })
            .catch(e => console.log(e))                // el catch es por si aparece un error
        },
            SearchById: function(req, res){        
                DB.usuarios.findByPk(req.params.id)   //    funcion search by id, buscas usuarios por su id
                .then(function(usuario){
                    DB.review.findAll({               // econtras todas (find all) las resenas de los usuarios
                        where: {             
                            idUser: usuario.id               // estableces que el id del usuario (q aparece en la base de datos) = el id del usuario (que esta en la vista)
                        }
                    })
                    .then(function(reviews){                  
                                                                // esta al pedo lo puedo borrar si quiero
                    })
                })
                
            },
            
            createUsuario: function(req,res){
                //return res.send(req.body)
                
                let passHash = bcryptjs.hashSync(req.body.passwordUsuario, 10)  // variable establece el hasheo o encriptacion de la contrasenia
            
                DB.usuarios.create({                           //funcion create, creas un usuario en la DB
                    nombreCompleto: req.body.nombreUsuario,
                    email:req.body.emailUsuario, 
                    password:passHash,                  
                    fechaNacimiento: req.body.fechaDeNacimientoUsuario,           //llamas al resto de las funciones, el password con la variable hash
                })
                .then(function (usuarioCreado) {
                    return res.redirect('/login')            //una vez creado te lleva al login
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
                console.log(results)                       // esta al pedo??????
                return results;
            })
        }
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
    detalles: function(req, res){             // funcion que renderiza la vista de detalles, de cada una  de las peliculas, ya q tienen id distintos
        res.render('detalles', {
            peliculaId: req.query.IdDePeliculas,
        })
    },
    buscador: function(req, res){
        res.render('buscador')                       // funcion que renderiza la vista de buscador
    },
    buscadorUsuarios: function(req, res){
                                                      // """""""""""""""""""" de buscadorUsuarios
        res.render('buscadorUsuarios')
    },
    usuarioBuscado: function(req, res){
                                                 // """""""""""""""""""" de UsuarioBuscado
        res.render('usuarioBuscado')
    },
    tiposdegeneros: function(req, res) {
        res.render('tiposdegeneros')                 // """""""""""""""""""" de tiposdeGeneros
    },



    userDetail: function(req, res) {
        DB.usuarios.findByPk(req.params.id)       //lo mismo que en usuario buscado
                .then(function(usuario){
                    DB.resenas.findAll({
                        where: {
                            usuarioId: usuario.id
                        }
                    })
                    .then(function(reviews){
                        res.render("userDetail", {       //acorde al id que estableces ahi arriba
                            usuario: usuario,
                            reviews: reviews                  //definis las dos tablas de donde saca la info, cada vez q haces un then tenes volver a establecer de donde sacas los datos (DB)
                        })
                    })
                })
    },
    actorDetail: function(req, res) {
        res.render('actoresdetalles')      // """""""""""""""""""" de Actoresdetalles
    },
    resenasMejores: function(req, res) {
        res.render('resenasMejores')         // """""""""""""""""""" de resenasMejores
    },
    resenasPeores: function(req, res) {
        res.render('resenasPeores')                // """""""""""""""""""" de resenasPeores
    },
    misResenas: function(req, res) {
        DB.usuarios.findByPk(req.query.id)      //busca un registo con la clave primaria del id
                .then(function(usuario){
                    DB.resenas.findAll({
                        where: {             // Es para agregarle una condicion a la funcion, en este caso es para q busque el id del usuario
                            usuarioId: usuario.id
                        }
                    })
                    .then(function(reviews){     //para que despues q buesque el id del usuario, podamos enviar una vista al navegador, para que la renderize en la vista mis resenas
                        res.render("misResenas", {   
                            usuario: usuario,
                            reviews: reviews
                        })
                    })
                })
    
    },
    editarResena: function(req,res){
        DB.resenas.findOne({             //el "find one" permite que busquemos resultados que coincidan con los atributos indiados en el objeto literal que recibe el metodo.
            where:{
                id:req.params.id            //El params agarra el valor para definir que hacer con ese valor
            }
        }).then(resena =>                   //hace la promesa con el then que nos permite ejecutar el codigo asincronico de forma efieiciente. Despues de que se busca el id, devuelve el resultado en la cista editar resena.
            res.render("editarResena",{         
                resena : resena

            })
            )
        
    },
    modificarResena: function (req,res){            // dentro de "editar resenas", la vista llama a este metodo.
        DB.resenas.update(                         // El "update" es un metodo que nos permite modificar registros en nuestra tabla de la base de datos.
            {                                           //Recibe dos parámetros, ambos objetos literales.

                textoResena:req.body.textoResena,    //El primero hay que decirle que campo de la tabla modificar y qué valor asignar. 

                puntaje:req.body.puntaje            //El segundo debe tener un where que indique de manera única a que registró aplicar los cambios.
            },{
                where:{
                    id:req.body.idResena
                }
            })

    },
    borrar: function(req, res) {
        console.log(req.params);
        DB.resenas.destroy({                    //El metodo destroy nos permite eliminar registros en nuestra tabla de la base de datos.
            where: {                           // recibe solo un parametro. Este sera un objeto con un where q tendra la condicion para eliminar lo q querramos.
                id : req.body.idResena
            }
        })
        .then(resultado => {
            DB.resenas.findAll({           
                where: {
                    usuarioId: req.body.idUsuario
                }
            })
            .then(function(reviews){
                DB.usuarios.findOne({
                    where: {                     
                        id: req.body.idUsuario
                    }
                })
                .then(function(user){
                    res.render("misResenas", {      // Luego de borrar cada dato la resena, te devuelve a la vista "misResenas" con los datos del usuario y sus reviews
                        usuario: user,
                        reviews: reviews
                    })
                })
                
                
            })
        })
        //res.redirect("/misResenas")
    },


}

