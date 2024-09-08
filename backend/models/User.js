// ==================== This file is for defining the user schema in the data base ==========

// import mongoose
const mongoose = require('mongoose')
const { Schema } = mongoose

// Create a new object of the schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    
    date:{
        type: Date,
        default: Date.now
   }
});

// Convert the above schema into model

// Finally export the the schema
const User =  mongoose.model('user',userSchema);
module.exports = User;
