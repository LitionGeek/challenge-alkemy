const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../index');
const Pelicula = require('../../database/models/Peliculas');

const Personaje = sequelize.define('personaje', {
    imagen: {
        type: DataTypes.STRING
    },
    nombre: {
        type: DataTypes.STRING,
        unique:{
            args:true,
            msg:"El nombre ya existe"
        },
        primaryKey:true,
        allowNull:false,
    },
    edad: {
        type: DataTypes.INTEGER
    },
    peso: {
        type: DataTypes.INTEGER
    },
    historia: {
        type: DataTypes.STRING
    },
    pelicula: {
        type:DataTypes.STRING,
    }
},{
    tableName: 'personaje',
    timestamps:false
})

module.exports = Personaje;