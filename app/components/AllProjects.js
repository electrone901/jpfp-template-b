import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteProject } from '../redux'
import ProjectForm from './ProjectForm'

export const AllProjects = ({ projects = [], destroyProject }) => {
  if (!projects.length) return <h1>You got no projects! 📈 💼 </h1>
  return (
    <div>
      <h1>Here are all your projects:</h1>
      <ProjectForm />
      <div className="allProjectsContainer">
      {projects.map(project => (
        <div className="projectListItem" key={project.id}>
          <Link to={`/projects/${project.id}`}>
            <div>
              <h2>{project.title}</h2>
              <p>Priority Rating: {project.priority}</p>
              <p>Completed: {project.completed ? 'Yes' : 'No'}</p>
            </div>
          </Link>
          <button
            type="button"
            className="deleteButton"
            onClick={() => destroyProject(project.id)}>
            X
          </button>
        </div>
      ))}
      </div>
    </div>
  )
}

const mapState = ({ projects }) => ({ projects })

const mapDispatch = (dispatch) => ({
  destroyProject: (id) => dispatch(deleteProject(id)),
})

export default connect(mapState, mapDispatch)(AllProjects)
