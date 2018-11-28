import MockAdapter from 'axios-mock-adapter';
// const fetch = require('node-fetch')
import axios from 'axios';
// const normalAxios = axios.create()
const mock = new MockAdapter(axios)
const app = require('../server')
const agent = require('supertest')(app)

const mockProjects = [
  { id: 1, title: 'Project One', completed: false },
  { id: 2, title: 'Project Two', completed: true },
  { id: 3, title: 'Project Three', completed: true },
]

beforeEach(() => {
  mock.onGet('/api/robots').reply(200, [
    { id: 1, name: 'R2-D2', imageUrl: '/images/r2d2.png' },
    { id: 2, name: 'WALL-E', imageUrl: '/images/walle.jpeg' },
  ])
  mock.onAny().reply(async (req) => {
    console.log('req >>>> ', req)
    const response = await agent[req.method](req.url, req.data)
    console.log('response >>>>>> ', response.body)
    return [response.status, response.body]
  })
  // mock.onGet('/api/projects').replyOnce(200, mockProjects)
  // mock.onGet('/api/projects/1').replyOnce(200, mockProjects[0])
  // mock.onGet('/api/projects/2').replyOnce(200, mockProjects[1])
  // mock.onGet('/api/projects/3').replyOnce(200, mockProjects[2])
  // mock.onGet('/users', { params: { searchText: 'John' } }).reply(200, {
  //   users: [
  //     { id: 1, name: 'John Smith' }
  //   ]
  // })
  // .onAny()
  // .passThrough()
  // mock.onAny().passThrough() // what does passThrough really do? Can you change the PORT it goes to?
  // mock.onAny().reply(async (request) => {
  //   console.log('REQUEST >>>>>>', request)
  //   const response = await fetch('http://localhost:1337' + request.url, {
  //     method: request.method,
  //     body: request.data,
  //   })
  //   return response.json()
  //   // return normalAxios.get(`http://localhost:1337/api/projects`)
  // })
})

afterEach(() => mock.reset());

export default mock;
