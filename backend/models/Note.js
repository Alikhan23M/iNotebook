// =========== This file is for creating the shcema of Notes where we will store the notes =============

// import the mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Crate a new shema obj
const noteSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: 'General'
    },
    date:{
        type: Date,
        default: Date.now
   }
});

// conver the shcema to model and export it
module.exports = mongoose.model('notes',noteSchema)