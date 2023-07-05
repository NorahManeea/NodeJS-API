const {Book, validateBooks, validateUpdateBooks} = require("../models/Book");
const asyncHandler = require("express-async-handler");


/**
 *  @desc Get all Books 
 * @route /api/books
 * @method GET
 * @access public
 */
const getAllBooks =  asyncHandler(
    async(req,res)=>{
        //Mongo DB Comparison Query Operators $eq = equal , $ne= not equal , $lt = less than , $gt = greater than ....
        const {minPrice, maxPrice} = req.query;
        let books;
        if(minPrice && maxPrice){
            books = await Book.find({price: {$gte: minPrice, $lte: maxPrice}}).populate("author", ["_id", "fname", "lname"]);
            
        }else{
            books = await Book.find().populate("author", ["_id", "fname", "lname"]);
        }
        res.status(200).json(books);
    }
);

/**
 *  @desc Get Book by ID
 * @route /api/books/:id
 * @method GET
 * @access public
 */
const getBookById = asyncHandler(
    async(req,res)=>{
            const book = await Book.findById(req.params.id)
            if(book){
                res.status(201).json(book);
            }
            else{
                res.status(404).json({message: "Not Found"})
            }
        }
);

/**
 *  @desc Create New Book 
 * @route /api/books
 * @method POST
 * @access private (Only Admin)
 */
const createBook = asyncHandler(
    async(req,res)=>{

        // Input Validation We'll used Joi library for validaton rather than this way
       /* if(!req.body.title || req.body.title.length < 3){
            return res.status(400).json("Title is required and must be more than 3 characters");
        } */
    
        const {error} = validateBooks(req.body);
       
        if(error){
            return res.status(400).json({message: error.details[0].message}); 
        }
    
        const book = new Book(
            {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                price: req.body.price,
            }
        )
        const result = await book.save();
        res.status(201).json(result);
    
    }
);

/**
 *  @desc Update Book by ID
 * @route /api/books/:id
 * @method PUT
 * @access private (Only Admin)
 */
const updateBook = asyncHandler(
    async(req,res)=>{
            const {error} = validateUpdateBooks(req.body);
            if(error){
                return res.status(401).json({message: error.details[0].message})
            }
        
            const book = await Book.findByIdAndUpdate(req.params.id, {
                $set: {
                    title : req.body.title,
                    author : req.body.author,
                    description : req.body.description,
                    price : req.body.price,
                }
            }, {
                new: true
            });
            res.status(200).json(book);  
    }
);


/**
 *  @desc Delete Book by ID
 * @route /api/books/:id
 * @method DELETE
 * @access private (Only Admin)
 */
const removeBook = asyncHandler(
    async(req,res)=>{
            const book = Book.findById(req.params.id);
            if(book){
                await Book.findByIdAndDelete(req.params.id);
                res.status(200).json({message: "Deleted successfully"});
            }
            else{
                res.status(404).json({message: "Not Found"});
            }
    }
);


module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    removeBook,
}