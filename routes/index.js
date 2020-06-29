var express = require('express');
var router = express.Router();


const controller = require('../Controllers/controladorViews')
    

router.get("/", controller.home);                             //Get es para solicitarle datos a la base de datos
router.get("/popular", controller.popular);
router.get("/upcoming", controller.upcoming);
router.get("/actors", controller.actors);
router.get("/generos", controller.generos);                                
router.get("/favoritos", controller.favoritos);
router.get("/login", controller.login);
router.post("/validarUsuarioPassword", controller.validarUsuarioPassword);              //Post es para subir "postear" a la base de datos
router.get("/registracion", controller.registracion);
router.post("/usuarios", controller.usuarios.createUsuario);
router.get("/detalles", controller.detalles);
router.get("/buscador", controller.buscador);
router.get("/buscadorUsuarios", controller.usuarios.buscadorUsuarios);
router.post("/usuarioBuscado", controller.usuarios.usuarioBuscado);
router.post("/detalles", controller.chequearQueCoincidaMail);
router.get("/tiposdegeneros", controller.tiposdegeneros);
router.get("/userDetail/:id", controller.userDetail);
router.get("/resenasMejores", controller.resenasMejores);
router.get("/resenasPeores", controller.resenasPeores);
router.get("/misResenas", controller.misResenas);
router.post("/misResenas/borrar", controller.borrar);
router.get("/misResenas/editar/:id", controller.editarResena);
router.post("/misResenas/modificarResena", controller.modificarResena);



// HTTP://localhost:3000/actoresdetalles


router.get('/actorDetail', controller.actorDetail);

module.exports = router;

