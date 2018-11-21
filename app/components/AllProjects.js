import React from 'react';

export const AllProjects = (props) => {
  const projects = props.projects
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

  console.log('projects', projectList.length)
  return <div>{projectList.length ? projectList : 'No Projects'}</div>
}

// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
// export default connect(mapState, mapDispatch)(AllProjects)
export default AllProjects
