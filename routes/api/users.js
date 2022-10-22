const express =require('express')
const router=express.Router()
const gravatar=require('gravatar')
const bcrypt=require('bcryptjs')
const config=require('config')
const jwt=require('jsonwebtoken')
const {check,validationResult}=require('express-validator');


const User=require('../../models/Users')



//@route  POST api/users
//@desc   Register user
//@access  Public 
router.post('/',
// validating input from user
[
    check('name',"Name is required").not().isEmpty(),
    check('email',"Please include a valid Email").isEmail(),
    check('password',"please enter a password with 8 characted").isLength({min:8})

],
async (req,res)=>{
     
   const errors=validationResult(req)
   if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
   }

   const {name,email,password}=req.body; //destructuring credential from request 
   try {

//seek for the user details
let user = await User.findOne({email})

if(user){
 return res.status(400).json({errors:[{msg:'User already exits'}]})
} 

//get user 
const avatar=gravatar.url(email,{
    s:'20',
    r:'pg',
    d:'mm'
})

user=new User({name,email,avatar,password});//create user model

//password encrypt 
const salt =await bcrypt.genSalt(10);
user.password=await bcrypt.hash(password,salt);

await user.save()

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