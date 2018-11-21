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
        testStore = createStore(rootReducer)
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
        { id: 1, firstName: 'Mae', lastName: 'Jemison' },
        { id: 2, firstName: 'Sally', lastName: 'Ride' },
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
    before(() => db.sync({ force: true }))
    afterEach(() => db.sync({ force: true }))

    xit('has fields firstName, lastName, email, imageUrl, gpa', async () => {
      const project = await Project.create({
        firstName: 'Sally',
        lastName: 'Ride',
        email: 'sallyride@nasa.gov',
        imageUrl: '/images/sallyride.png',
        gpa: 3.8,
      })
      expect(project.firstName).to.equal('Sally')
      expect(project.lastName).to.equal('Ride')
      expect(project.imageUrl).to.equal('/images/sallyride.png')
      expect(project.email).to.equal('sallyride@nasa.gov')
      expect(parseFloat(project.gpa)).to.equal(3.8)
    })

    xit('requires firstName, lastName, email', async () => {
      const project = Project.build()
      try {
        await project.validate()
        throw Error('validation should have failed without firstName, lastName, email')
      }
      catch (err) {
        expect(err.message).to.contain('firstName cannot be null')
        expect(err.message).to.contain('lastName cannot be null')
        expect(err.message).to.contain('email cannot be null')
      }
    })

    xit('firstName, lastName, email cannot be empty', async () => {
      const project = Project.build({ firstName: '', lastName: '', email: '' })
      try {
        await project.validate()
        throw Error('validation should have failed with empty name and address')
      }
      catch (err) {
        expect(err.message).to.contain('Validation notEmpty on firstName')
        expect(err.message).to.contain('Validation notEmpty on lastName')
        expect(err.message).to.contain('Validation notEmpty on email')
      }
    })

    xit('*** email must be a valid email', async () => {
      throw new Error('replace this error with your own test')
    })

    xit('gpa must be a float between 0.0 and 4.0', async () => {
      const project = {
        firstName: 'Sally',
        lastName: 'Ride',
        email: 'sallyride@nasa.gov',
        gpa: 4.1,
      }
      const overachiever = Project.build(project)
      try {
        await overachiever.save()
        throw Error('validation should have failed with too high gpa')
      }
      catch (err) {
        expect(err.message).to.contain('Validation max on gpa')
      }
      project.gpa = -1
      const underachiever = Project.build(project)
      try {
        await underachiever.validate()
        throw Error('validation should have failed with too low gpa')
      }
      catch (err) {
        expect(err.message).to.contain('Validation min on gpa')
      }
    })

    xit('default imageUrl if left blank', () => {
      const project = Project.build({ firstName: '', lastName: '', email: '' })
      expect(project.imageUrl).to.be.a('string')
      expect(project.imageUrl.length).to.be.greaterThan(1)
    })
  })
})
