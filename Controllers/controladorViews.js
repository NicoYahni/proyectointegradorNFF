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
    actoresDetalles: function(req, res){
        res.send('Actores')
    },
    detalles: function(req, res){
        res.render('detalles')
    },
    buscador: function(req, res){
        res.render('buscador')
    },

}
