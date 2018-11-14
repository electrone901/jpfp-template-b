import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
      <NavLink exact active="selected" to="/">Home</NavLink>
      <div className="right-navbar">
        <NavLink active="selected" to="/robots">Robots</NavLink>
        <NavLink active="selected" to="/projects">Projects</NavLink>
      </div>
    </nav>
  )
}

export default NavBar
