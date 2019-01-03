import { combineReducers } from 'redux'
import robots from './robots'
import robot from './robot'
import projects from './projects'

// This reducer is just a stub. We should probably do something
// with that combineReducers thing up there...

const appReducer = combineReducers({
  robots, // all robots
  robot, // single robot
  projects, // all projects
})

export default appReducer
