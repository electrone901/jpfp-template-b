import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchRobot } from '../redux/robot'

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
        <div className="robotsProjects">
          <h2>Projects:</h2>
          {
            robot.projects.length
            ? robot.projects.map(project => (
              <Link className="projectListItem" key={project.id} to={`/projects/${project.id}`}>
                <div>
                  <p>{project.title}</p>
                </div>
              </Link>
            ))
            : <p>No projects assigned at this time</p>
          }
        </div>
      </div>
    )
  }
}

const mapState = ({ robot }) => ({ robot })

const mapDispatch = (dispatch, ownProps) => {
  const id = +ownProps.match.params.id
  return {
    fetchSingleRobot: () => dispatch(fetchRobot(id))
  }
}

export default connect(mapState, mapDispatch)(SingleRobot)
