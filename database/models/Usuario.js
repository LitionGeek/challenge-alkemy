const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../index');


const Usuarios = sequelize.define('usuario', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
            args:true,
            msg:'El email debe ser unico'
        },
        validate:{
            isEmail:{
                msg:'El email ingresado no es valido'
            },
            notEmpty:{
                msg:'Debe ingresar un email'
            }
        }
    }
}, {
    tableName: 'usuario'
})

module.exports = Usuarios;