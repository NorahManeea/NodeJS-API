const express = require("express");
const router = express.Router();
const Joi = require('joi');
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const {getAllBooks, getBookById, createBook, updateBook, removeBook} = require('../controllers/bookController')


//Http methods/ Verbs

// /api/books
router.route("/").get(getAllBooks).post(verifyTokenAndAdmin, createBook );

// /api/books/:id
router.route("/:id").put(verifyTokenAndAdmin, updateBook).delete(verifyTokenAndAdmin, removeBook ).get(getBookById);

module.exports = router;
