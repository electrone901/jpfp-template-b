import axios from 'axios'
import { fetchRobots, fetchProject } from './index'

// ACTION TYPES
const SET_PROJECTS = 'SET_PROJECTS'
const ADD_PROJECT = 'ADD_PROJECT'
const EDIT_PROJECT = 'EDIT_PROJECT'

// ACTION CREATORS
export const setProjects = (projects) => ({
  type: SET_PROJECTS,
  projects,
})

export const addProject = (project) => ({
  type: ADD_PROJECT,
  project,
})

export const editProject = (project) => ({
  type: EDIT_PROJECT,
  project,
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

export const postProject = (project) => async dispatch => {
  try {
    const { data } = await axios.post('/api/projects', project)
    dispatch(addProject(data))
  } catch (err) {
    console.error(err)
  }
}

export const putProject = (project) => async dispatch => {
  try {
    const { data } = await axios.put(`/api/projects/${project.id}`, project)
    dispatch(editProject(data))
    dispatch(fetchProject(project.id))
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export default function reducer(state = [], action) {
  switch (action.type) {
    case SET_PROJECTS:
      return action.projects
    case ADD_PROJECT:
      return [...state, action.project]
    case EDIT_PROJECT:
      return state.map(project => {
        return project.id === action.project.id
                ? action.project
                : project
      })
    default:
      return state
  }
}
