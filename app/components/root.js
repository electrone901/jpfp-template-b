import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import AllRobots from './AllRobots'
import AllProjects from './AllProjects';
import NavBar from './NavBar'
import { fetchRobots } from '../redux/robots'
import { fetchProjects } from '../redux/projects'

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
          <Switch>
            <Route path="/robots" component={AllRobots} />
            <Route path="/projects" component={AllProjects} />
            <Route render={() => (
              <h1>Welcome to StackBot Project Management: your robot employees are awaiting assignments!</h1>
            )} />
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapDispatch = dispatch => ({
  fetchInitial: () => {
    dispatch(fetchRobots())
    dispatch(fetchProjects())
  }
})
export default connect(null, mapDispatch)(Root)
