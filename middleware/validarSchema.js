module.exports = (schema)=>{
    return async(req,res,next)=>{
        try{
            await schema.validateAsync(req.body);
            next();
        }catch(error){
            res.status(400).json({
                error:"El campo "+error.details[0].path[0]+" es obligatorio"
            })
        }
    }
}