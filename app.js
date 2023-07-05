const express = require("express");
const booksPath = require('./routes/books');
const authorsPath = require('./routes/authors');
const authPath = require('./routes/auth');
require('dotenv').config();
const logger = require("./middlewares/logger");
const {notFound, errorHandler} = require("./middlewares/errors");
const {databaseConnection} = require("./config/db");


//Connection to DB
databaseConnection();

//Init App
const app = express();

//Apply Middlewares 
app.use(express.json());

app.use(logger);


app.use('/api/books', booksPath);

app.use('/api/authors', authorsPath);

app.use('/api/auth', authPath);

app.use('/api/users', require('./routes/users')); //Another way


// Error Handler Middleware
app.use(notFound);

app.use(errorHandler);



// Running the server
const PORT = process.env.PORT;
app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`));