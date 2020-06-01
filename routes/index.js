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
router.get("/registracion", controller.registracion);
//router.post("/usuarios", controller.usuarios);
router.get("/detalles", controller.detalles);
router.get("/buscador", controller.buscador);
router.get("/buscadorUsuarios", controller.usuarios.buscadorUsuario);
router.get("/usuarioBuscado", controller.usuarios.usuarioBuscado);
router.get("/seriesDetail", controller.serieDetail);



// HTTP://localhost:3000/actoresdetalles


router.get('/actoresdetalles', controller.actoresDetalles);

module.exports = router;

// //bcrypt.hash(passwordUsuario, saltRounds, function(err, hash) {
//     const database = require('../database/models/usuarios');
//     db.Usuario.create({
//         nombre: req.body.nombreUsuario,
//         email:req.body.emailUsuario, 
//         Password:req.body.passwordUsuario,
// //         fechaDeNacimiento:fechaDeNacimientoUsuario,
//     });
    
// });
