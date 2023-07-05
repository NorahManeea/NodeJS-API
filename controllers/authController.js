const asyncHandler = require("express-async-handler");
const {User, validateLoginUser, validateRegisterUser} = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

/**
 *  @desc Register User  
 * @route /api/auth/register
 * @method POST
 * @access public
 */
const registerUser = asyncHandler(
    async(req,res)=>{
        const {error} = validateRegisterUser(req.body)
        if(error){
            return res.status(404).json({message: error.details[0].message})
        }
        //check if user already have an account
        let user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).json({message: "This email is already registered"})
        }

        //For hashing password
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password , salt);


        user = new User({
           email: req.body.email,
           username: req.body.username,
           password: req.body.password,

        });
        const result = await user.save();
        const token = jwt.sign({id: this._id, isAdmin: this.isAdmin},process.env.JWT_SECRET_KEY , {expiresIn: "30d"});

        const {password, ...other} = result._doc;
        res.status(201).json({...other, token});
    }
);

/**
 *  @desc Login User  
 * @route /api/auth/login
 * @method POST
 * @access public
 */
const loginUser = asyncHandler(
    async(req,res)=>{
        const {error} = validateLoginUser(req.body)
        if(error){
            return res.status(404).json({message: error.details[0].message})
        }
        //check if user already logged in
        let user = await User.findOne({email: req.body.email})
        if(!user){
            return res.status(400).json({message: "The email or password you entered is invalid"})
        }
           const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
           if(!isPasswordMatch){
            return res.status(400).json({message: "The email or password you entered is invalid"})
        }
           const token = jwt.sign({id: this._id, isAdmin: this.isAdmin},process.env.JWT_SECRET_KEY , {expiresIn: "30d"});
   
           const {password, ...other} = user._doc;
           res.status(200).json({...other, token});

    }
);

module.exports = {
    registerUser,
    loginUser
}