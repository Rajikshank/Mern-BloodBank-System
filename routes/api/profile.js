const express =require('express')
const User=require('../../models/Users')
const auth=require('../../middleware/auth')
const Profile=require("../../models/Profile")
const {check,validationResult}=require('express-validator');
const { json } = require('express');
const router=express.Router()



//@route  GET api/profile/currentuser
//@desc   get current user
//@acess  private 
router.get('/me',auth,async (req,res)=>{

try {
    const profile=await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);

    if(!profile){
        return res.status(400).json({msg:'No profile Found'})
    }



    res.json(profile)
    
} catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
}

})


//@route  POST api/profile/ 
//@desc   Update profile
//@acess  private 

router.post('/',[auth,
    check('bloodgroup','BloodGroup is empty').not().isEmpty(),
    check('location','Location is empty').not().isEmpty()],
    async (req,res)=>{
        const errors=validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        
        const {sex,location,bloodgroup,covid,prevDonationDate}=req.body;

        const ProfileField={};
        ProfileField.user=req.user.id;

        ProfileField.location=location;
        ProfileField.bloodgroup=bloodgroup;
        ProfileField.sex=sex;
        if(covid) ProfileField.covid=covid;
        if(prevDonationDate) ProfileField.prevDonationDate=prevDonationDate;

       try {

        let profile=await Profile.findOne({user:req.user.id})
        if(profile){//update profile if found 

            profile =await Profile.findOneAndUpdate({user:req.user.id},{$set:ProfileField},{new:true})
            return res.json(profile)
        }

        // create profile if not found
        profile=new Profile(ProfileField);
        await profile.save()
        return res.json(profile)
        
        
        
       } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
       }

    });
   


//@route  GET api/profile
//@desc   get all profile
//@acess  Public 

router.get('/',async (req,res)=>{

try {
const profiles= await Profile.find().populate('user',['name','avatar'])
res.json(profiles)
    
} catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
    
}

})



//@route  GET api/profile/user/user_id
//@desc   get profile by user id 
//@acess  Public 

router.get('/user/:user_id',async (req,res)=>{

    try {
    const profile= await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar'])
    
    if(!profile) return res.status(400).json({msg:"There is no profile for this user"})

    res.json(profile)
        
    } catch (err) {
        console.error(err.message)
        if(err.kind==='ObjectId'){
            return res.status(400).json({msg:"There is no profile for this user"})

        }
        res.status(500).send("Server Error");
        
    }
    
    })


 
//@route  DELETE api/profile
//@desc   delete profile  & user  & post
//@acess  private 

router.delete('/',auth,async (req,res)=>{

    try {

    // remove profile 
    await Profile.findOneAndRemove({user:req.user.id})

    //remove user
    await User.findOneAndRemove({_id:req.user.id})
    res.json({msg:'user deleted'})
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
        
    }
    
    })


    
//@route  PUT api/profile/bloodgroup
//@desc   add bloodgroup
//@acess  private 

router.put('/bloodgroup',auth,async (req,res)=>{

    
    const bloodgroup=req.body.bloodgroup;
 

try {
    

    const profile=await Profile.findOne({user:req.user.id});
   

     profile.bloodgroup=bloodgroup;
     await profile.save();

     res.json(profile)


} catch (err) {
    
    console.error(err.message)

    res.status(500).send("Server Error")
}



});






    
module.exports=router