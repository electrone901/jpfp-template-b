import React from 'react'
import { connect } from 'react-redux'
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
    const createOrEdit = this.props.robot
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
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    const { robot } = this.props
    const { name, fuelType, fuelLevel, imageUrl } = this.state
    if (robot && robot.name) {
      this.setState({
        name: robot.name,
        fuelType: robot.fuelType,
        fuelLevel: robot.fuelLevel,
        imageUrl: robot.imageUrl,
      })
    }
    return (
      <div>
        <h2>New Robot:</h2>
        <form
          className="robotForm"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}>

          <label htmlFor="name">Name: </label>
          <input required name="name" type="text" value={name} />

          <label htmlFor="fuelType">Fuel Type: </label>
          <select name="fuelType" value={fuelType}>
            <option value="electric">Electric</option>
            <option value="gas">Gas</option>
            <option value="diesel">Diesel</option>
          </select>

          <label htmlFor="fuelLevel">Fuel Level: </label>
          <div>
            <input name="fuelLevel" type="number" value={fuelLevel} />
            <input
              name="fuelLevel"
              type="range"
              min={1}
              max={100}
              value={fuelLevel} />
          </div>

          <label htmlFor="imageUrl">Image URL: </label>
          <input name="imageUrl" type="text" value={imageUrl} />

          <button type="submit">Submit</button>

        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  createRobot: (robot) => dispatch(postRobot(robot)),
  // TODO: Create this method
  editRobot: (id) => dispatch({ id }),
})

export default connect(null, mapDispatch)(RobotForm)
