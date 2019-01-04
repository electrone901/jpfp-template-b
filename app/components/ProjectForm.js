import React from 'react'
import { connect } from 'react-redux'
import { postProject } from '../redux'

// This form can be used to create a new robot or edit an existing
// one. If passed a robot, it pre-populates the form. Otherwise,
// it creates a new robot.
export class ProjectForm extends React.Component {
  state = {
    title: '',
    description: '',
    deadline: '',
    priority: 1,
    completed: false,
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.createProject({ project: this.state })
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    const { project } = this.props
    const { title, description, deadline, priority, completed } = this.state
    if (project && project.title) {
      this.setState({
        title: project.title,
        description: project.description,
        deadline: project.deadline,
        priority: project.priority,
        completed: project.completed,
      })
    }
    return (
      <div>
        <h2>New Project:</h2>
        <form
          className="projectForm"
          onSubmit={this.handleSubmit}>

          <label htmlFor="title">Title: </label>
          <input required name="title" type="text" value={title} onChange={this.handleChange} />

          <label htmlFor="description">Description: </label>
          <input type="text" name="description" value={description} onChange={this.handleChange} />

          <label htmlFor="deadline">Image URL: </label>
          <input name="deadline" type="date" value={deadline} onChange={this.handleChange} />

          <label htmlFor="priority">Priority: </label>
          <input name="priority" type="number" value={priority} onChange={this.handleChange} />

          <label htmlFor="completed">Completed? </label>
          <input name="completed" type="checkbox" value={completed} onChange={this.handleChange} />

          <button type="submit">Submit</button>

        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  createProject: (project) => dispatch(postProject(project)),
  // TODO: Create this method
  editProject: (id) => dispatch({ id }),
})

export default connect(null, mapDispatch)(ProjectForm)
