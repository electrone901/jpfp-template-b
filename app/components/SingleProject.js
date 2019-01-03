import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProject } from '../redux/project'

class SingleProject extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProject()
  }
  render() {
    const { project } = this.props
    if (!project || !project.name) return <h1>No project found!</h1>
    return (
      <div>
        <h1>{project.title}</h1>
        <div className="singleRobotContainer">
          <div>
            <p>Description: {project.description}</p>
            <p>Deadline: {project.deadline}</p>
            <p>Completed? {project.completed ? 'Yes!' : 'Nope.' }</p>
          </div>
        </div>
        <div className="robotsProjects">
          <h2>Assigned Robots:</h2>
          {
            project.robots.length
            ? project.robots.map(robot => (
              <Link className="projectListItem" key={robot.id} to={`/robots/${robot.id}`}>
                <div>
                  <p>{robot.name}</p>
                </div>
              </Link>
            ))
            : <p>No robots assigned to this project</p>
          }
        </div>
      </div>
    )
  }
}

const mapState = ({ project }) => ({ project })

const mapDispatch = (dispatch, ownProps) => {
  const id = +ownProps.match.params.id
  return {
    fetchSingleProject: () => dispatch(fetchProject(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProject)
