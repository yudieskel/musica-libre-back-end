const passport = require('passport'),
           jwt = require('jsonwebtoken'),
        bcrypt = require('bcryptjs'),
        crypto = require('crypto'),
        config = require('config'),
         chalk = require('chalk'),
      Contacto = require('../../models/contacto'),
       Usuario = require('../../models/usuario'),
     transport = require('../mail/mailer');

const post = (mLibreRoutes) => {
                                        //POST contacto
mLibreRoutes.post('/contacto', async (req, res) => {

    try {
        const {nombre, direccion, correo, mensaje} = req.body;

        //Validar que el mensaje no esté vacío y almacenar en BD
        if(mensaje) {

            await Contacto.create({
                nombre, 
                dirección: direccion,
                correo
              }); 

            console.log( chalk.bold.green('El contacto fue almacenado en la BD') );
            res.status(200);
            res.setHeader('Content-Type', 'text/html');
            res.json({ ok: 'Suceso' });
        } else {
            res.status(400);
            res.setHeader('Content-Type', 'text/html');
            res.json({ error: 'Error' });
        };
        //Enviar mensaje de contacto a mi correo
        const message = {
            from: correo,
            to: 'yudieskel@gmail.com',
            subject: 'Nuevo Contacto en Música Libre',
            text: mensaje,
            html: mensaje
        };
        await transport.sendMail(message, (err) => {
            if(err) {
                console.error( chalk.bold.red('Error enviando email...') )
            } else {
                console.log( chalk.bold.green('Email de contacto enviado.') )
            }
        });

    } catch (error) {
        console.error(error);
    }
});
                                            //POST /signup
mLibreRoutes.post('/signup', async (req, res) => {

    try {
        let {nombre, correo, clave1, clave2} = req.body;
    
        //Validar que las claves coincidan
        if(clave1 === clave2) {
            bcrypt.genSalt(10)
                .then( salt => { bcrypt.hash( clave1, salt)
                .then( async hash => { clave1 = hash;
                    
                    //Antes de almacenar hay que ver si no existe el usuario
                    const buscarUsuario = await Usuario.findOne( {
                        where: {
                            correo
                        }
                    } );
                    if(buscarUsuario) {
                        res.setHeader('Content-Type', 'text/html');
                        res.json({ error: 'Error! El usuario ya EXISTE!' });
                    } else {
                        //Almacenar en BD
                    await Usuario.create({
                        nombre, 
                        correo,
                        clave: clave1
                    }); 

                    console.log( chalk.bold.green('La información del nuevo usuario fue almacenado en la BD') );
                    res.status(200);
                    res.setHeader('Content-Type', 'text/html');
                    res.json({ ok: 'Suceso en el registro' });
                    }
                    });
                }).catch( err => next(err) );
        }
        else {
            res.status(400);
            res.setHeader('Content-Type', 'text/html');
            res.json({ error: 'Error! Claves diferentes' });
        };
    } catch (error) {
        console.error(error);
    }  
});
                                            //POST /login

//Usamos passport para autenticar
mLibreRoutes.post('/login', (req, res, next) => {
    passport.authenticate ('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { return res.json("No existe el usuario"); }
            req.logIn( user, (err) => {
                if (err) { return next(err); }
                const { nombre } = req.user;
                //Generar un token con jsonwebtoken (TOKEN para poder descargar música)
                const token = jwt.sign({ user: nombre }, config.get('secret'));
                return res.json({ ok: token });
            });
    }) (req, res, next);
});
                                            //POST /forgot_password
mLibreRoutes.post('/forgot_password', async (req, res) => {
    const { email } = req.body;
    try {
        //Antes de enviar token hay que ver si existe el usuario (TOKEN para recuperar clave)
        const buscarUsuario = await Usuario.findOne( {
            where: {
                correo: email
            }
        } );
        if(!buscarUsuario) {
            res.setHeader('Content-Type', 'text/html');
            res.json({ error: 'Error! El usuario no EXISTE!' });
        } else {
        //Generar token y fecha de duración
        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() + 1);
        const fecha = JSON.stringify(now); //no puedo guardar directamente now en DB porque dice que es un objeto
        //Actualizamos en Usuarios
        await Usuario.update({token, expiracion: fecha}, {
            where: {
                correo: email
            }
          });
          //Enviar e-mail con token al usuario
        const message = {
            from: 'musicasinderechoautoral@gmail.com',
            to: email,
            subject: 'Recuperación de Clave',
            text: `Para recuperar su clave utilice el TOKEN: ${token}`,
            html: `Para recuperar su clave utilice el TOKEN: ${token}`,
        };
        await transport.sendMail(message, (err) => {
            if(err) {
                console.error( chalk.bold.red('Error enviando email...') )
            } else {
                console.log( chalk.bold.green('Email con TOKEN enviado.') )
            }
        });
        res.status(200);
        res.setHeader('Content-Type', 'text/html');
        res.json({ ok: 'Token enviado al Usuario' });
        }
    } catch (err) {
        console.error('Error', err);
    }

});
                                                    //POST /reset_password
  mLibreRoutes.post('/reset_password', async (req, res) => {
    try {
        let {correo, token, clave} = req.body;

        //Verificar si existe el usuario
        const buscarUsuario = await Usuario.findOne( {
            attributes: [ 'correo', 'clave', 'token', 'expiracion' ],
            where: {
                correo
            }
        } );
        if(!buscarUsuario) {
            res.setHeader('Content-Type', 'text/html');
            res.json({ error: 'Error! El usuario no EXISTE!' });
        } else {
            //Verificar los tokens
            if (token !== buscarUsuario.token) {
                res.setHeader('Content-Type', 'text/html');
                res.json({ error: 'Error! No coinciden los TOKENs!' });
            } else {
                //Verificar expiración de token
                const now = new Date();
                const fecha = JSON.stringify(now);
                if (fecha > buscarUsuario.expiracion) {
                    res.setHeader('Content-Type', 'text/html');
                    res.json({ error: 'Error! TOKEN expirado!' });
                } else {
                    bcrypt.genSalt(10)
                    .then( salt => { bcrypt.hash( clave, salt)
                    .then( async hash => { clave = hash;
                    //Actualizamos clave de Usuario
                    await Usuario.update({clave}, {
                        where: {
                            correo
                        }
                    });
                    console.log( chalk.bold.green('La clave fue actualizada') );
                    res.status(200);
                    res.setHeader('Content-Type', 'text/html');
                    res.json({ ok: 'La clave fue actualizada' });
                   
                    });
                    }).catch( err => next(err) );  
                }  
            }
        };
    } catch (error) {
        console.error(error);
    }  
});

};
module.exports = post