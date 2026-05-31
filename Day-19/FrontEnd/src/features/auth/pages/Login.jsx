import React, { useState } from 'react'
import "../style/form.scss"
import { Link } from 'react-router-dom';
import { useAuth  } from "../hooks/useAuth";
import {useNavigate} from 'react-router';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const {handleLogin, loading} =  useAuth()
  const navigate = useNavigate()

  if(loading) return <h1>Loading...</h1>
  
  function submitHandler(e) {
    e.preventDefault();
  
    handleLogin(username, password)
    .then(res=>{
      navigate("/user")        
      console.log(res);
    })
  
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder='Enter Username'
            name='username'
            onInput={(e) => { setUsername(e.target.value) }} />
          <input
            type="text"
            placeholder='Enter Password'
            name='password'
            onInput={(e) => { setPassword(e.target.value) }} />
          <button type='submit'>Login</button>
        </form>

        <p>Doesn't have an account? <Link className='toggleAuthForm' to="/register">Register</Link> </p>

      </div>
    </main>
  )
}

export default Login