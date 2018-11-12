import React from 'react'
import { BrowserRouter } from 'react-router-dom'

class Root extends React.Component {
  componentDidMount() {
    // Huh, I wonder what this mysterious componentDidMount is doing here... 🤔
  }
  render() {
    return (
      <div>
        <nav>
          Welcome!
        </nav>
        <BrowserRouter>
          <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
          <p>This seems like a nice place to get started with some Routes!</p>
        </BrowserRouter>
      </div>
    )
  }
}

export default Root
