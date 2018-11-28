import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
const mock = new MockAdapter(axios)
const app = require('../server')
const agent = require('supertest')(app)

const mockProjects = [
  { id: 1, title: 'Project One', completed: false },
  { id: 2, title: 'Project Two', completed: true },
  { id: 3, title: 'Project Three', completed: true },
]

const mockRobots = [
  { id: 1, name: 'R2-D2', imageUrl: '/images/r2d2.png' },
  { id: 2, name: 'WALL-E', imageUrl: '/images/walle.jpeg' },
]

beforeEach(() => {
  // Mock GET /api/robots => all robots
  mock.onGet('/api/robots').reply(200, mockRobots)
  // Mock GET /api/projects => all projects
  mock.onGet('/api/projects').reply(200, mockProjects)
  // Mock GET /api/robots/:id => single robot with matching id
  mock.onGet(/\/api\/robots\/\d+/).reply(config => {
    const urlArr = config.url.split('/')
    const id = Number(urlArr.slice(-1)[0])
    const robot = mockRobots.find(rob => rob.id === id)
    return robot ? [200, robot] : [404]
  })
  // Mock GET /api/projects/:id => single project with matching id
  mock.onGet(/\/api\/projects\/\d+/).reply(config => {
    const urlArr = config.url.split('/')
    const id = Number(urlArr.slice(-1)[0])
    const project = mockProjects.find(proj => proj.id === id)
    return project ? [200, project] : [404]
  })
  // If something in the tests doesn't match one of the above routes,
  // use a supertest agent to use the actual API
  mock.onAny().reply(async (req) => {
    const response = await agent[req.method](req.url, req.data)
    return [response.status, response.body]
  })
})

afterEach(() => mock.reset())

export default mock
