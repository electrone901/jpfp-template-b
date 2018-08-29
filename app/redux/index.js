// `combineReducers` is not currently being used...but it should!
// When you're ready to use it, un-comment the code below!

// import {combineReducers} from 'redux'

// import campuses from './campuses'
// import students from './students'

// const rootReducer = combineReducers({
//   campuses,
//   students,
// })

const initialState = {}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default rootReducer
