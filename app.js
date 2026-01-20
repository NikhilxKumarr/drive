const express=require('express');
const userRouter=require('./routes/user.routes');
const dotenv=require('dotenv');

dotenv.config();
const connectToDB=require('./config/db')
connectToDB();


const app=express();


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/user', userRouter);



app.listen(3000,()=>{
    console.log(`App listening at http://localhost:3000`);
});