const express = require('express');
const Pelicula = require('../../database/models/Peliculas');
const Personaje = require('../../database/models/Personajes');
const router = express.Router();
const { peliculaSchema } = require('../../schemas/schemas');
const validarSchema = require('../../middleware/validarSchema');
const moment = require('moment');
const { validarToken } = require('../../controllers/auth');


/* Trea todas las peliculas con los datos del personaje */
router.get('/listmovies',validarToken, async (req, res) => {
    const peliculas = Pelicula.findAll({
        include: {
            model: Personaje,
            attributes: ['imagen', 'nombre', 'peso', 'historia']
        }
    })
        .then(peliculas => {
            return res.status(200).json({
                peliculas
            });
        }).catch(error => {
            return res.status(400).json({
                ok: false,
                error
            })
        })
})

/* Muestra un resultado segun el query params */
router.get('/movies',validarToken, async (req, res) => {
    const { genero,order,nombre } = req.query; 
    const filtro = buscarPorQueryParams(req.query)
    const pelicula = await Pelicula.findAll(filtro); 
    if(pelicula){
        return res.status(200).json({
            ok:true,
            pelicula
        });
    }else{
        return res.status(400).json({
            ok:false,
            msg:"ERROR. No existe pelicula con ese nombre"
        });
    }
})

/*Crear una nueva peliucula */
router.post('/movie',validarToken, validarSchema(peliculaSchema), async (req, res) => {
    const objPelicula = armarObj(req.body)
    const condicion = { where: { titulo:req.body.titulo } };
    options = { multi: false };
    const pelicula = await Pelicula.create(objPelicula, condicion, options)
        .then(pelicula => {
            return res.status(201).json({
                ok: true,
                msg: "Pelicula creada",
                pelicula
            })
        }).catch(error => {
            return res.status(400).json({
                ok: false,
                msg: error
            })
        })

})

/*Delete Personaje*/
router.delete('/movie',validarToken, async (req, res) => {
    const { titulo } = req.body;
    const pelicula = await Pelicula.destroy({
        where: { titulo }
    });
    if (pelicula) {
        return res.status(200).json({
            ok: true,
            msg: 'Personaje eliminado'
        })
    } else {
        return res.status(404).json({
            ok: false,
            msg: 'Personaje no encontrado'
        })
    }
})

/*Editar pelicula */
router.put('/movie/:titulo',validarToken, async (req, res) => {
    const objPelicula = armarObj(req.body)
    const condicion = { where: { titulo:req.body.titulo } };
    options = { multi: false };
    const personajeResult = await Pelicula.update(objPelicula, condicion, options)
        .then(personaje => {
            return res.status(200).json({
                ok: true,
                msg: 'Personaje editado'
            })
        }).catch(error => {
            return res.status(400).json({
                ok: false,
                msg: "Error al crear la pelicula"
            })
        })
})

/*Crear un nuevo objeto */
function armarObj({ imagen, titulo, calificacion, genero, nombrePersonaje }){
    const fechaActual = moment().format('L'); 
    const objPelicula = {
        imagen,
        titulo,
        calificacion,
        fechaCreacion:fechaActual,
        genero,
        nombrePersonaje
    };
    console.log(nombrePersonaje)
    return objPelicula;
}

function buscarPorQueryParams(params){
    const { genero,order,name } = params;
    let filtro;
    if(genero){
        filtro = {where:{genero}};
    }else{
        if(nombre){
            filtro = {where:{nombrePersonaje:name}};
        }else{
            filtro = {order:[["fechaCreacion",order]]}
        }
    }
    return filtro;
}

module.exports = router;