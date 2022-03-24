const express = require('express');
const sequelize = require('../../database');
const Peliculas = require('../../database/models/Peliculas');
const Personajes = require('../../database/models/Personajes');
/* const pool = require('../database'); */
const router = express.Router();



/* router.get('/peliculas',async(req,res)=>{
   
    const peliculas = await sequelize.query('select * from peliculas inner join personajes where peliculas.personajes = personajes.pelicula',);
    res.status(200).json({
        peliculas:peliculas
    });
})

router.post('/peliculas',async(req,res)=>{
    const {imagen,nombre,edad,peso,historia,pelicula} = req.body;
    console.log(imagen,nombre,edad,peso,historia,pelicula);
     const objPelicula = {
        imagen,
        nombre,
        edad,
        peso,
        historia,
        pelicula
    }; 
    const peli = await Peliculas.create({
        imagen:"dasdas",
        titulo:"asdsa",
        fechaCreacion:"dsadsa",
        calificacion:11,
        personajes:"dasdsa"
    });

})

 */

module.exports = router;