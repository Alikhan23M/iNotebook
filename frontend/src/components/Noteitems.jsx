import React,{useContext} from 'react'
import noteContext from "../Context/noteContext"

export default function Noteitems(props) {
    
    // as the props is an array of the notes coming so we assigned it to note array
    const { note,updateNote } = props;
    const context = useContext(noteContext)
    const  {Delete} = context

    return (
        <div className='col-md-4'>
            <div className="card my-3" >
                <div className="card-body">
                    <div className='d-flex align-items-center'>
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash mx-2" style={{color: 'red' }} onClick={()=>{
                            Delete(note._id);
                            props.showAlert("You have succesfully deleted a note",'success')
                            }}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" style={{color: 'green' }} onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>

        </div>
    )
}
