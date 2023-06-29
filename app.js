const express = require("express");
const booksPath = require('./routes/books');
const authorsPath = require('./routes/authors');

//Init App
const app = express();

//Apply Middlewares 
app.use(express.json());


app.use('/api/books', booksPath);

app.use('/api/authors', authorsPath);



// Running the server
const PORT = 5000;
app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`));