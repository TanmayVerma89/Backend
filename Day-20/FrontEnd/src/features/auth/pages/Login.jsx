import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import "../style/form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState("")

    const { handleLogin, loading, user } = useAuth()

    const navigate = useNavigate();

    if (loading) return <main>
        <h1>Loading...</h1>
    </main>

    async function submitHandler(e) {

        e.preventDefault();
        await handleLogin(username, password)

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
                    <label htmlFor='username'><span>Username</span>
                        <input type="text" placeholder='Username' name='username' id='username'
                            onInput={(e) => { setUsername(e.target.value) }} />
                    </label>
                    <label htmlFor='password'><span>Password</span>
                        <input type="text" placeholder='Password' name='password' id='password'
                            onInput={(e) => { setPassword(e.target.value) }} />
                    </label>
                    <button type='submit'>Login</button>
                </form>
                <div className="separator"></div>
                <div className="bottom">
                    <p>Doesn't have an account? <Link className='toggleLink' to="/register">Register.</Link> </p>
                </div>
            </div>
        </main>
    )
}

export default Login