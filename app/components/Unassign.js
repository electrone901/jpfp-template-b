import React from 'react'
import { connect } from 'react-redux'
import { unassign } from '../redux'

export const Unassign = ({ unassignRobotProject }) => {
  return (
    <button
      className="unassignButton"
      type="button"
      onClick={() => unassignRobotProject()}>
      Unassign
    </button>
  )
}

const mapDispatch = (dispatch, { robotId, projectId }) => {
  return {
    unassignRobotProject: () =>
      dispatch(unassign({
        robotId,
        projectId,
      })
    )
  }
}

export default connect(null, mapDispatch)(Unassign)
