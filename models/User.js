const mongoose = require("mongoose");
const Joi = require('joi');

//User Schema
const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 100,
    }, 
    username:{
        type: String,
        required: true,
        minlength: 3,
        trim: true,
        maxlength: 200,
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

//User Model
const User = mongoose.model("User", UserSchema );

//Joi Validation
function validateRegisterUser(obj){
    const schema = Joi.object({
        email: Joi.string().trim().min(3).max(100).required(),
        username: Joi.string().trim().min(3).max(200).required(),
        password: Joi.string().trim().min(6).required(),
    });
    return schema.validate(obj);
};

function validateLoginUser(obj){
    const schema = Joi.object({
        email: Joi.string().trim().min(3).max(100).required(),
        password: Joi.string().trim().min(6).required(),
    });
    return schema.validate(obj);
};

function validateUpdateUser(obj){
    const schema = Joi.object({
        email: Joi.string().trim().min(3).max(100),
        username: Joi.string().trim().min(3).max(200),
        password: Joi.string().trim().min(6),
    });
    return schema.validate(obj);
};


module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser,
}
