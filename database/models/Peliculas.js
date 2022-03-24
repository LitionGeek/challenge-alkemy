const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../index');
const Personaje = require('../../database/models/Personajes');

const Pelicula = sequelize.define("pelicula",{
    imagen:{
        type:DataTypes.STRING
    }
    ,
    titulo: {
        type:DataTypes.STRING,
        unique:{
            args:true,
            msg:"La pelicula ya existe"
        } 
    }
    ,
    fechaCreacion: {
        type:DataTypes.DATE
    },
    genero: {
        type:DataTypes.STRING
    },
    calificacion: {
        type:DataTypes.INTEGER,
        validate:{
           max:{
               args:5,
               msg:"El valor excede del permitido"
           },
           min:{
               args:1,
               msg:"El valor es menos del permitido"
           }
        }
    }
},{
    tableName: 'pelicula',
    timestamps:false
})


module.exports = Pelicula;
