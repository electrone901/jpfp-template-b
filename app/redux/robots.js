import axios from 'axios'
import {
  fetchProjects,
  fetchRobot,
  // fetchProject,
  setRobot,
  setProject,
} from './index'

// ACTION TYPES
const SET_ROBOTS = 'SET_ROBOTS'
const ADD_ROBOT = 'ADD_ROBOT'
const EDIT_ROBOT = 'EDIT_ROBOT'

// ACTION CREATORS
export const setRobots = (robots) => ({
  type: SET_ROBOTS,
  robots,
})

export const addRobot = (robot) => ({
  type: ADD_ROBOT,
  robot,
})

export const editRobot = (robot) => ({
  type: EDIT_ROBOT,
  robot,
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

export const postRobot = (robot) => async dispatch => {
  try {
    const { data } = await axios.post('/api/robots', robot)
    dispatch(addRobot(data))
  } catch (err) {
    console.error(err)
  }
}

export const putRobot = (robot) => async dispatch => {
  try {
    const { data } = await axios.put(`/api/robots/${robot.id}`, robot)
    dispatch(editRobot(data))
    dispatch(fetchRobot(robot.id))
  } catch (err) {
    console.error(err)
  }
}

// This thunk creator could have just as easily been in the projects reducer
export const unassign = (robotId, projectId) => async dispatch => {
  try {
    const { data: { robot, project } } = await axios.delete(
      `/api/robots/${robotId}/projects/${projectId}`
    )
    dispatch(setRobot(robot))
    dispatch(setProject(project))
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export default function reducer(state = [], action) {
  switch (action.type) {
    case SET_ROBOTS:
      return action.robots
    case ADD_ROBOT:
      return [...state, action.robot]
    case EDIT_ROBOT:
      return state.map(robot => {
        return robot.id === action.robot.id
                ? action.robot
                : robot
      })
    default:
      return state
  }
}
