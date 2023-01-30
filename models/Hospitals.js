const mongoose =require('mongoose')
 


const HospitalModel= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    location:{
        type:String,
        required:true 
    },
    
    A_B_C:{   // available blood package count
        type:Number,
        required:true
    },
    N_B_G:{ // needed blood group 
        type:[String],
       //required:true
    
    },

    M_S_C:{ // maximum storage capacity 
        type:Number,
    
    },
    
    phone:{
        type : Number,
        default:false,
        required:true
        },
    


})

module.exports=Hospitals=mongoose.model('Hospitals',HospitalModel)