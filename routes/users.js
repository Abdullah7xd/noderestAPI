const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
//update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (error) {
                return res.status(500).json(error)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated")
        } catch (error) {
            return res.status(500).json(error);
        }

    } else {
        return res.status(403).json("You can update only your account")
    }
})
//delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (error) {
                return res.status(500).json(error)
            }
        }
        try {
            const user = await User.findByIdAndDelete({ _id: req.params.id }, {
                $set: req.body,
            });
            res.status(200).json("Account has been deleted successfully")
        } catch (error) {
            return res.status(500).json(error);
        }

    } else {
        return res.status(403).json("You can delete only your account")
    }
})
//get a user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc
        res.status(200).json(usr)
    } catch (error) {
        res.status(500).json(err)
    }
})
//follow a user
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try{
        const user = await User.findById(req.body.userId);
        if(!user.followers.includes(req.body.userId)){
            await user.updateOne({$push:{followers:req.body.userId}})
            await currentUser.updateOne({$push:{followings:req.body.userId}})
            res.status(200).json("user has been followed")

        }else{
            res.status(403)
        }
      } catch(err){
        res.status(500).json("You already follow this user")
      }
    }else{
        res.status(403).json("You cant follow yourself");
    }
})


//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try{
        const user = await User.findById(req.body.userId);
        if(user.followers.includes(req.body.userId)){
            await user.updateOne({$pull:{followers:req.body.userId}})
            await currentUser.updateOne({$pull:{followings:req.body.userId}})
            res.status(200).json("user has been unfollowed")

        }else{
            res.status(403).json("You dont follow this user")
        }
      } catch(err){
        res.status(500).json("You already follow this user")
      }
    }else{
        res.status(403).json("You cant follow yourself");
    }
})

module.exports = router

// try {
//     const user = await User.findById(req.params.id);
//     const currentUser = await User.findById(req.body.userId);
//     if (!user.followers.includes(req.body.userId))
// catch (error) {
//             res.status(500)
//         }
// }else {
//     res.status(403).json("You cant follow yourself")
// }