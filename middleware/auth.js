const jwt=require('jsonwebtoken')

const config=require('config')


module.exports=function (req,res,next){
    // get jwt from header

    const token=req.header('x-auth-token');

    //check for token
    if(!token){
        return res.status(401).json({msg:'No token,authorization denied'});
    }


    //verify
    try{
    const decoded =jwt.verify(token,config.get('jwtSecret'))

    req.user=decoded.user

    next()
    }catch(err){
        res.status(401).json({msg:'Token is not valid'})

    }
}