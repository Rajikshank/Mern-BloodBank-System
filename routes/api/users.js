const express =require('express')
const router=express.Router()
const {check,validationResult}=require('express-validator');

//@route  POST api/users
//@desc   Register user
//@access  Public 
router.post('/',[
    check('name',"Name is required").not().isEmpty(),
    check('email',"Please include a valid Email").isEmail(),
    check('password',"please enter a password with 8 characted").isLength({min:8})

],(req,res)=>{
     
   const errors=validationResult(req)
   if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
   }
    res.send('User Page')})


module.exports=router