import axios from 'axios'

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

// REDUCER
export default function reducer(state = [], action) {
  switch (action.type) {
    case SET_PROJECTS:
      return action.projects
    default:
      return state
  }
}
