import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router'
import "../style/form.scss"
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState("")

    const {loading, handleRegister} = useAuth()
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
                <h1>Register</h1>
                <form onSubmit={submitHandler}>
                    <input type="text" placeholder='Username' name='username' id='username'
                        onInput={(e) => { setUsername(e.target.value) }} />
                    <input type="email" placeholder='email' name='email' id='email'
                        onInput={(e) => { setEmail(e.target.value) }} />
                    <input type="text" placeholder='Password' name='password' id='password'
                        onInput={(e) => { setPassword(e.target.value) }} />
                    <button type='submit'>register</button>
                </form>
                <p>Already have an account <Link className='toggleLink' to="/login">Login.</Link> </p>
            </div>
        </main>
    )
}

export default Register