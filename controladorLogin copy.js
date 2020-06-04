let db = require('../database/models')

let moduleLogin = {
    chequearUsuario: function (email) {
        let usuario =  db.usuarios.findOne({
            where: {
                email: email
            }
        })
        .then(results=>{
            // console.log(results);

            return true;
        }   
        );
        
        return false;
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
            password: pass
        },
    })
    .then(results=>{
        console.log(results)
        return results;
    })
    }
}

module.exports = moduleLogin;