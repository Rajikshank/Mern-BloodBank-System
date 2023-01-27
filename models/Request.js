const mongoose=require('mongoose');
const Schema=mongoose.Schema;
//request by hospital for blood donation campaign 

const RequestSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    text:{
        type:String,
        required:true 
    },
    name:{
        type:String
    },
    avatar:{
        type:String 
    },
    location:{
        type:String
    },
    Accept:[
        {
        user:{
            type:Schema.Types.ObjectId,
            ref:'users'
        },
        avatar:{
            type:String 
        },
        name:{
            type:String 
        }
    }
    ]
     

})

module.exports=Post=mongoose.model('Request',RequestSchema);