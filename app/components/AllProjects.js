import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

export const AllProjects = ({ projects = [] }) => {
  if (!projects.length) return <h1>You got no projects! 📈 💼 </h1>
  return (
    <div>
      <h1>Here are all your projects:</h1>
      <div className="allRobotsContainer">
      {projects.map(project => (
        <Link className="allRobotsItem" key={project.id} to="#">
          <div>
              <p>{project.title}</p>
              <p>{project.description}</p>
          </div>
        </Link>
      ))}
      </div>
    </div>
  )
}

const mapState = ({ projects }) => ({ projects })
// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
export default connect(mapState)(AllProjects)
// export default AllProjects
