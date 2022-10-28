const express=require('express');
const connectDB = require('./config/db');
 

const app=express();

//Connect DB

connectDB();

//Init Middleware
app.use(express.json({extended:false}))
 


app.get('/',(req,res)=>res.send('API Running'));

//routes 

app.use('/api/users',require('./routes/api/users'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/auth',require('./routes/api/auth'))
app.use('/api/hospitals',require('./routes/api/hospitals'))
app.use('/api/post',require('./routes/api/post'))
app.use('/api/request',require('./routes/api/request'))




const PORT =process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server Started on ${PORT}`))

