const jwt = require('jsonwebtoken');
require("dotenv").config();

function generarToken(email){
    return jwt.sign({email},process.env.SECRET_KEY,{expiresIn:'1h'})
}

function validarToken(req,res,next){
    const authHeader = req.headers['authorization'];
    console.log(!authHeader==null)
    if(authHeader!=null){
        console.log('accesstoken')
        const accessToken = authHeader.split(' ')[1];
        jwt.verify(accessToken,process.env.SECRET_KEY,(err,user)=>{
            if(err){
                console.log("error")
                return res.status(403).json({
                    err
                });
            }else{
                console.log('Else')
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