import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { postRobot } from '../redux'

// This form can be used to create a new robot or edit an existing
// one. If passed a robot, it pre-populates the form. Otherwise,
// it creates a new robot.
export class RobotForm extends React.Component {
  state = {
    name: '',
    fuelType: '',
    fuelLevel: 100,
    imageUrl: '',
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const createOrEdit = this.props.robotToEdit
      ? this.props.editRobot
      : this.props.createRobot
    // If the user doesn't specify an imageUrl, set it to
    // the robot's name on RoboHash
    if (!this.state.imageUrl) {
      createOrEdit({
        robot: {
          ...this.state,
          imageUrl: `https://robohash.org/${this.state.name}.png`
        }
      })
    } else {
      createOrEdit({ robot: this.state })
    }
  }
  static getDerivedStateFromProps(nextProps) {
    return nextProps.robotToEdit
  }
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }
  render() {
    const { name, fuelType, fuelLevel, imageUrl } = this.state
    return (
      <div>
        <form
          className="robotForm"
          onSubmit={this.handleSubmit}>

          <label htmlFor="name">Name: </label>
          <input
            required
            name="name"
            type="text"
            value={name}
            onChange={this.handleChange} />

          <label htmlFor="fuelType">Fuel Type: </label>
          <select name="fuelType" value={fuelType} onChange={this.handleChange}>
            <option value="electric">Electric</option>
            <option value="gas">Gas</option>
            <option value="diesel">Diesel</option>
          </select>

          <label htmlFor="fuelLevel">Fuel Level: </label>
          <input name="fuelLevel" type="number" value={fuelLevel} onChange={this.handleChange} />
          <input
            name="fuelLevel"
            type="range"
            min={1}
            max={100}
            value={fuelLevel}
            onChange={this.handleChange} />

          <label htmlFor="imageUrl">Image URL: </label>
          <input
            name="imageUrl"
            type="text"
            value={imageUrl}
            onChange={this.handleChange} />

          <button type="submit">Submit</button>

        </form>
      </div>
    )
  }
}

const mapState = ({ robot }, ownProps) => {
  // console.log('params: ', ownProps.match.params)
  return {
    robotToEdit: ownProps.match.params.id ? robot : null
  }
}

const mapDispatch = (dispatch) => ({
  createRobot: (robot) => dispatch(postRobot(robot)),
  // TODO: Create this method
  editRobot: (id) => dispatch({ id }),
})

export default withRouter(
  connect(mapState, mapDispatch)(RobotForm)
)
