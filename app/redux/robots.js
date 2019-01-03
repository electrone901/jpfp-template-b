import axios from 'axios'
import { fetchProjects } from './index'

// ACTION TYPES
const SET_ROBOTS = 'SET_ROBOTS'

// ACTION CREATORS
export const setRobots = (robots) => ({
  type: SET_ROBOTS,
  robots,
})

// THUNK CREATORS
export const fetchRobots = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/robots')
    dispatch(setRobots(data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteRobot = (id) => async dispatch => {
  try {
    await axios.delete(`/api/robots/${id}`) // We don't need the response body
    // Refresh both projects and robots in case associations have changed
    dispatch(fetchRobots())
    dispatch(fetchProjects())
  } catch (err) {
    console.error(err)
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
