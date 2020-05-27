var express = require('express');
var router = express.Router();

const controller = require('../Controllers/controladorViews')
    

router.get("/", controller.home);
router.get("/popular", controller.popular);
router.get("/upcoming", controller.upcoming);
router.get("/actors", controller.actors);
router.get("/generos", controller.generos);
router.get("/favoritos", controller.favoritos);
router.get("/login", controller.login);
router.get("/detalles", controller.detalles);
router.get("/buscador", controller.buscador);


// HTTP://localhost:3000/actoresdetalles


router.get('/actoresdetalles', controller.actoresDetalles);

module.exports = router;
