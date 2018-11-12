import { combineReducers } from 'redux'
import robots from './robots'

// This reducer is just a stub. We should probably do something
// with that combineReducers thing up there...
const appReducer = combineReducers({
  robots,
})

export default appReducer
