const mongoose = require("mongoose");
const Joi = require('joi');


const AuthorSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true,
        trim: true,
        minlength : 3,
        maxlength : 200,
    },
    lname:{
        type: String,
        required: true,
        trim: true,
        minlength : 3,
        maxlength : 200,
    },
    nationality:{
        type: String,
        required: true,
        trim: true,
        minlength : 3,
        maxlength : 100,
    },
    img:{
        type: String,
        default: "avatar.png",
    },
}, {
    timestamps: true,
});

const Author = mongoose.model("Author", AuthorSchema );

//Joi Validation
function validateAuthors(obj){
    const schema = Joi.object({ 
        fname: Joi.string().trim().min(3).max(50).required(),

        lname: Joi.string().trim().min(3).max(50).required(),
    
        nationality: Joi.string().min(3).max(80).required(),

        img: Joi.string(),

    });
    return schema.validate(obj)
}
function validateUpdateAuthors(obj){
    const schema = Joi.object({ 
        fname: Joi.string().trim().min(3).max(50),

        lname: Joi.string().trim().min(3).max(50),
    
        nationality: Joi.string().min(3).max(80),

        img: Joi.string(),

    });
    return schema.validate(obj)
}

module.exports = {
    Author,
    validateAuthors,
    validateUpdateAuthors
};