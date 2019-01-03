import { combineReducers } from 'redux'
import robots from './robots'
import robot from './robot'
import projects from './projects'
import project from './project'

// This reducer is just a stub. We should probably do something
// with that combineReducers thing up there...

const appReducer = combineReducers({
  robots, // all robots
  robot, // single robot
  projects, // all projects
  project, // single project
})

// Export all the named exports from this file
export * from './robots'
export * from './robot'
export * from './projects'
export * from './project'
// Export the combined reducer as default export
export default appReducer
