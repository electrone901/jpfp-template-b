import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import AllRobots from './AllRobots'

class Root extends React.Component {
  componentDidMount() {
    // Huh, I wonder what this mysterious componentDidMount is doing here... 🤔
  }
  render() {
    return (
      <Router>
        <div>
          <nav>
            Welcome!
            <NavLink to="/">Home</NavLink>
            <NavLink to="/robots">Robots</NavLink>
          </nav>
          <Route path="/robots" component={AllRobots} />
          <h1>Welcome to StackBot Project Management: your robot employees are awaiting assignments!</h1>
          <p>This seems like a nice place to get started with some Routes!</p>
        </div>
      </Router>
    )
  }
}

export default Root
