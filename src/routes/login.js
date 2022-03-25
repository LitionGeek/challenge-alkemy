const express = require('express');
const sequelize = require('../../database');
const Usuario = require('../../database/models/Usuario');
const enviarEmail = require('../../controllers/envioEmail');
const router = express.Router();
const {generarToken} = require('../../controllers/auth');

router.post('/register', async (req, res) => {
    let { email } = req.body;
    const [usuario, error] = await Usuario.findOrCreate({ where: { email: email } })
    console.log(error)
    if (error) {
        enviarEmail(email);
        return res.status(201).json({
            ok: true,
            msg: 'Usuario creado'
        });
    } else {
        return res.status(400).json({
            ok: false,
            msg: 'Email ya existe'
        });
    }
})

router.post('/login', async (req, res) => {
    const { email } = req.body;
    console.log("Login------")
    if (email) {
        const token = generarToken(email);
        const users = await Usuario.findOne({ where: { email } });
        if (users) {
            return res.status(200).json({
                accessToken: token
            })
        } else {
            return res.status(404).json({
                ok: false,
                error: 'El email no existe'
            })
        }

    }else{
        return res.status(404).json({
            ok: false,
            error: 'No ingreso un mail'
        })
    }
});

module.exports = router;