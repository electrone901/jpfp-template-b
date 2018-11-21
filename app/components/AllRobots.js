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
        <Link className="allRobotsItem" key={robot.id} to="#">
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

// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
export default connect(mapState)(AllRobots)
// export default AllRobots
