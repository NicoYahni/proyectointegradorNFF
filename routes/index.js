var express = require('express');
var router = express.Router();
//const bcrypt = require('bcrypt');
//const saltRounds = 10;

const controller = require('../Controllers/controladorViews')
    

router.get("/", controller.home);
router.get("/popular", controller.popular);
router.get("/upcoming", controller.upcoming);
router.get("/actors", controller.actors);
router.get("/generos", controller.generos);
router.get("/favoritos", controller.favoritos);
router.get("/login", controller.login);
router.post("/validarUsuarioPassword", controller.validarUsuarioPassword);
router.get("/registracion", controller.registracion);
router.post("/usuarios", controller.usuarios.createUsuario);
router.get("/detalles", controller.detalles);
router.get("/buscador", controller.buscador);
router.get("/buscadorUsuarios", controller.usuarios.buscadorUsuarios);
router.post("/usuarioBuscado", controller.usuarios.usuarioBuscado);
router.get("/seriesDetail", controller.serieDetail);                                 
router.get("/tiposdegeneros", controller.tiposdegeneros)
router.get("/userDetail/:id", controller.userDetail)



// HTTP://localhost:3000/actoresdetalles


router.get('/actoresdetalles', controller.actoresDetalles);

module.exports = router;

