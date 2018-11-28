import axios from 'axios'

// ACTION TYPES
const SET_PROJECTS = 'SET_PROJECTS'

// ACTION CREATORS
export const setProjects = (projects) => ({
  type: SET_PROJECTS,
  projects,
})

export const fetchProjects = () => async dispatch => {
  try {
    // console.log('fetch Projects >>>>>>>>  ')
    const { data } = await axios.get('/api/projects')
    // console.log('DATA >>>>>>>>  ', data)
    // setTimeout(() => dispatch(setProjects(data)), 2000)
    dispatch(setProjects(data))
  } catch (err) {
    console.error(err)
  }
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case SET_PROJECTS:
      return action.projects
    default:
      return state
  }
}
