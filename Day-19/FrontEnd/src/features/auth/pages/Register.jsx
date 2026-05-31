import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import{ useAuth  } from "../hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {handleRegister} = useAuth()

  function submitHandler(e) {
    e.preventDefault();
    handleRegister(username, email, password)
    .then(res=>{
      console.log(res);
    })
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={submitHandler}>
          <input type="text" placeholder='Enter username' name='username'
            onInput={(e) => { setUsername(e.target.value) }} />
          <input type="text" placeholder='Enter email' name='email'
            onInput={(e) => { setEmail(e.target.value) }} />
          <input type="text" placeholder='Enter password' name='password'
            onInput={(e) => { setPassword(e.target.value) }} />
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <Link className='toggleAuthForm' to='/login'>Login</Link></p>
      </div>
    </main>
  )
}

export default Register