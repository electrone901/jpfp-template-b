import React from 'react'
import { connect } from 'react-redux'

// const sampleRobot = {
//   id: 7,
//   name: 'Fred',
//   imageUrl: '/images/c3po.png',
//   fuelType: 'electric',
//   fuelLevel: 95.6,
// }

export const SingleRobot = (props) => {
  console.log('props', props)
  const { robot } = props
  if (!robot || !robot.name) return <h1>No robot found!</h1>
  console.log()
  return (
    <div className="singleRobotContainer">
      <h1>{robot.name}</h1>
      <img src={robot.imageUrl} />
    </div>
  )
}

const mapState = ({ robots }, ownProps) => ({
  robot: robots.find(robot => robot.id === +ownProps.match.params.id)
})

export default connect(mapState)(SingleRobot)
