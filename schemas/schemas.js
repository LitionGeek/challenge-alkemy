const joi = require('joi');


module.exports = {
    personajeSchema:joi.object({
        historia: joi.string()
            .allow('')
            .min(3)
            .optional()
            .max(50),
        peso: joi.number()
            .optional(),
        edad: joi.number()
        .optional(),
        nombre: joi.string()
                .required(),  
        imagen:joi.string()
            .allow(''),
        pelicula:joi.string()
            .allow('')
            .optional(),
    }),
    peliculaSchema:joi.object({
        titulo: joi.string()
            .min(3)
            .max(50)
            .required(),
        genero: joi.string()
            .allow(''),
        calificacion: joi.number(),
        nombrePersonaje: joi.string()
                .required(),  
        imagen:joi.string()
            .allow('')
    })
}