import React from 'react'
import { connect } from 'react-redux'
import { putProject } from '../redux'

export const ToggleComplete = ({ isComplete, toggleProjectCompleted }) => {
  return (
    <button
      className="toggleCompleteButton"
      style={{ background: isComplete ? '#FCAB10' : '#4CAF50' }}
      type="button"
      onClick={() => toggleProjectCompleted()}>
      Mark {isComplete ? 'Incomplete' : 'Complete'}
    </button>
  )
}

const mapState = (_, { isComplete }) => {
  return {
    isComplete: isComplete,
  }
}

const mapDispatch = (dispatch, { isComplete, projectId }) => {
  return {
    toggleProjectCompleted: () =>
      dispatch(putProject({
        id: projectId,
        completed: !isComplete,
      })
    )
  }
}

export default connect(mapState, mapDispatch)(ToggleComplete)
