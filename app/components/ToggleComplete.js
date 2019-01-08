import React from 'react'
import { connect } from 'react-redux'
import { putProject } from '../redux'

export const ToggleComplete = (props) => {
  const { isComplete, toggleProjectCompleted } = props
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

const mapState = (_, ownProps) => {
  // console.log('ownProps', ownProps)
  return {
    isComplete: ownProps.isComplete,
  }
}

const mapDispatch = (dispatch, ownProps) => {
  console.log('ownProps in Dispatch', ownProps)
  const { isComplete, projectId } = ownProps
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
