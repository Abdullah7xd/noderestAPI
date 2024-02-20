const router = require("express").Router();

router.get("/",(req,res)=>{
    res.send("hello its user router")
})

module.exports= router