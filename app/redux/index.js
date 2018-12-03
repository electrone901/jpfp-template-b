import { combineReducers } from 'redux'

// This reducer is just a stub. We should probably do something
// with that combineReducers thing up there...

const projectReducer = (projectState = [], action) => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return action.projects
    default:
      return projectState
  }
}

const appReducer = combineReducers({projects: projectReducer})

export default appReducer
