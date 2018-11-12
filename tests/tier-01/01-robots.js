const { expect } = require('chai');
import enzyme, { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16.3'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {
  robots: [],
}

import mockAxios from '../mock-axios'
import { setRobots, fetchRobots } from '../../app/redux/robots'

import rootReducer from '../../app/redux'
import { createStore } from 'redux'

const app = require('../../server')
const agent = require('supertest')(app)

const { db } = require('../../server/db')
const { Robot } = require('../../server/db')

const adapter = new Adapter()
enzyme.configure({ adapter })

import { AllRobots } from '../../app/components/AllRobots'

describe('Tier One: Robots', () => {
  describe('<AllRobots /> component', () => {
    xit('renders the robots passed in as props', () => {
      const wrapper = shallow(
        <AllRobots robots={[
          { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
          { id: 2, name: 'Jupiter Jumpstart', imageUrl: '/images/jupiter.jpeg' },
        ]} />
      )
      expect(wrapper.text()).to.include('Mars Academy')
      expect(wrapper.text()).to.include('Jupiter Jumpstart')
      const images = wrapper.find('img').map(node => node.get(0).props.src)
      expect(images).to.include.members([
        '/images/mars.png',
        '/images/jupiter.jpeg',
      ])
    })

    xit('*** renders "No Robots" if passed an empty array of robots', () => {
      throw new Error('replace this error with your own test')
    })
  })

  describe('Redux', () => {
    let fakeStore
    beforeEach(() => {
      fakeStore = mockStore(initialState)
    })

    describe('set robots', () => {
      const robots = [
        { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
        { id: 2, name: 'Jupiter Jumpstart', imageUrl: '/images/jupiter.jpeg' }
      ]

      xit('setRobots action creator', () => {
        expect(setRobots(robots)).to.deep.equal({
          type: 'SET_CAMPUSES',
          robots,
        })
      })

      xit('fetchRobots thunk creator', async () => {
        mockAxios.onGet('/api/robots').replyOnce(200, robots)
        await fakeStore.dispatch(fetchRobots())
        const actions = fakeStore.getActions()
        expect(actions[0].type).to.equal('SET_CAMPUSES')
        expect(actions[0].robots).to.deep.equal(robots)
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

      xit('reduces on SET_CAMPUSES action', () => {
        const robots = [
          { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
          { id: 2, name: 'Jupiter Jumpstart', imageUrl: '/images/jupiter.jpeg' }
        ]
        const action = { type: 'SET_CAMPUSES', robots }

        const prevState = testStore.getState()
        testStore.dispatch(action)
        const newState = testStore.getState()

        expect(newState.robots).to.be.deep.equal(robots);
        expect(newState.robots).to.not.be.equal(prevState.robots);
      })
    })
  })

  describe('Express API', () => {
    // Let's test our Express routes WITHOUT actually using the database.
    // By replacing the findAll methods on the Robot and Student models
    // with a spy, we can ensure that our API tests won't fail just because
    // our Sequelize models haven't been implemented yet.
    const { findAll: robotFindAll } = Robot
    beforeEach(() => {
      Robot.findAll = sinon.spy(() => [
        { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
        { id: 2, name: 'Jupiter Jumpstart', imageUrl: '/images/jupiter.jpeg' },
      ])
    })
    afterEach(() => {
      Robot.findAll = robotFindAll
    })

    xit('GET /api/robots responds with all robots', async () => {
      const response = await agent
        .get('/api/robots')
        .expect(200)
      expect(response.body).to.deep.equal([
        { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
        { id: 2, name: 'Jupiter Jumpstart', imageUrl: '/images/jupiter.jpeg' },
      ])
      expect(Robot.findAll.calledOnce).to.be.equal(true)
    })
  })

  describe('Sequelize Model', () => {
    before(() => db.sync({ force: true }))
    afterEach(() => db.sync({ force: true }))


    xit('has fields name, address, imageUrl, description', () => {
      const robot = Robot.build({
        name: 'Jupiter Jumpstart',
        address: '5.2 AU',
        imageUrl: '/images/jupiter.png',
        description: 'The best JavaScript Academy for toddlers in the solar system!',
      })
      expect(robot.name).to.equal('Jupiter Jumpstart')
      expect(robot.address).to.equal('5.2 AU')
      expect(robot.imageUrl).to.equal('/images/jupiter.png')
      expect(robot.description).to.equal('The best JavaScript Academy for toddlers in the solar system!')
    })

    xit('*** requires name and address', async () => {
      throw new Error('replace this error with your own test')
    })

    xit('name and address cannot be empty', async () => {
      const robot = Robot.build({ name: '', address: '' })
      try {
        await robot.validate()
        throw Error('validation should have failed with empty name and address')
      }
      catch (err) {
        expect(err.message).to.contain('Validation notEmpty on name')
        expect(err.message).to.contain('Validation notEmpty on address')
      }
    })

    xit('default imageUrl if left blank', async () => {
      const robot = Robot.build({
        name: 'Jupiter Jumpstart',
        address: '5.2 AU',
      })
      await robot.validate()
      expect(robot.imageUrl).to.be.a('string')
      expect(robot.imageUrl.length).to.be.greaterThan(1)
    })
  })
})
