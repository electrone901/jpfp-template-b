import Axios from "axios";

export const setProjects = (projects) => {
  return {
    type: 'SET_PROJECTS',
    projects
  }
}

export const fetchProjects = () => {
  return async (dispatch) => {
    const {data} = await Axios.get('/api/projects')
    dispatch(setProjects(data))
  }
}
