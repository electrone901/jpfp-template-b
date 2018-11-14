import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AllRobots from './AllRobots'
import NavBar from './NavBar'

class Root extends React.Component {
  componentDidMount() {
    // Huh, I wonder what this mysterious componentDidMount is doing here... 🤔
  }
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route path="/robots" component={AllRobots} />
          <h1>Welcome to StackBot Project Management: your robot employees are awaiting assignments!</h1>
          <p>This seems like a nice place to get started with some Routes!</p>
        </div>
      </Router>
    )
  }
}

export default Root
