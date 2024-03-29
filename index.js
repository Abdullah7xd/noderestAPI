const express = require('express');
const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const dotenv = require('dotenv');
const morgan = require('morgan');
const userRoute=require("./routes/users") 
const authRoute=require("./routes/auth")
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then((result) => {
    console.log('database connected');
}).catch((err) => {
    console.error(err);
});
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users" , userRoute);
app.use("/api/auth" , authRoute);

app.get("/",(req,res)=> {
    res.send("Welcome to homepage")
})
app.get("/users",(req,res)=> {
    res.send("Welcome to homepage")
})
app.get("/auth",(req,res)=> {
    res.send("Welcome to Auth")
})
app.listen(8800,()=>{
    console.log("backend server is running!!!");
})