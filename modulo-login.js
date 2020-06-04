let db = require('./database/models')
let Usuario = db.usuarios;

let moduloLogin = {
    chequearUsuario: function (email) {
        return Usuario.findOne({
            where: {
                email: email
            }
        })
        .then(function(usuario) {
            return usuario != null;
        })
    },

    buscarPorEmail: function (email){
        return Usuario.findOne({
            where: {
                email:email
            }
        })
        .then(resultado=> {
            return resultado
        })
    },

    validar: function (email, pass) {
        return Usuario.findOne({
            where:{
                email:email,
                //password: pass
            },
        })
        .then(results=>{
            let check = bcrypt.compareSync (pass, results.password);
            if(check){
                return results;
            }
            else{
                return false
            }
        })
    }
}


module.exports = moduloLogin;