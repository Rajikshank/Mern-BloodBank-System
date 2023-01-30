const express=require('express');
const router=express.Router();
const {check,validationResult}=require('express-validator');
const auth=require('../../middleware/auth');
const { json } = require('express');
const User=require('../../models/Users')
const Profile=require("../../models/Profile");
const Hospitals =require('../../models/Hospitals');
const Request=require('../../models/Request');

//@route  POST api/request/
//@desc   add posts 
//@access  private

router.post('/',[auth ,check('text','Text is not found').not().isEmpty()],
async (req,res)=>{

   
const errors=validationResult(req);

if(!errors.isEmpty()){ // checking for the errors 
   return res.status(400).json({errors:errors.array()});
}


try {
    const user=await User.findById(req.user.id).select('-password');

const newRequest=new Request({
    user:req.user.id,
    text:req.body.text,
    location:req.body.location,
    name:user.name,
    avatar:user.avatar,
});

 await newRequest.save();
res.json(newRequest);

} catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
    
}
  


 


});


//@route  GET api/request/
//@desc   Get all request
//@access  private

router.get('/',auth,async (req,res)=>{
    try {
        const request=await Request.find().sort({date:-1});
        res.json(request);
    } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
    }
})



//@route  GET api/request/:id
//@desc   Get all request by id 
//@access  private

router.get('/:id',auth,async (req,res)=>{
    try {
        const request=await Request.findById(req.params.id);

        if(!request){
            return res.status(404).json({msg:'Post not found '})
        }

        res.json(request);
    } catch (err) {
    console.error(err.message)
    if(err.kind==='ObjectId'){
        return res.status(404).json({msg:'Request not found '})
    }
    res.status(500).send("Server Error")
    }
});



//@route  DELETE api/request/:id
//@desc   Delete the request
//@access  private

router.delete('/:id',auth,async (req,res)=>{
    try {
        const request=await Request.findById(req.params.id);

        if(!request){
            return res.status(404).json({msg:'request not found '})
        }


        if(request.user.toString() !==req.user.id){
            return res.status(401).json({msg:'user not authorized'});
        }
        
        await request.remove();
        res.json({msg:'request removed'})
    } catch (err) {
    console.error(err.message)
    if(err.kind==='ObjectId'){
        return res.status(404).json({msg:'Request not found '})
    }
    res.status(500).send("Server Error")
    }
})

//@route  PUT api/request/Accept/:id
//@desc   add accepted hospitals  for  the request
//@access  private

router.put('/Accept/:id',auth,async(req,res)=>{

    try {
        
        const request=await Request.findById(req.params.id);

        if(request.Accept.filter(Acc=>Acc.user.toString()=== req.user.id).length>0){
            return res.status(400).json({msg:'Already Accepted'});
        }
        
        const user= await User.findById(req.user.id);
        const user_object={user:req.user.id, avatar:user.avatar,name :user.name};
       // console.log(user)
       request.Accept.unshift(user_object);

        await request.save();


            //adding notification
            //seek for the user details of the post owner
            let post_owner = await User.findById(request.user)
        
             if(post_owner){
             post_owner.notifications.unshift({msg :`your request ${request.text} has been accepted by ${user.name} `})
             
             await post_owner.save();
             console.log('notification added')
            } 





        res.json(request.Accept);

    } catch (err) {
        
    console.error(err.message)
     res.status(500).send("Server Error")
    }

})





//@route  PUT api/post/rm-Accept/:id
//@desc   remove Accept for  the post
//@access  private

router.put('/rm-Accept/:id',auth,async(req,res)=>{

    try {
        
        const request=await Request.findById(req.params.id);

        if(request.Accept.filter(part=>part.user.toString()=== req.user.id).length===0){
            return res.status(400).json({msg:'not a participant for this request'});
        }

       const rmvidx=request.Accept.map(Acc=>Acc.user.toString()).indexOf(req.user.id);

       request.Accept.splice(rmvidx,1);
        await request.save();

        res.json(request.Accept);

    } catch (err) {
        
    console.error(err.message)
     res.status(500).send("Server Error")
    }

})




module.exports=router