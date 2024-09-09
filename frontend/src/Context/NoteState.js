import React, { useContext, useState } from 'react'
import NoteContext from "./noteContext";



const NoteState = (props) => {
  const host = 'https://i-notebook-rust.vercel.app'
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // get all notes
  const getNotes = async () => {
    // call the api
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      }
    });
    const json = await response.json()

    setNotes(json)
  }


  // Add a note
  const Add = async (title, description, tag) => {
    // call the api

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: await JSON.stringify({ title, description, tag })
    });

    const newNote = await response.json();
    setNotes(notes.concat(newNote))
    // logic for adding at frontedn 
  }


  // Delete a note

  const Delete = async (id) => {
    // api call 
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json',
        'auth-token': localStorage.getItem('token'),

      }
    });
    const json = response.json();
    // Logic for deleting from fronend
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }





  // Edit a note


  const Edit = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/json',
        'auth-token': localStorage.getItem('token'),

      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json
    let newNotes = JSON.parse( JSON.stringify(notes))
    // logic for editing frontend
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) { 
 
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }

    }
    setNotes(newNotes);
  }



  return (
    <NoteContext.Provider value={{ notes, setNotes, Add, Edit, Delete, getNotes }}>

      {/* props.children means that we can use this state of props we have created here in a component wraped in Notestate */}
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
