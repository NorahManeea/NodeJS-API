const mongoose = require("mongoose");
const Joi = require('joi');

const BookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        minlength : 3,
        maxlength : 200,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Author"
    },
    description:{
        type: String,
        required: true,
        trim: true,
        minlength : 3,
        maxlength : 100,
    },
    price:{
        type: Number,
        required: true,
        min: 0,
    },
}, {
    timestamps: true,
});

const Book = mongoose.model("Book", BookSchema );



// Joi Validation 
function validateBooks(obj){

    const schema = Joi.object({
       title: Joi.string().trim().min(3).max(200).required(),
   
       author: Joi.string().trim().min(3).max(300).required(),
   
       description: Joi.string().trim().min(3).max(500).required(),
   
       price: Joi.number().min(0).required(),
   
   });
   
   return schema.validate(obj);
   
   };
   
   function validateUpdateBooks(obj){
   
       const schema = Joi.object({
          title: Joi.string().trim().min(3).max(200),
      
          author: Joi.string().trim().min(3).max(300),
      
          description: Joi.string().trim().min(3).max(500),
      
          price: Joi.number().min(0),
      
      });
      
      return schema.validate(obj);
      
      };

module.exports = {
    Book,
    validateBooks,
    validateUpdateBooks
}      