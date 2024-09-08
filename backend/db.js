// ========== This file is just to connect our backend to the data base ============
// gkNEz3LYSwi48qDG
// alikhan9142673
// import mongoose 
const mongoose = require('mongoose');

// Mongoose URI is the link of our monogo db data base
const mongooseURI ='mongodb+srv://alikhan9142673:gkNEz3LYSwi48qDG@inotebook.1ccdl.mongodb.net/?retryWrites=true&w=majority&appName=iNotebook'
// Create a conncectMonogo function that will connect us to the data base and we will export this function from

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongooseURI);
        console.log('Connected to Mongo successfully');
    } catch (error) {
        console.error('Error connecting to Mongo:', error);
    }
};

// Finally export the connectMongo function
module.exports = connectToMongo;
