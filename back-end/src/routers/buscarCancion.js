const Musica = require('../../models/musica'), 
      { Op } = require("sequelize"),
       chalk = require('chalk');
      

const buscarCancion = (mLibreRoutes) => {
                                        //POST buscar por: Título
mLibreRoutes.post('/titulo', async (req, res) => {
    try {
        const { titulo } = req.body;
        //Validar 
        if(titulo) {
            const query = `%${titulo}`;
        
            const info = await Musica.findAll( {
                attributes: [ 'titulo', 'autor', 'genero', 'ruta', 'año' ],
                where: {
                   titulo: { 
                    [Op.or]: {
                             [Op.substring]: titulo,
                             [Op.iLike]: query
                   }}
                }
            } );
                if(info) {
                    console.log( chalk.bold.green('Resultado de la búsqueda por título:'), info );
                    res.status(200);
                    res.setHeader('Content-Type', 'text/html');
                    res.json({ok: info});
                } else { 
                    console.log( chalk.bold.red('No se encontró resultado para título:', titulo) );
                    res.status(400);
                    res.setHeader('Content-Type', 'text/html');
                    res.json({error: 'No se encontró resultado para ese título'} );
                };   
        } else {
            res.status(400);
            res.setHeader('Content-Type', 'text/html');
            res.json({error: 'Parámetro título sin valor'} );
            return
        };
    } catch (error) {
        console.error(error);
    }
});
                                            //POST buscar por: Artista
mLibreRoutes.post('/artista', async (req, res) => {
    try {
        const { artista } = req.body;
        //Validar 
        if(artista) {
            const query = `%${artista}`;
            const info = await Musica.findAll( {
                attributes: [ 'titulo', 'autor', 'genero', 'ruta', 'año' ],
                where: {
                   autor: { [Op.or]: {
                    [Op.substring]: artista,
                    [Op.iLike]: query
                    }}
                } 
            });
                if(info) {
                    console.log( chalk.bold.green('Resultado de la búsqueda por artista:'), info );
                    res.status(200);
                    res.setHeader('Content-Type', 'text/html');
                    res.json({ok: info});
                } else { 
                    console.log( chalk.bold.red('No se encontró resultado para artista:', artista) );
                    res.status(400);
                    res.setHeader('Content-Type', 'text/html');
                    res.json( {error: 'No se encontró resultado para ese artista'} );
                };   
        } else {
            res.status(400);
            res.setHeader('Content-Type', 'text/html');
            res.json({error: 'Parámetro artista sin valor'} );
            return
        };
    } catch (error) {
        console.error(error);
    }
});
                                            //POST buscar por: Género

mLibreRoutes.post('/genero', async (req, res) => {
    try {
        const { genero } = req.body;
        //Validar 
        if(genero) {
            const query = `%${genero}`;
            const info = await Musica.findAll( {
                attributes: [ 'titulo', 'autor', 'genero', 'ruta', 'año' ],
                where: {
                   genero: { [Op.iLike]: query }
                }
            } );
                if(info) {
                    console.log( chalk.bold.green('Resultado de la búsqueda por género:'), info );
                    res.status(200);
                    res.setHeader('Content-Type', 'text/html');
                    res.json({ok: info});
                } else { 
                    console.log( chalk.bold.red('No se encontró resultado para el género:', genero) );
                    res.status(400);
                    res.setHeader('Content-Type', 'text/html');
                    res.json({error: 'No se encontró resultado para ese género'} );
                };   
        } else {
            res.status(400);
            res.setHeader('Content-Type', 'text/html');
            res.json({error: 'Parámetro género sin valor'} );
            return
        };
    } catch (error) {
        console.error(error);
    }
});
                                            //POST buscar por: Año
 mLibreRoutes.post('/anho', async (req, res) => {
    try {
        const { año } = req.body;
        //Validar 
        if(año) {
            const query = `%${año}`;
            const info = await Musica.findAll( {
                attributes: [ 'titulo', 'autor', 'genero', 'ruta', 'año' ],
                where: {
                   año: { [Op.iLike]: query }
                }
            } );
                if(info) {
                    console.log( chalk.bold.green('Resultado de la búsqueda por año:'), info );
                    res.status(200);
                    res.setHeader('Content-Type', 'text/html');
                    res.json({ok: info});
                } else { 
                    console.log( chalk.bold.red('No se encontró resultado para el año:', año) );
                    res.status(400);
                    res.setHeader('Content-Type', 'text/html');
                    res.json({error: 'No se encontró resultado para ese año'} );
                };   
        } else {
            res.status(400);
            res.setHeader('Content-Type', 'text/html');
            res.json({error: 'Parámetro año sin valor'} );
            return
        };
    } catch (error) {
        console.error(error);
    }
});

};

module.exports = buscarCancion