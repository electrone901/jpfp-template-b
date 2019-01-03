import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteRobot } from '../redux/robots'

export const AllRobots = ({ robots = [], destroyRobot }) => {
  if (!robots.length) return <h1>You got no robots! 🤖 😢 </h1>
  return (
    <div>
      <h1>Here are all your robots:</h1>
      <div className="allRobotsContainer">
      {robots.map(robot => (
        <Link key={robot.id} className="allRobotsItem" to={`/robots/${robot.id}`}>
          <div>
            <p>{robot.name}</p>
            <img src={robot.imageUrl} />
          </div>
          <button
            type="button"
            style={{
              backgroundColor: 'orange',
              width: '60px',
            }}
            onClick={() => destroyRobot(robot.id)}>
            X
          </button>
        </Link>
      ))}
      </div>
    </div>
  )
}

const mapState = ({ robots }) => ({ robots })
const mapDispatch = (dispatch) => ({
  destroyRobot: (id) => dispatch(deleteRobot(id)),
})

export default connect(mapState, mapDispatch)(AllRobots)
