const Musica = require('../../models/musica');

const get = (mLibreRoutes) => {

                                        //Creando ruta /DB
mLibreRoutes.get('/db', async (req, res) => {
    
    try {
            const info = await Musica.findAll( {
                attributes: [ 'titulo', 'autor', 'genero', 'ruta', 'año' ]
            } );
                if(info) {
                    res.status(200);
                    res.setHeader('Content-Type', 'text/html');
                    res.json({ok: info});
                } else { 
                    res.status(400);
                    res.setHeader('Content-Type', 'text/html');
                    res.json({error: 'No hay información que mostrar'} );
                };   
        
    } catch (error) {
        console.error(error);
    }
});

}
module.exports = get