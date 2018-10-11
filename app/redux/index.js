import { combineReducers } from 'redux'
import { default as students } from './students'
import { default as campuses } from './campuses'

const appReducer = combineReducers({
  students,
  campuses,
})

export * from './students'
export * from './campuses'
export default appReducer
