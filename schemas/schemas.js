const joi = require('joi');


module.exports = {
    peliculaSchema:joi.object({
        titulo: joi.string()
            .min(3)
            .max(50)
            .required(),
        genero: joi.string(),
        calificacion: joi.number(),
        personajeAsociado: joi.string(),
        nombre: joi.string(),
        imagen:joi.string()
    })
}