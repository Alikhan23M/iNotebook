// ============ This file is all related to the notes like fetching notes, editing, updating and deleting notes

const express = require('express');
const router = express.Router();

// Importe notes schema 
const Note = require('../models/Note');

// import the middle ware 
const fetchuser = require('../middleware/fetchuser');

// import mongoose because dealing with db
const mongoose = require('mongoose');

// include express validator
const { body, validationResult } = require('express-validator');

// ================================= Route 1 =========================================


// ROUT1:fetch all user data using /api/notes/fetchallnotes Login required

// middleware fetchuser is called here to decode the auth token and find the user id is main aim here
router.get('/fetchallnotes', fetchuser, [

    // check the titles and descriptions of all the notes
    body('title', 'Title must be atleast 3 character').isLength({ min: 3 }),
    body('description', 'description must be at least 10 character').isLength({ min: 10 }),
    body('tag', 'tag should contain atleast 3 characters').isLength({ min: 3 }),
], async (req, res) => {
    try {
        // find all the notes in the Note schema asscoiated with the user id
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('some errors occured during the process');
    }


})

// ================================= Route 2 =========================================


// ROUT2:Adding notes to data base  using /api/notes/addnote Login Required
router.post('/addnote', fetchuser, async (req, res) => {
    try {

        // Take the title, description and tag of the note that user is trying to add 
        const { title, description, tag } = req.body;

        // check these title, desc etc by ecpress vailidators
        const errors = validationResult(req);

        // if errors then throw the error

        if (!errors.isEmpty()) {

            console.log('error occured')
            return res.status(400).json({ errors: errors.array() });

        }

        // if no errors continue the code

        // Create a new note using Note schema by passing the user id and the user is an obj
        const note = new Note({
            title, description, tag, user: req.user.id
        })

        // Now save the note created 
        const savedNote = await note.save();

        // return the saved note in the response 
        res.json(savedNote);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('some errors occured during the process');
    }
})
// ================================= Route 3 =========================================


// ROUT3:Updating notes to data base using /api/notes/updatenote/:id Login Required

// Now here we are using the user id in the path as well because we will update a note by using the note id
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        // create a new note object
        const newNote = {};

        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("note not found");
        }

        // Check weather the user id stored with this note is equal to the current user 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }

        // if ids are equal then find and update it

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true }) // new true here representes that make the newNote making true and $set sets the value of the new note and update the previous note

        res.json(note)
    } catch (error) {
        res.status(400).send('Internal Server Error');
        console.log(error);
    }
})

// ================================= Route 4 =========================================

// ROUT4:Delete an existing note using /api/notes/deletenote/:id Login Required if a user comes on this path he or she will be allowed to update only his notes 


router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {

        // Find the note to be deleted 

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("note not found");
        }
        // Check weather the user id stored with this note is equal to the current user 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }
        // delte the note
        note = await Note.findByIdAndDelete(req.params.id)
        // res json file
        res.json({ "succcess": "note has been deleted", note: note })
    } catch (error) {
        res.status(400).send('Internal Server Error');
        console.log(error);
    }
})


module.exports = router
