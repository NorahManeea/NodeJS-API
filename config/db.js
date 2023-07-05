const mongoose = require("mongoose");

async function databaseConnection(){
try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
    
} catch (error) {
    console.log("Connected failed to DB", error);
}
};


module.exports = {
    databaseConnection,
}