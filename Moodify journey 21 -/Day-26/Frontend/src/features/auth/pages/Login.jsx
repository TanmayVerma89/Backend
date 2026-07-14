import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import '../styles/login.scss'
import FormGroup from '../components/FormGroup'
import useAuth from '../hooks/useAuth'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { loading, handleLogin } = useAuth()
  const navigate = useNavigate()

  async function submitHandler(e) {
    e.preventDefault();

    try {
      await handleLogin({ email, password })
      navigate('/')
      
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={submitHandler}>

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

          <button type="submit">Login</button>
        </form>
        <p>Doesn't have an account!! <Link to='/register'>Sign Up</Link></p>
      </div>
    </main>
  )
}

export default Login