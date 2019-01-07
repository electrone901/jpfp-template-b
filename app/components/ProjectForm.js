import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import { postProject, putProject } from '../redux'

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
          onSubmit={this.handleSubmit}>

          <div className="labelInput">
            <label htmlFor="title">Title: </label>
            <input
              required
              name="title"
              type="text"
              value={title}
              onChange={this.handleChange} />
          </div>

          <div className="labelInput">
            <label htmlFor="description">Description: </label>
            <textarea
              name="description"
              value={description}
              onChange={this.handleChange} />
          </div>

          <div className="labelInput">
            <label htmlFor="deadline">Deadline: </label>
            <input
              name="deadline"
              type="datetime-local"
              value={moment(deadline).format('YYYY-MM-DDTkk:mm')}
              onChange={this.handleChange} />
          </div>

          <div className="labelInput">
            <label htmlFor="priority">Priority: </label>
            <input
              name="priority"
              type="number"
              value={priority}
              onChange={this.handleChange} />
          </div>

          <div className="labelInput">
            <label htmlFor="completed">Completed? </label>
            <input
              name="completed"
              type="checkbox"
              value={completed}
              onChange={this.handleChange} />
          </div>

          <button className="submitButton" type="submit">Submit</button>

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
