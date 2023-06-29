const express = require("express");
const router = express.Router();
const Joi = require('joi');

const authors = [
    {
        id: 1,
        fname: "Nor",
        lname: "Maneea",
        nationality: "Saudi",
        img: "img.png",
    },
    {
        id: 2,
        fname: "Mhmd",
        lname: "Maneea",
        nationality: "Saudi",
        img: "img.png",
    },
    {
        id: 3,
        fname: "Laith",
        lname: "Maneea",
        nationality: "Saudi",
        img: "img.png",
    }
]

/**
 *  @desc Get all authors 
 * @route /api/authors
 * @method GET
 * @access public
 */
router.get("/", (req,res)=>{
    res.json(authors)
});
/**
 *  @desc Get authors by ID
 * @route /api/authors/:id
 * @method GET
 * @access public
 */
router.get("/:id", (req,res)=>{
    const author = authors.find(a => a.id === parseInt(req.params.id))
    if(author){
        res.status(201).json(author)
    }
    else{
        res.status(404).json({message: "Not Found"})
    }
});

/**
 *  @desc Create New Book 
 * @route /api/books
 * @method POST
 * @access public
 */
router.post("/", (req,res)=>{
    const {error} = validateAuthors(req.body)
    if(error){
        return res.status(404).json({message: error.details[0].message})
    }
   
    const author = {
        id: authors.length + 1,
        fname: req.body.fname,
        lname: req.body.lname,
        nationality: req.body.nationality,
        img: req.body.img
    }
    authors.push(author);
    res.status(201).json(author)

});

/**
 *  @desc Update Book by ID
 * @route /api/books/:id
 * @method PUT
 * @access public
 */
router.put("/:id", (req,res)=>{
    const {error} = validateApdateAuthors(req.body);
    if(error){
        return res.status(401).json({message: error.details[0].message})
    }

    const author = authors.find(a => a.id === parseInt(req.params.id));
    if(author){
        res.status(200).json({message: "updated successfully"});
    }
    else{
        res.status(404).json({message: "Not Found"});
    }
    
});


/**
 *  @desc Delete Book by ID
 * @route /api/books/:id
 * @method DELETE
 * @access public
 */
router.delete("/:id", (req,res)=>{
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if(author){
        res.status(200).json({message: "Deleted successfully"});
    }
    else{
        res.status(404).json({message: "Not Found"});
    }
});





//Joi Validation
function validateAuthors(obj){
    const schema = Joi.object({ 
        fname: Joi.string().trim().min(3).max(50).required(),

        lname: Joi.string().trim().min(3).max(50).required(),
    
        nationality: Joi.string().min(3).max(80).required(),

        img: Joi.any(),

    });
    return schema.validate(obj)
}
function validateApdateAuthors(obj){
    const schema = Joi.object({ 
        fname: Joi.string().trim().min(3).max(50),

        lname: Joi.string().trim().min(3).max(50),
    
        nationality: Joi.string().min(3).max(80),

        img: Joi.any(),

    });
    return schema.validate(obj)
}
module.exports = router;