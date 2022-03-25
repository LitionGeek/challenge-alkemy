const jwt = require('jsonwebtoken');
require("dotenv").config();

function generarToken(email){
    return jwt.sign({email},process.env.SECRET_KEY,{expiresIn:'1h'})
}

function validarToken(req,res,next){
    const authHeader = req.headers['authorization'];
    if(authHeader!=null){
        const accessToken = authHeader.split(' ')[1];
        jwt.verify(accessToken,process.env.SECRET_KEY,(err,user)=>{
            if(err){
                return res.status(403).json({
                    ok:false,
                    msg:"Token incorrecto"
                });
            }else{
                console.log('Token valido')
                next();
            }
        })
    }else{
        return res.status(401).json('Fail to accessToken');
    }
}

module.exports = {
    generarToken,
    validarToken
}