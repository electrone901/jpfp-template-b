import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

export const AllRobots = ({ robots = [] }) => {
  if (!robots.length) return <h1>You got no robots! 🤖 😢 </h1>
  return (
    <ul>
      {robots.map(robot => (
        <Link to="#" key={robot.id}>
          {robot.name}
          <img src={robot.imageUrl} />
        </Link>
      ))}
    </ul>
  )
}

const mapState = ({ robots }) => ({ robots })

// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
export default connect(mapState)(AllRobots)
// export default AllRobots
