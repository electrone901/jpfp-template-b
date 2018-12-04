import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { fetchProjects } from '../redux/projects';
import { connect } from 'react-redux'

class Root extends React.Component {
  componentDidMount() {
    // Huh, I wonder what this mysterious componentDidMount is doing here... 🤔
    this.props.fetchProjects()
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

const mapDispatch = (dispatch) => {
  return {
    fetchProjects: () => dispatch(fetchProjects())
  }
}

export default connect(null, mapDispatch)(Root)
