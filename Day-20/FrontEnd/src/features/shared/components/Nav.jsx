import React from 'react'
import "../styles/nav.scss"
import { useNavigate } from 'react-router'

const Nav = () => {
    const navigate = useNavigate()
  return (
    <nav className='navbar'>
        <p>Insta</p>
        <button 
        onClick={()=>{navigate("/create-post")}}
        className='button primaryButton'>New Post</button>
    </nav>
  )
}

export default Nav