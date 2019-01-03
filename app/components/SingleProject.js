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

    const dateTimeOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }
    const deadline = project.deadline
      ? new Date(project.deadline).toLocaleString('en-US', dateTimeOptions)
      : 'No deadline'
    if (!project || !project.title) return <h1>No project found!</h1>
    return (
      <div>
        <h1>{project.title}</h1>
        <div className="singleItemContainer">
          <div>
            <p>
              <span>Description:</span> {project.description}
            </p>
            <p>
              <span>Deadline:</span> {deadline}
            </p>
            <p>
              <span>Priority:</span> {project.priority}
            </p>
            <p>
              <span>Completed?</span> {project.completed ? 'Yes!' : 'Nope.' }
            </p>
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