import axios from 'axios'

// ACTION TYPES
const SET_PROJECT = 'SET_PROJECT'

// ACTION CREATORS
export const setProject = (project) => ({
  type: SET_PROJECT,
  project,
})

// THUNK CREATORS
// gets project by id
export const fetchProject = (id) => async dispatch => {
  try {
    const { data } = await axios.get(`/api/projects/${id}`)
    dispatch(setProject(data))
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_PROJECT:
      return action.project
    default:
      return state
  }
}
