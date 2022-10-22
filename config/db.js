const mongoose=require('mongoose')
const config=require('config')
const db=config.get('mongoURI')

const connectDB= async ()=>{
    
    try{
       await mongoose.connect(db,{
      
    
    })
        console.log("MongoDB Connected")
    }
    catch(err){
        console.log('failed')
        console.error(err.message)
        process.exit(1)// abort process
    }

}

module.exports=connectDB;