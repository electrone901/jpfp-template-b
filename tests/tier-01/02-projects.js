const { expect } = require('chai');
import enzyme, { mount } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16.3'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {
  projects: [],
}

import mockAxios from '../mock-axios'
import { setProjects, fetchProjects } from '../../app/redux/projects'

import appReducer from '../../app/redux'
import { createStore } from 'redux'

const app = require('../../server')
const agent = require('supertest')(app)

const { db } = require('../../server/db')
const { Project } = require('../../server/db')

const adapter = new Adapter()
enzyme.configure({ adapter })

import { AllProjects } from '../../app/components/AllProjects'

describe('Tier One: Projects', () => {
  let fakeStore
  beforeEach(() => {
    fakeStore = mockStore(initialState)
  })

  describe('<AllProjects /> component', () => {
    xit('renders the projects passed in as props', () => {
      const projects = [
        {
          id: 1,
          title: 'Title - Test Project 1',
          priority: 9,
          completed: true,
          description: 'description of test project 1'
        },
        {
          id: 2,
          title: 'Title - Test Project 2',
          priority: 4,
          completed: false,
          description: 'description of test project 2'
        }
      ]
      const wrapper = mount(
        <Provider store={fakeStore}>
          <MemoryRouter>
            <AllProjects projects={projects} />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.text()).to.include('Title - Test Project 1')
      expect(wrapper.text()).to.include('Title - Test Project 2')
    })

    xit('*** renders "No Projects" if passed an empty array of projects', () => {
      throw new Error('replace this error with your own test')
    })
  })

  describe('Redux', () => {
    let fakeStore
    beforeEach(() => {
      fakeStore = mockStore(initialState)
    })

    describe('set projects', () => {
      const projects = [
        {
          id: 1,
          title: 'Title - Test Project 1',
          priority: 9,
          completed: true,
          description: 'description of test project 1'
        },
        {
          id: 2,
          title: 'Title - Test Project 2',
          priority: 4,
          completed: false,
          description: 'description of test project 2'
        }
      ]

      xit('setProjects action creator', () => {
        expect(setProjects(projects)).to.deep.equal({
          type: 'SET_PROJECTS',
          projects,
        })
      })

      xit('fetchProjects thunk creator', async () => {
        mockAxios.onGet('/api/projects').replyOnce(200, projects)
        await fakeStore.dispatch(fetchProjects())
        const actions = fakeStore.getActions()
        expect(actions[0].type).to.equal('SET_PROJECTS')
        expect(actions[0].projects).to.deep.equal(projects)
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

      xit('reduces on SET_STUDENTS action', () => {
        const projects = [
          {
            id: 1,
            title: 'Title - Test Project 1',
            priority: 9,
            completed: true,
            description: 'description of test project 1'
          },
          {
            id: 2,
            title: 'Title - Test Project 2',
            priority: 4,
            completed: false,
            description: 'description of test project 2'
          }
        ]
        const action = { type: 'SET_STUDENTS', projects }

        const prevState = testStore.getState()
        testStore.dispatch(action)
        const newState = testStore.getState()

        expect(newState.projects).to.be.deep.equal(projects);
        expect(newState.projects).to.not.be.equal(prevState.projects);
      })
    })
  })

  describe('Express API', () => {
    // Let's test our Express routes WITHOUT actually using the database.
    // By replacing the findAll methods on the Project and Robot models
    // with a spy, we can ensure that our API tests won't fail just because
    // our Sequelize models haven't been implemented yet.
    const { findAll: projectFindAll } = Project
    beforeEach(() => {
      Project.findAll = sinon.spy(() => [
        {
          id: 1,
          title: 'Title - Test Project 1',
          priority: 9,
          completed: true,
          description: 'description of test project 1'
        },
        {
          id: 2,
          title: 'Title - Test Project 2',
          priority: 4,
          completed: false,
          description: 'description of test project 2'
        }
      ])
    })
    afterEach(() => {
      Project.findAll = projectFindAll
    })

    xit('*** GET /api/projects responds with all projects', async () => {
      throw new Error('replace this error with your own test')
    })
  })

  describe('Sequelize Model', () => {
    // clear database before the 'describe' block
    before(() => db.sync({ force: true }))
    // clear the database after each 'it' block
    afterEach(() => db.sync({ force: true }))

    it('has fields title, deadline, priority, completed, description', async () => {
      const project = {
        title: 'Title - Test Project 3',
        deadline: new Date(2018, 11, 31),
        priority: 8,
        completed: false,
        description: 'description of test project 3'
      }
      project.notARealAttribute = 'does not compute'
      const savedProject = await Project.create(project)
      expect(savedProject.title).to.equal('Title - Test Project 3')
      expect(savedProject.priority).to.equal(8)
      expect(savedProject.completed).to.equal(false)
      expect(savedProject.description).to.equal('description of test project 3')
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
        title: 'Title - Test Project 3',
        deadline: new Date(2018, 11, 31),
        priority: 15,
        completed: false,
        description: 'description of test project 3'
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
      const project = Project.build({ title: 'practice guitar', priority: 5})
      expect(project.completed).to.be.a('boolean')
      expect(project.completed).to.equal(false)
    })
  })
})
