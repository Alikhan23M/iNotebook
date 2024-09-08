import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(`https://i-notebook-rust.vercel.app/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the auth token and redirect the user
            const name = json.username;
            localStorage.setItem('token', json.authToken,);
            localStorage.setItem('name',name)
            navigate('/');
            props.showAlert('Successfully signed up', 'success')
        }
        else {
            props.showAlert('Invaild Credentials', 'danger')
        }
    }
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='card login-container p-2' style={{ marginTop: '5rem', backgroundColor: '#FBAB7E', backgroundImage: 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)' }}>
                <h3>Signup </h3>
                <img src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png" alt="avator image" />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name <i className="fa-solid fa-asterisk" style={{ fontSize: '10px', color: 'red' }}></i></label>
                        <input type="text" className="form-control" name='name' id="name" onChange={onchange} />
                        <div className="form-text">Name must be atleast 3 characters</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address <i className="fa-solid fa-asterisk" style={{ fontSize: '10px', color: 'red' }}></i></label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onchange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Set Password <i className="fa-solid fa-asterisk" style={{ fontSize: '10px', color: 'red' }}></i></label>
                        <input type="password" className="form-control" name='password' id="password" minLength={5} required onChange={onchange} />
                        <div className="form-text">Password must be atleast 5 characters</div>
                    </div>

                    <button type="submit" className="btn btn-primary">Signup</button>
                </form>
            </div>
        </>
    )
}
