const passport = require('passport'),
          path = require('path'),
         chalk = require('chalk');

const download = (mLibreRoutes) => {
    mLibreRoutes.get('/download/:id', passport.authenticate('jwt', { session: false }),
    (req, res, next) => {

            req.session.descargas = req.session.descargas ? ++req.session.descargas : 1 ;
            console.log("Número de descargas del usuario:", req.session.descargas);
            //Al método .download le pasamos la dirección, el nombre del archivo, y una función para manejar el error
            res.download(path.join(__dirname,'../public','music', req.params.id), req.params.id, (err) => {
                if(err) {
                    console.error( 'Error de descarga', err );
                    res.status(400);
                    res.setHeader('Content-Type', 'text/html');
                    res.json({ error: 'Error' });
                    } else {
                                console.log( chalk.bold.green('Descarga realizada con éxito.') );
                                res.status(200);
                                res.setHeader('Content-Type', 'text/html');
                                res.json({ ok: 'Suceso' });
                };
        });
      });
    };

module.exports = download