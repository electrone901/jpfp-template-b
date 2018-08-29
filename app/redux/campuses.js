import axios from 'axios'

// ACTION TYPES
export const SET_CAMPUSES = 'SET_CAMPUSES'

// ACTION CREATORS
export const setCampuses = (campuses) => {
  return {
    type: SET_CAMPUSES,
    campuses,
  }
}

// THUNK CREATORS
export const fetchCampuses = () => {
  return async dispatch => {
    try {
      const { data: campuses } = await axios.get('/api/campuses')
      dispatch(setCampuses(campuses))
    } catch (err) {
      console.error(err)
    }
  }
}

// REDUCER
const initialState = []
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CAMPUSES:
      return action.campuses
    default:
      return state
  }
}
