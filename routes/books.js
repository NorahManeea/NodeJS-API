const express = require("express");
const router = express.Router();
const Joi = require('joi');


const books = [
    {
        id: 1,
        title: "Book1",
        author: "Emad",
        description: "This book is about Book1",
        price: 30
    },
     {
        id: 2,
        title: "Book2",
        author: "Emad",
        description: "This book is about Book2",
        price: 50
    }
]

//Http methods/ Verbs



/**
 *  @desc Get all Books 
 * @route /api/books
 * @method GET
 * @access public
 */
router.get("/", (req,res)=>{
    res.json(books)
});
/**
 *  @desc Get Book by ID
 * @route /api/books/:id
 * @method GET
 * @access public
 */
router.get("/:id", (req,res)=>{
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(book){
        res.status(200).json(book);
    }
    else{
        res.status(404).json({message: "Not found"});
    }
});

/**
 *  @desc Create New Book 
 * @route /api/books
 * @method POST
 * @access public
 */
router.post("/", (req,res)=>{

    // Input Validation We'll used Joi library for validaton rather than this way
   /* if(!req.body.title || req.body.title.length < 3){
        return res.status(400).json("Title is required and must be more than 3 characters");
    } */

    const {error} = validateBooks(req.body);
   
    if(error){
        return res.status(400).json({message: error.details[0].message}); 
    }

    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
    }
    books.push(book);
    res.status(201).json(book); //201 Created success status

});
/**
 *  @desc Update Book by ID
 * @route /api/books/:id
 * @method PUT
 * @access public
 */
router.put("/:id", (req,res)=>{
   const {error} = validateUpdateBooks(req.body);
   if(error){
    return res.status(400).json({message: error.details[0].message}); 
    }
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(book){
        res.status(200).json({message: "Boos has been updated successfully"});
    }
    else{
        res.status(404).json({message: "Not found"});
    }
});


/**
 *  @desc Delete Book by ID
 * @route /api/books/:id
 * @method DELETE
 * @access public
 */
router.delete("/:id", (req,res)=>{
     const book = books.find(b => b.id === parseInt(req.params.id));
     if(book){
         res.status(200).json({message: "Boos has been deleted successfully"});
     }
     else{
         res.status(404).json({message: "Not found"});
     }
 });


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

module.exports = router;
