const express =require('express')
const User=require('../../models/Users')
const router=express.Router()
const jwt=require('jsonwebtoken')
const config=require('config')
const bcrypt=require('bcryptjs')
const {check,validationResult}=require('express-validator');

const auth=require('../../middleware/auth')
const { json } = require('body-parser')

//@route  GET api/auth
//@desc   Test route
//@acess  Public 
router.get('/',auth,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('-password');
        res.json(user)
        user.notifications=[]
        await user.save()
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');


    }
})


// --------------------login authentication--------------------------------

//@route  POST api/auth
//@desc   Authenticate user&get token 
//@access  Public 
router.post('/',
// validating input from user
[
    
    check('email',"Please include a valid Email").isEmail(),
    check('password',"Password is Required").exists()

],
async (req,res)=>{
     
   const errors=validationResult(req)
   if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
   }

   const {email,password}=req.body; //destructuring credential from request 
   try {

//seek for the user details
let user = await User.findOne({email})

if(!user){
 return res.status(400).json({errors:[{msg:'invalid Credential'}]})
} 

 const isMatch=await bcrypt.compare(password,user.password)

 if(!isMatch){
    return res.status(400).json({errors:[{msg:'invalid Credential'}]})
 }


//return jwt 
const payload={
    user:{
        id:user.id
    }
}

    jwt.sign(payload,config.get('jwtSecret'),{expiresIn:60000},
    (err,token)=>{
        if(err) throw err;
        res.json({token}); // sending back the jwt token 

    })
 


     
    
   } catch (err) {
    
    console.error(err.message)
    res.status(500).send('Server error')
   }

   
}
)


module.exports=router