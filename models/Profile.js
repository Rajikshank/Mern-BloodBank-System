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

    covid:{
    type : Boolean,
    default:false
    },

    prevDonationDate:{
        type:Date,
        default:Date.now
    }

})

module.exports=Profile=mongoose.model('Profile',ProfileModel)