import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteProject } from '../redux'
import ProjectForm from './ProjectForm'

// we are using destructuring here to get projects from props & destroyProject function
export const AllProjects = ({ projects = [], destroyProject }) => {
  if (!projects.length) return <h1>You got no projects! 📈 💼 </h1>

  return (
    <div>
      <h1>📈 PROJECTS 📈</h1>
      <div className="formListContainer">

        {/* FORM TO ADD PROJECT  */}
        <div className="formContainer">
          <h2>Create a Project:</h2>
          {/* For create a new project we don't pass any props just display the form */}
          <ProjectForm />
        </div>

        {/* DISPLAY PROJECTS  */}
        <div className="listContainer">
          {projects.map(project => (
            <div className="projectListItem" key={project.id}>
              <Link to={`/projects/${project.id}`}>
                <div>
                  <h3>{project.title}</h3>
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

    </div>
  )
}

const mapState = ({ projects }) => ({
  projects
})

const mapDispatch = (dispatch) => ({
  // destroyProject by id
  destroyProject: (id) => dispatch(deleteProject(id)),
})

export default connect(mapState, mapDispatch)(AllProjects)
