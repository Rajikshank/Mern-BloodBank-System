const express =require('express');
const auth=require('../../middleware/auth');
const {check,validationResult}=require('express-validator');
const Hospitals =require('../../models/Hospitals');
const Requests=require('../../models/Request')
const router=express.Router();
const User=require('../../models/Users')
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
check('location','Location is not found please provide the location').not().isEmpty(),check('phone','contact no is empty').not().isEmpty(),
check('A_B_C','Available Blood Package is not found please provide the available blood package count').not().isEmpty()],
async (req,res)=>{

const errors=validationResult(req);

if(!errors.isEmpty()){ // checking for the errors 
    res.status(400).json({errors:errors.array()});
}

 
const {location,A_B_C,N_B_G,M_S_C,phone}=req.body; // destructuring the req body


const hospitalProfile={};// create the hospital profile locally
hospitalProfile.user=req.user.id;
hospitalProfile.location=location;
hospitalProfile.A_B_C=A_B_C;
hospitalProfile.phone=phone;
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



//@route  GET api/hospitals/
//@desc   get all hospitals
//@acess  public

router.get('/',async (req,res)=>{

   try {
    const hospitals= await Hospitals.find().populate('user',['avatar','name']);

    res.json(hospitals)
   } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
    
   }
})


//@route  GET api/hospitals/user_id
//@desc   get hospital by userid
//@acess  private
 

router.get('/user/:user_id',async (req,res)=>{

    try {
    const hospital= await Hospitals.findOne({user:req.params.user_id}).populate('user',['name','avatar'])
    
    if(!hospital) return res.status(400).json({msg:"There is no hospital for this user"})

    res.json(hospital)
        
    } catch (err) {
        console.error(err.message)
        if(err.kind== 'ObjectId'){
            return res.status(400).json({msg:"There is no profile for this user"})

        }
        res.status(500).send("Server Error");
        
    }
    
    })


//@route  DELETE api/hospitals
//@desc   delete hostpital profile  & user  & post
//@acess  private 

router.delete('/',auth,async (req,res)=>{

    try {

    // delete requests
    await Requests.deleteMany({user:req.user.id})

    // remove profile 
    await Hospitals.findOneAndRemove({user:req.user.id})

    //remove user
    await User.findOneAndRemove({_id:req.user.id})
    res.json({msg:'user deleted'})
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
        
    }
    
    })

    //@route  PUT api/hospitals/abc
    //@desc   add available blood package count
    //@acess  private 


    router.put('/abc',auth,async (req,res)=>{

        
        const A_B_C=req.body.A_B_C;
        console.log(A_B_C)
    
    try {
        
    
        const hospital=await Hospitals.findOne({user:req.user.id});
       
        hospital.A_B_C=A_B_C
         
         await hospital.save();
    
         res.json(hospital)
    
    
    } catch (err) {
        
        console.error(err.message)
    
        res.status(500).send("Server Error")
    }
    
    
    
    });




    //@route  PUT api/hospitals/nbg
    //@desc   add needed blood group 
    //@acess  private 


    router.put('/nbg',auth,async (req,res)=>{

    
        const N_B_G=req.body.N_B_G;
   
    
    try {
        
    
        const hospital=await Hospitals.findOne({user:req.user.id});
        

        hospital.N_B_G.push(...N_B_G);
         
         await hospital.save();
    
         res.json(hospital)
    
    
    } catch (err) {
        
        console.error(err.message)
    
        res.status(500).send("Server Error")
    }
    
    
    
    });




    
    
    


module.exports=router