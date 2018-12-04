import React from 'react';
import {connect} from 'react-redux'

export const AllProjects = (props) => {
  const {projects} = props
  if (!projects || !projects.length) return <div>No Projects</div>

  const projectList = projects.map((project) =>
    (
      <ul key={project.id}>
        <li>Title: {project.title}</li>
        <li>Priority Rating: {project.priority}</li>
        <li>Completed: {project.completed ? 'Yes' : 'No'}</li>
        <li>Description: {project.description}</li>
      </ul>
    )
  )

  return <div>{projectList}</div>
}

const mapState = (state) => {
  return {
    projects: state.projects
  }
}

// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
export default connect(mapState)(AllProjects)
// export default AllProjects
