import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
      <NavLink exact to="/">Home</NavLink>
      <div className="right-navbar">
        <NavLink to="/robots">Robots</NavLink>
        <NavLink to="/projects">Projects</NavLink>
      </div>
    </nav>
  )
}

export default NavBar
