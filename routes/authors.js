const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {Author, validateAuthors, validateUpdateAuthors} = require("../models/Author");
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken");

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
router.get("/", asyncHandler(
    async(req,res)=>{
            const authorList = await Author.find();
            res.status(200).json(authorList)
    }
));
/**
 *  @desc Get authors by ID
 * @route /api/authors/:id
 * @method GET
 * @access public
 */
router.get("/:id", asyncHandler(
    async(req,res)=>{
            const author = await Author.findById(req.params.id)
            if(author){
                res.status(201).json(author);
            }
            else{
                res.status(404).json({message: "Not Found"})
            }
        }
));

/**
 *  @desc Create New Author 
 * @route /api/authors
 * @method POST
 * @access private (Only Admin)
 */
router.post("/", verifyTokenAndAdmin, asyncHandler(
    async(req,res)=>{
        const {error} = validateAuthors(req.body)
        if(error){
            return res.status(404).json({message: error.details[0].message})
        }
            const author = new Author({
                fname: req.body.fname,
                lname: req.body.lname,
                nationality: req.body.nationality,
                img: req.body.img
            });
            const result = await author.save();
            res.status(201).json(result);
    }
));

/**
 *  @desc Update Author by ID
 * @route /api/authors/:id
 * @method PUT
 * @access private (Only Admin)
 */
router.put("/:id", verifyTokenAndAdmin, asyncHandler(
    async(req,res)=>{
            const {error} = validateUpdateAuthors(req.body);
            if(error){
                return res.status(401).json({message: error.details[0].message})
            }
        
            const autohr = await Author.findByIdAndUpdate(req.params.id, {
                $set: {
                    fname : req.body.fname,
                    lname : req.body.lname,
                    nationality : req.body.nationality,
                    img : req.body.img,
                }
            }, {
                new: true
            });
            res.status(200).json(autohr);  
    }
));


/**
 *  @desc Delete authoor by ID
 * @route /api/authors/:id
 * @method DELETE
 * @access private (Only Admin)
 */
router.delete("/:id", verifyTokenAndAdmin, asyncHandler(
    async(req,res)=>{
            const author = Author.findById(req.params.id);
            if(author){
                await Author.findByIdAndDelete(req.params.id);
                res.status(200).json({message: "Deleted successfully"});
            }
            else{
                res.status(404).json({message: "Not Found"});
            }
    }
));


module.exports = router;