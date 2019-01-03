import React from 'react'
import { connect } from 'react-redux'
import { fetchRobot } from '../redux/robot'

class SingleRobot extends React.Component {
  componentDidMount() {
    this.props.fetchSingleRobot()
  }
  render() {
    const { robot } = this.props
    if (!robot || !robot.name) return <h1>No robot found!</h1>
    return (
      <div className="singleRobotContainer">
        <h1>{robot.name}</h1>
        <img src={robot.imageUrl} />
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
