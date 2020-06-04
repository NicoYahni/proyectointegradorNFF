let db = require ('..database/models/index');
let moduloLogin = require('../modulo-login');

const funciones = {
    home: function (req, res) {
        res.render('home')
    },
    chequearQueCoincidaMail: function (req, res) {
        moduloLogin.chequearUsuario (req.body.emailresena)
        .then(resultado => {
            if (resultado) {
                moduloLogin.validar(req.body.emailresena, req.body.contrasenaresena)
                if(resultado == false){
                    console.log('No existe')

                }
                else{
                    DB.Resena.create({
                        peliculaId: req.query.idmovie,
                        textoResena:req.body.resenanueva, 
                        puntaje:req.body.puntaje,
                        usuarioId:resultado.id,
                    })
                    res.redirect('home/detalle/?idmovie=' + req.query.idmovie)
                }
            }
        })
    }
}

module.exports = funciones