import React, { useState } from 'react'
import "../styles/register.scss"
import FormGroup from '../components/FormGroup'
import { Link, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth'

const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {loading, handleRegister}= useAuth();

  const navigate = useNavigate();
  async function submitHandler(e) {
    e.preventDefault();

    try {
      await handleRegister({username,email,password})
      navigate('/face-expression') 
    } catch (error) {
      throw error
    }
  }

  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={submitHandler} >
          <FormGroup 
          value={username}
          setValue={setUsername}
          label='Username' 
          placeholder="Enter your username " />

          <FormGroup 
          value={email}
          setValue={setEmail}
          label='Email' 
          placeholder="Enter your email" />

          <FormGroup 
          value={password}
          setValue={setPassword}
          label='Password' 
          placeholder="Enter your password" />

          <button type="submit">Register</button>
        </form>
        <p>Doesn't have an account!! <Link to='/register'>Sign Up</Link></p>
      </div>
    </main>
  )
}

export default Register