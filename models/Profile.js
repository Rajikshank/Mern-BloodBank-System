const mongoose =require('mongoose')

const ProfileModel=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    sex:{
        type:String

    },
    location:{
        type:String,
        required:true 
    },

    bloodgroup:{
        type:String,
        required:true
    },

    phone:{
    type : Number,
    default:false,
    required:true
    },

    Donationhistory:[
      {Date: { type:String ,
                required:true 
                },
        location:{
                    type:String,
                    required:true 
                },
        Hospital:{
                    type:String,
                    required:true 
                },

        Time: { type:String ,
                    required:false 
                    },
                
    }
    ]

})

module.exports=Profile=mongoose.model('Profile',ProfileModel)