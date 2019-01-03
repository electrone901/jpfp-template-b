import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

export const AllRobots = ({ robots = [] }) => {
  if (!robots.length) return <h1>You got no robots! 🤖 😢 </h1>
  return (
    <div>
      <h1>Here are all your robots:</h1>
      <div className="allRobotsContainer">
      {robots.map(robot => (
        <Link className="allRobotsItem" key={robot.id} to={`/robots/${robot.id}`}>
          <div>
              <p>{robot.name}</p>
              <img src={robot.imageUrl} />
          </div>
        </Link>
      ))}
      </div>
    </div>
  )
}

const mapState = ({ robots }) => ({ robots })

export default connect(mapState)(AllRobots)
