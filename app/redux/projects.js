import axios from 'axios'
// we import these to reuse them
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
    // console.log('DATA', data)
    // const cleanedData = data.map(project => {
    //   return {
    //     ...project,
    //     deadline: new Date(project.deadline).toLocaleDateString('en-US'),
    //   }
    // })
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

//creates a project
export const postProject = (project) => async dispatch => {
  try {
    const { data } = await axios.post('/api/projects', project)
    dispatch(addProject(data))
  } catch (err) {
    console.error(err)
  }
}

//edits a project by id
export const putProject = (project) => async dispatch => {
  try {
    const { data } = await axios.put(`/api/projects/${project.id}`, project)
    // updates a project in allProjects in the store
    dispatch(editProject(data))
     // updates the project in sinlgeProject in the store
    dispatch(fetchProject(project.id))
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
// initially the state is []
export default function reducer(state = [], action) {
  switch (action.type) {
    case SET_PROJECTS:
      // set  action.projects to be the new state
      return action.projects
    case ADD_PROJECT:
      // makes a  copy of the state, combines the new action.project and returns it
      return [...state, action.project]
    case EDIT_PROJECT:
      // gets projects & finds the project to update then updates that project with the payload/the  action.robot otherwise return the original robot
      return state.map(project => {
        return project.id === action.project.id
          ? action.project
          : project
      })
    default:
      return state
  }
}
