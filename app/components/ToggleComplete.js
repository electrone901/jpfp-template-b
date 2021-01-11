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
  //  isComplete is completed coming from props
  // _ maybe a shortcut for store =>  what is _ research tomorrow
  console.log("mapState -> isComplete", isComplete)
  console.log("what is  _", _)
  return {
    isComplete: isComplete,
  }
}

const mapDispatch = (dispatch, { isComplete, projectId }) => {
  return {
    // we getting projectId & completed from props, calls putProject
    toggleProjectCompleted: () =>
      dispatch(putProject({
        id: projectId,
        completed: !isComplete,
      })
      )
  }
}

export default connect(mapState, mapDispatch)(ToggleComplete)
