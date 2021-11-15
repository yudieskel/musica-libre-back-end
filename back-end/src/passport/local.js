//Configuración Estrategia Local de Passport
const  bcrypt = require('bcryptjs'),
        chalk = require('chalk'),
     passport = require('passport'),
      Usuario = require('../../models/usuario'),
passportStrat = require('passport-local').Strategy;

const localConfig = (app) => { passport.use( new passportStrat( {
        usernameField: 'email',
        passwordField: 'password'
            }, async (email, password, done) => {
         
        try {
            const user = await Usuario.findOne({
                attributes: [ 'id', 'nombre', 'correo', 'clave', 'rol' ],
                where: {
                    correo: email
                }
            });
            //Primera validación (Existe ese usuario?)
            if( user ) {
                const { dataValues } = user;
                const { clave } = dataValues;
        
                    let compare = bcrypt.compareSync(password, clave);
                    if(compare) {
                        console.log(`Se logeo con email: ${ chalk.bold.green(email) } y clave: ${ chalk.bold.blue(clave) }`);
                        return done( null, user );
                        //
                    } else {
                        //Hay usuario registrado; pero su clave está incorrecta
                        console.log( chalk.bold.red('Clave INCORRECTA!') ); 
                        return done( null, false );
                    };   
            } else {
                //Aunque no hubo ningún error, tampoco se encontró ese usuario
                console.log( chalk.bold.red('Usuario no EXISTENTE!') );
                return done( null, false );
            };
        } catch (error) {
            console.error(error);
        };   
    }));
};

module.exports = localConfig
