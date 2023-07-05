const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {User, validateUpdateUser} = require("../models/User");
const bcrypt = require('bcryptjs');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middlewares/verifyToken");




/**
 *  @desc Update 
 * @route /api/users/:id
 * @method PUT
 * @access private
 */
router.put("/:id",verifyTokenAndAuthorization, asyncHandler(
    async(req,res)=>{
        if(req.user.id !== req.params.id){
            return res.status(403).json({message: "Not allowed, Only You Can Update Your Profile"}); // 403 means forbidden
        }
            const {error} = validateUpdateUser(req.body);
            if(error){
                return res.status(401).json({message: error.details[0].message})
            }
            if(req.body.password){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
        
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: {
                    email : req.body.email,
                    username : req.body.username,
                    password : req.body.password,
                }
            }, {
                new: true
            }).select("-password");
            res.status(200).json(user);  
    }
));


/**
 *  @desc Get all Users 
 * @route /api/users
 * @method GET
 * @access private (Only Admin)
 */
router.get("/",verifyTokenAndAdmin, asyncHandler(
    async(req,res)=>{
        const users = await User.find().select("-password");
            res.status(200).json(users);  
    }
));

/**
 *  @desc Get User By ID
 * @route /api/users/:id
 * @method GET
 * @access private (Only Admin & User himself)
 */
router.get("/:id",verifyTokenAndAuthorization, asyncHandler(
    async(req,res)=>{
        const user = await User.findById(req.params.id).select("-password");
        if(user){
            res.status(201).json(user);
        } 
        else{
            res.status(404).json({message: "Not Found"});
        }
    }
));


/**
 *  @desc Delete User By ID
 * @route /api/users/:id
 * @method DELETE
 * @access private (Only Admin & User himself)
 */
router.delete("/:id",verifyTokenAndAuthorization, asyncHandler(
    async(req,res)=>{
        const user = await User.findById(req.params.id).select("-password");
        if(user){
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "Deleted successfully"});
        } 
        else{
            res.status(404).json({message: "Not Found"});
        }
    }
));


module.exports = router;