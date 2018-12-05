import axios from 'axios'

// ACTION TYPES
const SET_ROBOTS = 'SET_ROBOTS'

// ACTION CREATORS
export const setRobots = (robots) => ({
  type: SET_ROBOTS,
  robots,
})

// THUNK CREATORS
// export const fetchRobots = () => async dispatch => {
//   try {
//     const { data } = await axios.get('/api/robots')
//     dispatch(setRobots(data))
//   } catch (err) {
//     console.error(err)
//   }
// }
export const fetchRobots = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/robots/')
    dispatch(setRobots(data))
  }
}

// REDUCER
export default function reducer(state = [], action) {
  switch (action.type) {
    case SET_ROBOTS:
      return action.robots
    default:
      return state
  }
}
