//Requerimos express, solo Router usando destructuring
const { Router } = require('express'),
          Usuario = require('../../models/usuario'),
          Musica = require('../../models/musica'),
          Contacto = require('../../models/contacto');

    //Usar Middleware
    const mLibreRoutes = Router();

    //Rutas GET    
    require('./get')(mLibreRoutes);
    
    //Rutas POST    
    require('./post')(mLibreRoutes);

    //Ruta descargar   
    require('./download')(mLibreRoutes);
    
    //Ruta buscar
    require('./buscarCancion')(mLibreRoutes);

    //Insertar música en BD
    require('../../db/insertMusicas')(mLibreRoutes);
    

module.exports = mLibreRoutes