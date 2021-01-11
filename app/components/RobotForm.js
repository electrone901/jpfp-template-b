import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { postRobot, putRobot } from '../redux'

const blankState = {
  name: '',
  fuelType: '',
  fuelLevel: '100',
  imageUrl: '',
}

// This form can be used to create a new robot or edit an existing
// one. If passed a robot, it pre-populates the form. Otherwise,
// it creates a new robot.
export class RobotForm extends React.Component {
  // Check out these articles for context surrounding setting initial state from props
  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
  // https://zhenyong.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html
  constructor(props) {
    super(props)
    if (props.robotToEdit) {
      this.state = { ...props.robotToEdit }
    } else {
      this.state = blankState
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const createOrEdit = this.props.robotToEdit
      ? this.props.editRobot
      : this.props.createRobot
    createOrEdit(this.state)

    // if not projectToEdit reset the state after submit
    if (!this.props.projectToEdit) {
      this.setState(blankState)
    }
  }
  handleChange = e =>  {
    let fieldName = e.target.name;
    let fieldVal = e.target.value;
    this.setState({
      [fieldName]: fieldVal
     })
  }
  render() {
    const { name, fuelType, fuelLevel, imageUrl } = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="labelInput">
            <label htmlFor="name">Name: </label>
            <input
              required
              name="name"
              type="text"
              value={name}
              onChange={this.handleChange}
            />
          </div>

          <div className="labelInput">
            <label htmlFor="fuelType">Fuel Type: </label>
            <select
              name="fuelType"
              value={fuelType}
              onChange={this.handleChange}
            >
              <option value="electric">Electric</option>
              <option value="gas">Gas</option>
              <option value="diesel">Diesel</option>
            </select>
          </div>

          <div className="labelInput">
            <label htmlFor="fuelLevel">Fuel Level: </label>
            <input
              name="fuelLevel"
              type="number"
              value={fuelLevel}
              onChange={this.handleChange}
            />
          </div>

          <div className="labelInput">
            <label htmlFor="imageUrl">Image URL: </label>
            <input
              name="imageUrl"
              type="text"
              value={imageUrl}
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

const mapState = ({ robot }, ownProps) => {
  return {
    robotToEdit: ownProps.match.params.id ? robot : null,
  }
}

const mapDispatch = dispatch => ({
  createRobot: robot => dispatch(postRobot(robot)),
  editRobot: robot => dispatch(putRobot(robot)),
})

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(RobotForm)
)
