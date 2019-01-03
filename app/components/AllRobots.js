import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteRobot } from '../redux'

export const AllRobots = ({ robots = [], destroyRobot }) => {
  if (!robots.length) return <h1>You got no robots! 🤖 😢 </h1>
  return (
    <div>
      <h1>Here are all your robots:</h1>
      <div className="allRobotsContainer">
      {robots.map(robot => (
        <div className="allRobotsItem" key={robot.id}>
          <Link to={`/robots/${robot.id}`}>
            <div>
              <p>{robot.name}</p>
              <img src={robot.imageUrl} />
            </div>
          </Link>
          <button
            type="button"
            className="deleteButton"
            style={{
              backgroundColor: 'orange',
              width: '60px',
            }}
            onClick={() => destroyRobot(robot.id)}>
            X
          </button>
        </div>
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
