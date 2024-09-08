import React, { useContext } from 'react'
import Notes from './Notes'


export default function Home(props) {
    
    return (
        <div style={{marginTop:'5rem'}}>
        {/* ================= add Notes component here =============== */}
         <Notes showAlert = {props.showAlert}/>

        </div>

    )
}
