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
    fuelLevel: '',
    imageUrl: '',
  }
  handleSubmit = (event) => {
    event.preventDefault()
    // If the user doesn't specify an imageUrl, set it to
    // the robot's name on RoboHash
    if (!this.state.imageUrl) {
      this.props.createRobot({
        robot: {
          ...this.state,
          imageUrl: `https://robohash.org/${this.state.name}.png`
        }
      })
    } else {
      this.props.createRobot({ robot: this.state })
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
          <input name="name" type="text" value={name} />
          <label htmlFor="fuelType">Fuel Type: </label>
          <input name="fuelType" type="text" value={fuelType} />
          <label htmlFor="fuelLevel">Fuel Level: </label>
          <input name="fuelLevel" type="number" value={fuelLevel} />
          <label htmlFor="imageUrl">Image URL: </label>
          <input name="imageUrl" type="text" value={imageUrl} />
          <button type="submit">Submit</button>

        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  // TODO: Create these methods
  createRobot: (robot) => dispatch(postRobot(robot)),
  editRobot: (id) => dispatch({ id }),
})

export default connect(null, mapDispatch)(RobotForm)
