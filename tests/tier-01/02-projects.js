const { expect } = require('chai');
import enzyme, { mount } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16.3'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import * as rrd from 'react-router-dom'
const { MemoryRouter } = rrd

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {
  projects: [],
}

import mockAxios, { mockProjects, anHourFromNow } from '../mock-axios'
import { setProjects, fetchProjects } from '../../app/redux/projects'

import appReducer from '../../app/redux'
import { createStore } from 'redux'
import store from '../../app/store'

const app = require('../../server')
const agent = require('supertest')(app)

const { db } = require('../../server/db')
const { Project } = require('../../server/db')
const seed = require('../../seed')

const adapter = new Adapter()
enzyme.configure({ adapter })

import ConnectedAllProjects, { AllProjects } from '../../app/components/AllProjects'
import Root from '../../app/components/root'

// Sometimes, we want to wait for a short time for async events to finish.
const waitFor = (wait) =>
  new Promise((resolve) => setTimeout(resolve, wait))

describe.only('Tier One: Projects', () => {
  let fakeStore
  const projects = [
    { id: 1, title: 'Build barn', description: 'Lorem Ipsum' },
    { id: 2, title: 'Discover love', completed: true, deadline: anHourFromNow },
    { id: 3, title: 'Open the pod bay doors', priority: 10 },
    { id: 4, title: 'Make pizza', priority: 4, completed: true, description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem' },
  ]
  beforeEach(() => {
    fakeStore = mockStore(initialState)
  })

  describe('<AllProjects /> component', () => {
    it('renders the projects passed in as props', () => {
      const wrapper = mount(
        <Provider store={fakeStore}>
          <MemoryRouter>
            <AllProjects projects={mockProjects} />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.text()).to.include('Build barn')
      expect(wrapper.text()).to.include('Make pizza')
    })

    xit('*** renders "No Projects" if passed an empty array of projects', () => {
      throw new Error('replace this error with your own test')
    })
  })

  describe('Redux', () => {
    beforeEach(() => {
      fakeStore = mockStore(initialState)
    })

    describe('set projects', () => {
      // const anHourFromNow = new Date(Date.now() + 60 * (60 * 1000))
      // TODO: Use the same mock data from mock-axios
      // const projects = [
      //   {
      //     id: 1,
      //     title: 'build barn',
      //     deadline: anHourFromNow,
      //     priority: 9,
      //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      //   },
      //   {
      //     id: 2,
      //     title: 'make pizza',
      //     priority: 4,
      //     completed: true,
      //     description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem'
      //   }
      // ]

      it('setProjects action creator', () => {
        expect(setProjects(mockProjects)).to.deep.equal({
          type: 'SET_PROJECTS',
          projects: mockProjects,
        })
      })

      it('fetchProjects thunk creator', async () => {
        await fakeStore.dispatch(fetchProjects())
        const actions = fakeStore.getActions()
        expect(actions[0].type).to.equal('SET_PROJECTS')
        expect(actions[0].projects).to.deep.equal(mockProjects)
      })
    })

    describe('reducer', () => {
      let testStore
      beforeEach(() => {
        testStore = createStore(appReducer)
      })

      xit('*** returns the initial state by default', () => {
        throw new Error('replace this error with your own test')
      })

      it('reduces on SET_STUDENTS action', () => {
        // const anHourFromNow = new Date(Date.now() + 60 * (60 * 1000))
        // const projects = [
        //   {
        //     id: 1,
        //     title: 'build barn',
        //     deadline: anHourFromNow,
        //     priority: 9,
        //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        //   },
        //   {
        //     id: 2,
        //     title: 'make pizza',
        //     priority: 4,
        //     completed: true,
        //     description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem'
        //   }
        // ]
        const action = { type: 'SET_PROJECTS', projects: mockProjects }

        const prevState = testStore.getState()
        testStore.dispatch(action)
        const newState = testStore.getState()

        expect(newState.projects).to.be.deep.equal(mockProjects);
        expect(newState.projects).to.not.be.equal(prevState.projects);
      })
    })

    describe('react-redux', () => {

      it('initializes projects from the server when the app first loads', async () => {
        const reduxStateBeforeMount = store.getState()
        expect(reduxStateBeforeMount.projects).to.deep.equal([])
        mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={['/']}>
              <Root />
            </MemoryRouter>
          </Provider>
        )
        await waitFor(10) // wait for 10 milliseconds
        const reduxStateAfterMount = store.getState()
        expect(reduxStateAfterMount.projects).to.deep.equal(projects)
      })

      it('<AllProjects /> is passed projects from store as props', async () => {
        const wrapper = mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={['/projects']}>
              <ConnectedAllProjects />
            </MemoryRouter>
          </Provider>
        )
        store.dispatch(fetchProjects()) // fetch the projects
        await waitFor(10) // wait for 10 milliseconds
        wrapper.update() // forces the component to re-render airbnb.io/enzyme/docs/api/ShallowWrapper/update.html
        const { projects: reduxProjects } = store.getState()
        const { projects: componentProjects } = wrapper.find(AllProjects).props()
        expect(componentProjects).to.deep.equal(reduxProjects)
      })
    })
  })

  describe('Express API', () => {
    // Let's test our Express routes WITHOUT actually using the database.
    // By replacing the findAll methods on the Project and Robot models
    // with a spy, we can ensure that our API tests won't fail just because
    // our Sequelize models haven't been implemented yet.
    const { findAll: projectFindAll } = Project
    const fakeFindAll = sinon.fake.resolves(mockProjects)
    beforeEach(() => {
      // const anHourFromNow = new Date(Date.now() + 60 * (60 * 1000))
      // Project.findAll = sinon.spy(() => [
      //   {
      //     id: 1,
      //     title: 'build barn',
      //     deadline: anHourFromNow,
      //     priority: 9,
      //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      //   },
      //   {
      //     id: 2,
      //     title: 'make pizza',
      //     priority: 4,
      //     completed: true,
      //     description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem'
      //   }
      // ])
      sinon.replace(Project, 'findAll', fakeFindAll)
    })
    afterEach(() => {
      Project.findAll = projectFindAll
    })

    it('*** GET /api/projects responds with all projects', async () => {
      // throw new Error('replace this error with your own test')
      const response = await agent
        .get('/api/projects')
        .timeout({ deadline: 20 })
        .expect(200)
      expect(response.body).to.deep.equal(mockProjects)
      expect(Project.findAll.calledOnce).to.be.equal(true)
    })
  })

  describe('Sequelize Model', () => {
    // clear database before the 'describe' block
    before(() => db.sync({ force: true }))
    // clear the database after each 'it' block
    afterEach(() => db.sync({ force: true }))

    xit('has fields title, deadline, priority, completed, description', async () => {
      const project = {
        title: 'build barn',
        priority: 9,
        completed: false,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      }
      project.notARealAttribute = 'does not compute'
      const savedProject = await Project.create(project)
      expect(savedProject.title).to.equal('build barn')
      expect(savedProject.priority).to.equal(9)
      expect(savedProject.completed).to.equal(false)
      expect(savedProject.description).to.equal('Lorem ipsum dolor sit amet, consectetur adipiscing elit')
    })

    xit('requires title', async () => {
      const project = Project.build()
      try {
        await project.validate()
        throw Error('validation should have failed without title')
      }
      catch (err) {
        expect(err.message).to.contain('title cannot be null')
      }
    })

    xit('title cannot be empty', async () => {
      const project = Project.build({ title: '', priority: 8})
      try {
        await project.validate()
        throw Error('validation should have failed with empty title')
      }
      catch (err) {
        expect(err.message).to.contain('Validation notEmpty on title')
      }
    })

    xit('*** deadline must be a valid date', async () => {
      throw new Error('replace this error with your own test')
    })

    xit('priority must be an integer between 1 and 10', async () => {
      const project = {
        title: 'make pizza',
        deadline: new Date(2018, 11, 31),
        priority: 15,
        completed: false,
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem'
      }
      const highPriority = Project.build(project)
      try {
        await highPriority.validate()
        throw Error('validation should have failed with too high priority')
      }
      catch (err) {
        expect(err.message).to.contain('Validation max on priority')
      }
      project.priority = 0
      const lowPriority = Project.build(project)
      try {
        await lowPriority.validate()
        throw Error('validation should have failed with too low priority')
      }
      catch (err) {
        expect(err.message).to.contain('Validation min on priority')
      }
    })

    xit('default completed to false if left blank', () => {
      const project = Project.build({ title: 'clean room', priority: 5})
      expect(project.completed).to.be.a('boolean')
      expect(project.completed).to.equal(false)
    })
  })
  describe('Seed File', () => {
    beforeEach(seed)

    it('populates the database with at least three projects', async () => {
      const seedProjects = await Project.findAll()
      expect(seedProjects).to.have.lengthOf.at.least(3)
    })
    // If you've finished this part, remember to run the seed file from the
    // command line to populate your actual database (rather than just the
    // test database). Fire it up with npm run start-dev and see what it looks
    // like in the browser!
  })
})


/*

Tier One: Robots
  <AllRobots /> component
    ✓ renders the robots passed in as props
    ✓ *** renders "No Robots" if passed an empty array of robots
  Navigation
    ✓ renders <AllRobots /> at path /robots
    ✓ *** navbar has links to "/robots" and "/" (homepage)
  Redux
    set/fetch robots
      ✓ setRobots action creator
      ✓ fetchRobots thunk creator
    robots reducer
      ✓ *** returns the initial state by default
      ✓ reduces on SET_ROBOTS action
    react-redux
      ✓ initializes robots from the server when the app first loads
      ✓ <AllRobots /> is passed robots from store as props
  Express API
    ✓ GET /api/robots responds with all robots
    ✓ GET /api/robots responds with error 500 when database throws error
  Sequelize Model
    ✓ has fields name, imageUrl, fuelType, fuelLevel
    ✓ *** name cannot be null or an empty string
    ✓ fuelType can only be gas, diesel, or electric (defaults to electric)
    ✓ fuelLevel must be between 0 and 100 (defaults to 100)
  Seed File
    ✓ populates the database with at least three robots

*/
