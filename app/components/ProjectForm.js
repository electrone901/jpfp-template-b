import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { postProject, putProject } from '../redux'

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
    const createOrEdit = this.props.projectToEdit
      ? this.props.editProject
      : this.props.createProject
    createOrEdit(this.state)
  }
  static getDerivedStateFromProps(nextProps) {
    return nextProps.projectToEdit
  }
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }
  render() {
    const { title, description, deadline, priority, completed } = this.state
    return (
      <div>
        <form
          className="projectForm"
          onSubmit={this.handleSubmit}>

          <label htmlFor="title">Title: </label>
          <input
            required
            name="title"
            type="text"
            value={title}
            onChange={this.handleChange} />

          <label htmlFor="description">Description: </label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={this.handleChange} />

          <label htmlFor="deadline">Deadline: </label>
          <input
            name="deadline"
            type="datetime-local"
            value={deadline}
            onChange={this.handleChange} />

          <label htmlFor="priority">Priority: </label>
          <input
            name="priority"
            type="number"
            value={priority}
            onChange={this.handleChange} />

          <label htmlFor="completed">Completed? </label>
          <input
            name="completed"
            type="checkbox"
            value={completed}
            onChange={this.handleChange} />

          <button type="submit">Submit</button>

        </form>
      </div>
    )
  }
}

const mapState = ({ project }, ownProps) => {
  return {
    projectToEdit: ownProps.match.params.id ? project : null
  }
}

const mapDispatch = (dispatch) => ({
  createProject: (project) => dispatch(postProject(project)),
  editProject: (project) => dispatch(putProject(project)),
})

export default withRouter(
  connect(mapState, mapDispatch)(ProjectForm)
)
