let db = require('./database/models')
let bcrypt = require ('bcryptjs')

let moduloLogin = {
    chequearUsuario: function (email) {
        return db.usuarios.findOne({
            where: {
                email: email
            }
        })
        .then(function(usuario) {
            return usuario != null;
        })    
},

buscarPorEmail: function (email){
    return db.usuarios.findOne({
        where: {
            email:email
        }
    })
    .then(resultado=> {
        return resultado
    })
},

validar: function (email, pass) {
    return db.usuarios.findOne({
        where:{
            email:email,
            //password: pass
        },
    })
    .then(results=>{
        if (results != null){
            console.log(results);
            let chequeo = bcrypt.compareSync(pass, results.password)
            if (chequeo) {
                return results;       
             }else {
                 return undefined
             }
           
        }else{
            return undefined
        }
    
        })
    }
}

module.exports = moduloLogin;