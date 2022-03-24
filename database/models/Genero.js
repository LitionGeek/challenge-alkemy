
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

const Genero = sequelize.define("genero",{
    imagen:{
        type:DataTypes.STRING
    }
    ,
    nombre: {
        type:DataTypes.STRING
    }
    ,
    fechaCreacion: {
        type:DataTypes.DATE
    }
    ,
    pelicula: {
        type:DataTypes.STRING,
        primaryKey: true
    }
},{
    tableName: 'genero'
})


module.exports = Genero;
