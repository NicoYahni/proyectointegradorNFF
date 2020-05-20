var express = require('express');
var router = express.Router();

const controller = require('../Controllers/controladorViews')
    

router.get("/", controller.home);
router.get("/detalles", controller.detalles);


// HTTP://localhost:3000/actoresdetalles


router.get('/actoresdetalles', controller.actoresdetalles);

router.get("/actors", function(){
    return view('actors');
});

router.get("/buscador", function(){
    return view('buscador');
});

router.get("/detalles", function(){
    return view('detalles');
});

router.get("/error", function(){
    return view('error');
});

router.get("/favoritos", function(){
    return view('favoritos');
});

router.get("/generos", function(){
    return view('generos');
});

router.get("/index", function(){
    return view('index');
});

router.get("/login", function(){
    return view('login');
});     

router.get("/nuevo", function(){
    return view('nuevo');
});

router.get("/popular", function(){
    return view('popular');
});

router.get("/tiposdegeneros", function(){
    return view('tiposdegeneros');
});

router.get("/upcoming", function(){
    return view('upcoming');
});

module.exports = router;
