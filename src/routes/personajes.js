const express = require('express');
const Pelicula = require('../../database/models/Peliculas');
const Personaje = require('../../database/models/Personajes');
const router = express.Router();
const {validarToken} = require('../../controllers/auth');
const validarSchema = require('../../middleware/validarSchema');
const { personajeSchema } = require('../../schemas/schemas');


/*Obtener Personaje*/
router.get('/characters',validarToken,async(req,res)=>{
   
    const personaje = await Personaje.findAll({
        attributes:['imagen','nombre'],
        include:[Pelicula]
    });

    res.status(200).json({
        personaje
    });
})



/*Crear Personaje*/
router.post('/personaje',validarSchema(personajeSchema),validarToken,async(req,res)=>{
    const personajeObj = armarObj(req.body);
    if(personajeObj){
        await Personaje.create(personajeObj)
        .then(personaje=>{
            return res.status(201).json({
                ok:true,
                msg:'Usuario creado'
            })
        }).catch(error=>{
            return res.status(400).json({
                ok:false,
                msg:"error"
            })
        });
    }else{
        return res.status(400).json({
            ok:false,
            msg:"ERROR. Los datos ingresados no son validos"
        })
    }
  
})

/*Delete Personaje*/
router.delete('/personaje',validarToken,async(req,res)=>{
    const {nombre} = req.body;
    const personaje = await Personaje.destroy({
        where:{
            nombre
        }
    });
    if(personaje>0){
        return res.status(200).json({
            ok:true,
            msg:'Personaje eliminado'
        })
    }else{
        return res.status(404).json({
            ok:false,
            msg:'Personaje no encontrado'
        })
    }
})

/*Editar personaje*/
router.put('/personaje/:nombrereq',validarToken,async(req,res)=>{
    const personajeObj = armarObj(req.body);
    const {nombrereq} = req.params;
    if(personajeObj){
        const condicion = {where:{ nombre:nombrereq}};
        options = { multi: false };
        await Personaje.update(personajeObj,condicion,options)
        .then(personaje=>{
            return res.status(200).json({
                ok:true,
                msg:'Personaje editado'
            })
        }).catch(error=>{
            return res.status(404).json({
                ok:false,
                msg:error
            })
        })
    }else{
        return res.status(400).json({
            ok:false,
            msg:"ERROR. Los datos ingresados no son validos"
        })
    }
})


function armarObj({imagen,nombre,edad,peso,historia,pelicula }){
    const objPelicula = {
        imagen,
        nombre,
        edad,
        peso,
        historia,
        pelicula
    };
    return objPelicula;
}


module.exports = router;