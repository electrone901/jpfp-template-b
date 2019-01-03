import axios from 'axios'
import { fetchRobots } from './index'

// ACTION TYPES
const SET_PROJECTS = 'SET_PROJECTS'

// ACTION CREATORS
export const setProjects = (projects) => ({
  type: SET_PROJECTS,
  projects,
})

// THUNK CREATORS
export const fetchProjects = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/projects')
    dispatch(setProjects(data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteProject = (id) => async dispatch => {
  try {
    await axios.delete(`/api/projects/${id}`) // We don't need the response body
    // Refresh both projects and robots in case associations have changed
    dispatch(fetchProjects())
    dispatch(fetchRobots())
  } catch (err) {
    console.error(err)
  }
}


// REDUCER
export default function reducer(state = [], action) {
  switch (action.type) {
    case SET_PROJECTS:
      return action.projects
    default:
      return state
  }
}
