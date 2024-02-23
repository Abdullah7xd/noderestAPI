const router = require("express").Router();
const User= require("../models/User")
//Register

router.post("/register",(req,res)=>{
    const user = new User({
        username:""
    })
})
module.exports = router