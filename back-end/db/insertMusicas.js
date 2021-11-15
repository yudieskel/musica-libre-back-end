//Para guardar en la DB solo desmarcar una vez y volver a marcar para que no se siga guardando n veces.
const Musica = require('../models/musica');

const insertMusicas = async (mLibreRoutes) => {
    
    // await Musica.bulkCreate([{
    //     titulo: 'Neverland',
    //     autor: 'Onycs',
    //     genero: 'Ambient',
    //     año: 2021,
    //     ruta: 'Neverland.mp3'
    //     },
    //     {
    //     titulo: 'Looking For More',
    //     autor: 'Koven',
    //     genero: 'Bass',
    //     año: 2021,
    //     ruta: 'Looking For More.mp3'
    //     },
    //     {
    //     titulo: 'Symphony',
    //     autor: 'Arc North (ft. Donna Tella)',
    //     genero: 'Chill',
    //     año: 2021,
    //     ruta: 'Symphony.mp3'
    //     },
    //     {
    //     titulo: 'GET AWAY',
    //     autor: 'tubebackr',
    //     genero: 'Dance & Electronic',
    //     año: 2021,
    //     ruta: 'GET AWAY.mp3'
    //     },
    //     {
    //     titulo: 'Bring Me The Light',
    //     autor: 'T & Sugah (ft. Mara Necia)',
    //     genero: 'Drum & Bass',
    //     año: 2021,
    //     ruta: 'Bring Me The Light.mp3'
    //     },
    //     {
    //     titulo: 'Waterfall',
    //     autor: 'ROY KNOX (ft. Ellen Louise)',
    //     genero: 'Drumstep',
    //     año: 2020,
    //     ruta: 'Waterfall.mp3'
    //     },
    //     {
    //     titulo: 'Only You',
    //     autor: 'ROY KNOX x Derpcat (ft. imallryt)',
    //     genero: 'Dubstep',
    //     año: 2021,
    //     ruta: 'Only You.mp3'
    //     },
    //     {
    //     titulo: 'Miles Away',
    //     autor: 'Triosounds - An Introvert on Earth',
    //     genero: 'EDM',
    //     año: 2020,
    //     ruta: 'Miles Away.mp3'
    //     },
    //     {
    //     titulo: 'Daylight',
    //     autor: 'Heuse & WOLFHOWL & Riell',
    //     genero: 'Electronic',
    //     año: 2020,
    //     ruta: 'Daylight.mp3'
    //     },
    //     {
    //     titulo: 'Into The Light',
    //     autor: 'Raptures & Jeonghyeon',
    //     genero: 'Future House',
    //     año: 2021,
    //     ruta: 'Into The Light.mp3'
    //     },
    //     {
    //     titulo: 'Stay Or Be Alone',
    //     autor: 'QUB3, Quickdrop & B0UNC3',
    //     genero: 'Hardstyle',
    //     año: 2021,
    //     ruta: 'Stay Or Be Alone.mp3'
    //     },
    //     {
    //     titulo: 'Evolution',
    //     autor: 'Clarx, Debris, 3rd Prototype, Castion, EMDI (ft. Harley Bird)',
    //     genero: 'House',
    //     año: 2021,
    //     ruta: 'Evolution.mp3'
    //     },
    //     {
    //     titulo: 'Phoenix',
    //     autor: 'Netrum & Halvorsen',
    //     genero: 'Indie',
    //     año: 2021,
    //     ruta: 'Phoenix.mp3'
    //     },
    //     {
    //     titulo: 'Breakdown',
    //     autor: 'Xaia & Rain Man & Oly',
    //     genero: 'Melodic Dubstep',
    //     año: 2020,
    //     ruta: 'Breakdown.mp3'
    //     },
    //     {
    //     titulo: 'Lose This',
    //     autor: 'Dylan Emmet',
    //     genero: 'Pop',
    //     año: 2020,
    //     ruta: 'Lose This.mp3'
    //     },
    //     {
    //     titulo: 'Jetfire',
    //     autor: 'Jeff II',
    //     genero: 'Rock',
    //     año: 2020,
    //     ruta: 'Jetfire.mp3'
    //     },
    //     {
    //     titulo: 'Elevate',
    //     autor: 'Fabian Mazur & Arcando',
    //     genero: 'Trap',
    //     año: 2021,
    //     ruta: 'Elevate.mp3'}
    //     ]);
};

module.exports = insertMusicas