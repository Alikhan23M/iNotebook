import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import './Css/Login.css'




export default function Login(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://i-notebook-rust.vercel.app/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            // save the auth token and redirect the user
            const name = json.username;
            localStorage.setItem('token', json.authToken)
            localStorage.setItem('name',name);
            props.showAlert('Successfully loged in', 'success')
            
            navigate("/");
        }
        else {
            props.showAlert('Invaild Credentials', 'danger');
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
        
            <div className='card login-container p-2' style={{marginTop:'10rem',backgroundColor:'#FBAB7E',backgroundImage:'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)'}}>
                <h3>Login </h3>
                <img src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png" alt="avator image" />
                <form  onSubmit={handleSubmit} style={{}}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address <i className="fa-solid fa-asterisk" style={{ fontSize: '10px', color: 'red' }}></i></label>
                        <input type="email" className="form-control" name='email'value={credentials.email}   id="email" aria-describedby="emailHelp" onChange={onChange}/>
                            <div  className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Passwprd" className="form-label">Password <i className="fa-solid fa-asterisk" style={{ fontSize: '10px', color: 'red' }}></i></label>
                        <input type="password" className="form-control" value={credentials.password} name='password' id="password" onChange={onChange}/>
                    </div>
                    <button type="submit" className="btn">Login</button>
                </form>
                <p className='my-3'>Don't have an Account <Link to="/signup">Creat one</Link></p>
            </div>
        </>
    )
}
