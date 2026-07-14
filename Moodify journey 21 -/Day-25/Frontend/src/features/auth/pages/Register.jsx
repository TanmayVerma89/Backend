import React, { useState } from 'react'
import FormGroup from '../components/FormGroup'
import { Link, useNavigate } from 'react-router'
import {useAuth} from '../hooks/useAuth';
import '../styles/register.scss'

const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {loading , handleRegister} = useAuth();

  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();

    await handleRegister({username, email, password});

    setUsername('');
    setEmail('');
    setPassword('');

    navigate('/face-expression')
  }

  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={submitHandler}>

          <FormGroup
            value={username}
            setValue={setUsername}
            label="Username"
            placeholder="Enter your username" />

          <FormGroup
            value={email}
            setValue={setEmail}
            label="Email"
            placeholder="Enter your email" />

          <FormGroup
            value={password}
            setValue={setPassword}
            label="password"
            placeholder="Enter your password" />

          <button type="submit">Login</button>

        </form>
        <p>Already have an account! &nbsp;<Link to={'/login'}>Sign in</Link></p>
      </div>
    </main>
  )
}

export default Register