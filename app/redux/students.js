import axios from 'axios'

// ACTION TYPES
export const SET_STUDENTS = 'SET_STUDENTS'

// ACTION CREATORS
export const setStudents = (students) => {
  return {
    type: SET_STUDENTS,
    students,
  }
}

// THUNK CREATORS
export const fetchStudents = () => {
  return async dispatch => {
    try {
      const { data: students } = await axios.get('/api/students')
      dispatch(setStudents(students))
    } catch (err) {
      console.error(err)
    }
  }
}

// REDUCER
const initialState = []
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_STUDENTS:
      return action.students
    default:
      return state
  }
}
