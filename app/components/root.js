import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

export default class Root extends React.Component {
  componentDidMount() {
    // Huh, I wonder what this mysterious componentDidMount is doing here... 🤔
  }
  render() {
    return (
      <Router>
        <div>
          <nav>
            Welcome!
          </nav>
          <h1>Welcome to StackBot Project Management: your robot employees are awaiting assignments!</h1>
          <p>This seems like a nice place to get started with some Routes!</p>
        </div>
      </Router>
    )
  }
}
