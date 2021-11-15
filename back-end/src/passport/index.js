//Configuración general de passport
const passport = require('passport'),
         chalk = require('chalk'),
       Usuario = require('../../models/usuario');

const passportConfig = (app) => {
    
    app.use( passport.initialize() );
    app.use( passport.session() );

    //Serialización (user viene de la estrategia local)
    passport.serializeUser( (user, done) => {
        done(null, user.id);  
    } );
    //Desserialización (id viene de serializeUser)
    passport.deserializeUser( async (id, done) => {

        try {
            const usuarioDeserializado = await Usuario.findOne({
                attributes: [ 'id', 'nombre', 'correo', 'clave', 'rol' ],
                where: {
                    id
                }
            });
            const { dataValues } = usuarioDeserializado;
        
            done(null, dataValues); 

        } catch (error) {
            console.error(error);
        }    
    } );

    require('./local')(app);
    require('./jwt')(app);

};

module.exports = passportConfig;

