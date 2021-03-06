import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProject } from '../redux/project'
import ProjectForm from './ProjectForm'
import ToggleComplete from './ToggleComplete'
import Unassign from './Unassign'

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
        <div className="formDetailContainer">

          <div className="formContainer">
            <h2>Edit Project:</h2>
            {/* Thanks to this key prop, we'll completely re-mount the form
                when the project is loaded from the thunk */}
            <ProjectForm key={project.id} />
          </div>

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
                <span>Completed?</span> {project.completed ? 'Yes' : 'No'}
              </p>
              <ToggleComplete
                projectId={project.id}
                isComplete={project.completed}
              />
            </div>
          </div>

        </div>

        <div className="robotsProjects">
          <h2>Assigned Robots:</h2>
          {
            project.robots.length ? (
              project.robots.map(robot => (
                <Link
                  className="projectListItem"
                  key={robot.id}
                  to={`/robots/${robot.id}`}
                >
                  <div>
                    {robot.name}{' '}
                    <Unassign robotId={robot.id} projectId={project.id} />
                  </div>
                </Link>
              ))
            ) : (
                <p>No robots assigned to this project</p>
              )}
        </div>

      </div>
    )
  }
}

const mapState = ({ project }) => ({ project })

const mapDispatch = (dispatch, ownProps) => {
  const id = +ownProps.match.params.id
  return {
    fetchSingleProject: () => dispatch(fetchProject(id)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(SingleProject)
