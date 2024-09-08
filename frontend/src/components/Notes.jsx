// import react and usecontecxt hook which we will be using
import React, { useContext, useEffect, useRef,useState } from 'react'

// import the noteContext js file that we have made for creating context
import noteContext from "../Context/noteContext"

// import Noteitems here because we will pass props to Noteitems from here
import Noteitems from './Noteitems'
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom'

// create a function
export default function Notes(props) {
    let navigate = useNavigate();
    // what ever we have in noteContext will be assigned to context
    const context = useContext(noteContext)

    // use destructure method to take notes and setNotes from context
    const { notes, getNotes,Edit} = context
    const[note,setNote] = useState({id:'',utitle:'', udescription:'',utag:''})
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate("/login");
        }
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id:currentNote._id,utitle:currentNote.title, udescription:currentNote.description, utag:currentNote.tag})
    }
  

    const handleClicks = ()=>{
        Edit(note.id,note.utitle,note.udescription,note.utag);
        refClose.current.click();
        props.showAlert('You have Successfully updated the note','success');
        
    }

    const onchange = (e)=>{
        // ...note means that if some thing is stored on note that will remain stored but things we have written after comma (...note,) will be overrited in note when changed
        setNote({...note,[e.target.name]:e.target.value})
    }

    return (
        <>
            <Addnote showAlert={props.showAlert}/>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="Title" className="form-label">Title <i className="fa-solid fa-asterisk" style={{fontSize:'10px', color:'red'}}></i></label>
                                    <input type="text" className="form-control" id="utitle" value={note.utitle} name='utitle' aria-describedby="emailHelp" minLength={3} required placeholder='Title must be atleast 3 characters' onChange={onchange} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description <i className="fa-solid fa-asterisk" style={{fontSize:'10px', color:'red'}}></i></label>
                                    <input type="text" className="form-control" id="udescription" value={note.udescription } name='udescription' minLength={5} required placeholder='Description must be atleast 5 characters' onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label" >Tag</label>
                                    <input type="text" className="form-control" value={note.utag} id="utag" name='utag'placeholder='General' onChange={onchange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.utitle.length<3 || note.udescription.length<5 } ref={refClose} type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClicks}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" container row">
                <h2>{localStorage.getItem('name')}'s Notes</h2>
                <div className="container">
                {notes.length===0 && "No Notes to Display"}
                </div>
                {notes.map((note) => {
                    // send all the notes to the note itemz
                    return <Noteitems key={note.id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
                })}
            </div>
        </>
    )
}
