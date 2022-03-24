const Pelicula = require('../database/models/Peliculas');
const Personaje = require('../database/models/Personajes');

Pelicula.belongsTo(Personaje,{ 
    foreignKey:"nombrePersonaje"
})
Personaje.hasMany(Pelicula,{
    foreignKey:"nombrePersonaje"
})
