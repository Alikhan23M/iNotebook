import React, { useContext, useState } from 'react'
import noteContext from "../Context/noteContext"
export default function Addnote(props) {

    const context = useContext(noteContext)
    const { Add } = context
    const [note, setNote] = useState({ title: '', description: '', tag: '' })

    const handleClick = async(e) => {
        e.preventDefault();
        await Add(note.title, note.description, note.tag);
        setNote({title:'',description:'',tag:''})
        props.showAlert('You have Successfully added a new note','success');
    }
    const onchange = (e) => {
        // ...note means that if some thing is stored on note that will remain stored but things we have written after comma (...note,) will be overrited in note when changed
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>

            <div className="container my-3 card" style={{backgroundImage:'linear-gradient( 109.6deg,  rgba(251,131,30,0.97) 54.1%, rgba(235,166,5,0.86) 100.2% )',maxWidth:'800px'}}>
                <h2>Add a note here</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="Title" className="form-label">Title <i className="fa-solid fa-asterisk" style={{ fontSize: '10px', color: 'red' }}></i></label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" minLength={3} required value={note.title} onChange={onchange} />
                        <div  className="form-text">Title must be atleast 3 characters</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description <i className="fa-solid fa-asterisk" style={{ fontSize: '10px', color: 'red' }}></i></label>
                        <input type="text" className="form-control" id="description" name='description' minLength={3} required value={note.description} onChange={onchange} />
                        <div  className="form-text">Description must be atleast 5 characters</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag'  placeholder='General' value={note.tag} onChange={onchange} />
                    </div>
                    <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>

        </>
    )
}
