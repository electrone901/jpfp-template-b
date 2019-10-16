import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchRobot } from '../redux/robot'
import RobotForm from './RobotForm'
import Unassign from './Unassign'

class SingleRobot extends React.Component {
  componentDidMount() {
    this.props.fetchSingleRobot()
  }
  render() {
    const { robot } = this.props
    if (!robot || !robot.name) return <h1>No robot found!</h1>
    return (
      <div>
        <h1>{robot.name}</h1>
        <div className="formDetailContainer">
          <div className="formContainer">
            <h2>Edit Robot:</h2>
            {/* Thanks to this key prop, we'll completely re-mount the form
                when the robot is loaded from the thunk */}
            <RobotForm key={robot.id} />
          </div>
          <div className="singleItemContainer">
            <img src={robot.imageUrl} />
            <div>
              <p>
                <span>Fuel Type:</span> {robot.fuelType}
              </p>
              <p>
                <span>Fuel Level:</span> {robot.fuelLevel}
              </p>
            </div>
          </div>
        </div>
        <div className="robotsProjects">
          <h2>Projects:</h2>
          {robot.projects.length ? (
            robot.projects.map(project => (
              <Link
                className="projectListItem"
                key={project.id}
                to={`/projects/${project.id}`}
              >
                <div>
                  {project.title}{' '}
                  <Unassign robotId={robot.id} projectId={project.id} />
                </div>
              </Link>
            ))
          ) : (
            <p>No projects assigned at this time</p>
          )}
        </div>
      </div>
    )
  }
}

const mapState = ({ robot }) => ({ robot })

const mapDispatch = (dispatch, ownProps) => {
  const id = +ownProps.match.params.id
  return {
    fetchSingleRobot: () => dispatch(fetchRobot(id)),
  }
}

export default connect(
  mapState,
  mapDispatch
)(SingleRobot)
