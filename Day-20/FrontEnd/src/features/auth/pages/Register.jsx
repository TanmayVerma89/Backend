import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import "../style/form.scss"
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState("")

    const { loading, handleRegister } = useAuth()
    const navigate = useNavigate();

    if (loading) return <main>
        <h1>Loading...</h1>
    </main>

    async function submitHandler(e) {
        e.preventDefault();

        await handleRegister(username, email, password)

        console.log('Registered user:');
        navigate("/")

    }

    return (
        <main>
            <div className="form-container">
                <div className="top">
                    <h1>Login</h1>
                    <div className='head'>Enter Your Credentials to access the portal.</div>
                </div>
                <form onSubmit={submitHandler}>
                    <label ><span>Username</span>
                        <input type="text" placeholder='Username' name='username' id='username'
                            onInput={(e) => { setUsername(e.target.value) }} />
                    </label>
                    <label ><span>Email</span>
                        <input type="email" placeholder='Email' name='email' id='email'
                            onInput={(e) => { setEmail(e.target.value) }} />
                    </label>
                    <label ><span>Username</span>
                        <input type="text" placeholder='Password' name='password' id='password'
                            onInput={(e) => { setPassword(e.target.value) }} />
                    </label>
                    <button type='submit'>register</button>
                </form>
                <div className="separator"></div>
                <div className="bottom">
                    <p>Already have an account <Link className='toggleLink' to="/login">Login.</Link> </p>
                </div>
            </div>
        </main>
    )
}

export default Register