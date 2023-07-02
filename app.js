const express = require("express");
const booksPath = require('./routes/books');
const authorsPath = require('./routes/authors');
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();


//Connection to DB
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Connected to DB"))
.catch((error)=> console.log("Connected failed to DB", error));

//Init App
const app = express();

//Apply Middlewares 
app.use(express.json());


app.use('/api/books', booksPath);

app.use('/api/authors', authorsPath);



// Running the server
const PORT = process.env.PORT;
app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`));