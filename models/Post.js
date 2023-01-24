const mongoose=require('mongoose');
const Schema=mongoose.Schema;
//post by hospital/users for blood donation campaign 

const PostSchema=new Schema({
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
    participants:[
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
    ],
    Aprovel:{
        type:Boolean,
        default:false
    },
    
    Date:{
        type:Date,
        default:Date.now
    }

})

module.exports=Post=mongoose.model('Post',PostSchema);