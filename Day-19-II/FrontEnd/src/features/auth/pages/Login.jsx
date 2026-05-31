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

        console.log('Logged in user:', user);
        navigate("/")
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={submitHandler}>
                    <input type="text" placeholder='Username' name='username' id='username'
                        onInput={(e) => { setUsername(e.target.value) }} />
                    <input type="text" placeholder='Password' name='password' id='password'
                        onInput={(e) => { setPassword(e.target.value) }} />
                    <button type='submit'>Login</button>
                </form>
                <p>Doesn't have an account? <Link className='toggleLink' to="/register">Register.</Link> </p>
            </div>
        </main>
    )
}

export default Login