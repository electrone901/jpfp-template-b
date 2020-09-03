import { combineReducers } from 'redux'
import robots from './robots'
import robot from './robot'
import projects from './projects'
import project from './project'

// The combineReducers takes all the reducers and combines into a single state. Here we are using the new es6 to assigned values since the have the same name we can just add robots.
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
