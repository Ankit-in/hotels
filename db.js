// const { mongoose } = require('mongoose');
const mongoose = require('mongoose');
require('dotenv').config();

// Define mongooDB connection URL
// const mongoURL = process.env.MONGODBLOCAL;
const mongoURL = process.env.MONGODB_URL;

// Set up mongoDB connection older version
// mongoose.connect(mongoURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

//Set up mongoDB connection in this useNewUrlParser & useUnifiedTopology are enabled by default.
mongoose.connect(mongoURL);

//Get the default connection
//Mongoose maintains a default connection object representing the mongoDB connection.
const db = mongoose.connection;

// Define event listeners for database conncetion
db.on('connected',()=>{
    console.log('Connected to MongoDB server');
});

db.on('error', (err) =>{
    console.log('mongoDb connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDb disconnected/down');
});



// Export the database connection
module.exports = db;
