import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import AllRobots from './AllRobots'
import NavBar from './NavBar'
import { fetchRobots } from '../redux/robots'

class Root extends React.Component {
  componentDidMount() {
    // Huh, I wonder what this mysterious componentDidMount is doing here... 🤔
    this.props.fetchInitial()
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

const mapDispatch = dispatch => ({
  fetchInitial: () => {
    dispatch(fetchRobots())
  }
})
export default connect(null, mapDispatch)(Root)
