import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import { postProject, putProject } from '../redux'

const blankState = {
  title: '',
  description: '',
  deadline: '',
  priority: 1,
}

// This form can be used to create a new project or edit an existing
// one. If passed a project, it pre-populates the form. Otherwise,
// it creates a new project.
export class ProjectForm extends React.Component {
  // Check out these articles for context surrounding setting initial state from props
  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
  // https://zhenyong.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html
  constructor(props) {
    super(props)
    // check if we are in edit mode populate the data if not use the blankState
    if (props.projectToEdit) {
      // we are usign spread operator to get
      this.state = { ...props.projectToEdit }
    } else {
      this.state = blankState
    }
  }

  //
  handleSubmit = event => {
    event.preventDefault()
    // checks if editProject exist then call createOrEdit whit the data otherwise use the other one
    const createOrEdit = this.props.projectToEdit
      ? this.props.editProject
      : this.props.createProject

    createOrEdit(this.state)

    // !this.props.projectToEdit  then reset the form
    if (!this.props.projectToEdit) {
      this.setState(blankState)
    }
  }

  // extracting the name & value from target & update state
  // you can pass it as for name e.target.name & value: e.target.value
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }


  render() {
    console.log("props from  FORM ", this.props)
    const { title, description, deadline, priority } = this.state

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="labelInput">
            <label htmlFor="title">Title: </label>
            <input
              required
              name="title"
              type="text"
              value={title}
              onChange={this.handleChange}
            />
          </div>

          <div className="labelInput">
            <label htmlFor="description">Description: </label>
            <textarea
              name="description"
              value={description}
              onChange={this.handleChange}
            />
          </div>

          <div className="labelInput">
            <label htmlFor="deadline">Deadline: </label>
            <input
              name="deadline"
              type="datetime-local"
              value={
                deadline ? moment(deadline).format('YYYY-MM-DDTkk:mm') : ''
              }
              onChange={this.handleChange}
            />
          </div>

          <div className="labelInput">
            <label htmlFor="priority">Priority: </label>
            <input
              name="priority"
              type="number"
              value={priority}
              onChange={this.handleChange}
            />
          </div>

          <button className="submitButton" type="submit">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

const mapState = ({ project }, ownProps) => {
  // ownProps: the props of the component
  // destructuring project from state
  // gets the id if the projectToEdit exist
  return {
    projectToEdit: ownProps.match.params.id ? project : null,
  }
}

// functions to create or editProject
const mapDispatch = dispatch => ({
  createProject: project => dispatch(postProject(project)),
  editProject: project => dispatch(putProject(project)),
})

// withRouter gives you access to history and props..match.params.id
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(ProjectForm)
)
