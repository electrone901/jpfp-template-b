import axios from 'axios'

// ACTION TYPES
const SET_ROBOT = 'SET_ROBOT'

// ACTION CREATORS
export const setRobot = (robot) => ({
  type: SET_ROBOT,
  robot,
})

// THUNK CREATORS
export const fetchRobot = (id) => async dispatch => {
  try {
    const { data } = await axios.get(`/api/robots/${id}`)
    dispatch(setRobot(data))
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_ROBOT:
      return action.robot
    default:
      return state
  }
}
