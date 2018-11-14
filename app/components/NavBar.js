import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <div className="right-navbar">
        <Link to="/robots">Robots</Link>
        <Link to="/projects">Projects</Link>
      </div>
    </nav>
  )
}

export default NavBar
