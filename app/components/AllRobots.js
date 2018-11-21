import React from 'react';
import { connect } from 'react-redux'

export const AllRobots = ({ robots = [] }) => {
  if (!robots.length) return (<h1>You got no robots</h1>)
  return (
    <div>
      {robots.map(robot => (
        <div key={robot.id}>
          <p>{robot.name}</p>
          <img src={robot.imageUrl} />
        </div>
      ))}
    </div>
  )
}

const mapState = ({ robots }) => ({ robots })

// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
export default connect(mapState)(AllRobots)
// export default AllRobots
