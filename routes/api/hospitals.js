const express =require('express');
const auth=require('../../middleware/auth');
const {check,validationResult}=require('express-validator');
const Hospitals =require('../../models/Hospitals');
const router=express.Router();
const { json } = require('express');

 



//@route  GET api/hospitals/
//@desc   get current hospital
//@acess  private
router.get('/me',auth,async (req,res)=>{

    try {

        const hospital=await Hospitals.findOne({user:req.user.id}).populate('user',['avatar','name']);
        
        if(!hospital){
            return res.status(400).json({msg:'No hospital profile Found'})
        }

        res.json(hospital)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
        
    }
})



//@route  POST api/hospitals/
//@desc   create/update the hospital profile
//@acess  private

router.post('/',[auth,
check('location','Location is not found please provide the location').not().isEmpty(),
check('A_B_C','Available Blood Package is not found please provide the available blood package count').not().isEmpty()],
async (req,res)=>{

const errors=validationResult(req);

if(!errors.isEmpty()){ // checking for the errors 
    res.status(400).json({errors:errors.array()});
}

 
const {location,A_B_C,N_B_G,M_S_C}=req.body; // destructuring the req body


const hospitalProfile={};// create the hospital profile locally
hospitalProfile.user=req.user.id;
hospitalProfile.location=location;
hospitalProfile.A_B_C=A_B_C;
if(N_B_G)hospitalProfile.N_B_G=N_B_G;
if(M_S_C) hospitalProfile.M_S_C=M_S_C;


try {
    
    let hospital=await Hospitals.findOne({user:req.user.id});
    if(hospital){
      hospital=  await Hospitals.findOneAndUpdate({user:req.user.id},{$set:hospitalProfile},{new:true});
      return  res.json(hospital)
    }

    hospital=new Hospitals(hospitalProfile);
    await hospital.save();
    res.json(hospital)

} catch (err) {
    console.error(err.message);
    console.log("error here")
    res.status(500).send('server error');
    
}


})

module.exports=router