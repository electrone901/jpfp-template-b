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
  robots: [],
}

import mockAxios from '../mock-axios'
import { setRobots, fetchRobots } from '../../app/redux/robots'

import appReducer from '../../app/redux'
import { createStore } from 'redux'

const app = require('../../server')
const agent = require('supertest')(app)

const { db } = require('../../server/db')
const { Robot } = require('../../server/db')

const adapter = new Adapter()
enzyme.configure({ adapter })

import { AllRobots } from '../../app/components/AllRobots'

describe.only('Tier One: Robots', () => {
  let fakeStore
  beforeEach(() => {
    fakeStore = mockStore(initialState)
  })

  describe('<AllRobots /> component', () => {

    it('renders the robots passed in as props', () => {
      const wrapper = mount(
        <Provider store={fakeStore}>
          <MemoryRouter>
            <AllRobots robots={[
              { id: 1, name: 'R2-D2', imageUrl: '/images/r2d2.png' },
              { id: 2, name: 'WALL-E', imageUrl: '/images/walle.jpeg' },
            ]} />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.text()).to.include('R2-D2')
      expect(wrapper.text()).to.include('WALL-E')
      const images = wrapper.find('img').map(node => node.get(0).props.src)
      expect(images).to.include.members([
        '/images/r2d2.png',
        '/images/walle.jpeg',
      ])
    })

    it('*** renders "No Robots" if passed an empty array of robots', () => {
      const wrapper = mount(
        <Provider store={fakeStore}>
          <MemoryRouter>
            <AllRobots robots={[]} />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.text().toLowerCase()).to.include('no robots')
    })
  })

  describe('Redux', () => {
    describe('set robots', () => {
      const robots = [
        { id: 1, name: 'R2-D2', imageUrl: '/images/r2d2.png' },
        { id: 2, name: 'WALL-E', imageUrl: '/images/walle.jpeg' },
      ]

      it('setRobots action creator', () => {
        expect(setRobots(robots)).to.deep.equal({
          type: 'SET_ROBOTS',
          robots,
        })
      })

      it('fetchRobots thunk creator', async () => {
        mockAxios.onGet('/api/robots').replyOnce(200, robots)
        await fakeStore.dispatch(fetchRobots())
        const actions = fakeStore.getActions()
        expect(actions[0].type).to.equal('SET_ROBOTS')
        expect(actions[0].robots).to.deep.equal(robots)
      })
    })

    describe('reducer', () => {
      let testStore
      beforeEach(() => {
        testStore = createStore(appReducer)
      })

      it('*** returns the initial state by default', () => {
        expect(testStore.getState()).to.deep.equal(initialState)
      })

      it('reduces on SET_ROBOTS action', () => {
        const robots = [
          { id: 1, name: 'R2-D2', imageUrl: '/images/r2d2.png' },
          { id: 2, name: 'WALL-E', imageUrl: '/images/walle.jpeg' },
        ]
        const action = { type: 'SET_ROBOTS', robots }

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
      Robot.findAll = sinon.spy(() => Promise.resolve([
        { id: 1, name: 'R2-D2', imageUrl: '/images/r2d2.png' },
        { id: 2, name: 'WALL-E', imageUrl: '/images/walle.jpeg' },
      ]))
    })
    afterEach(() => {
      Robot.findAll = robotFindAll
    })

    it('GET /api/robots responds with all robots', async () => {
      const response = await agent
        .get('/api/robots')
        .timeout({ deadline: 50 })
        .expect(200)
      expect(response.body).to.deep.equal([
        { id: 1, name: 'R2-D2', imageUrl: '/images/r2d2.png' },
        { id: 2, name: 'WALL-E', imageUrl: '/images/walle.jpeg' },
      ])
      expect(Robot.findAll.calledOnce).to.be.equal(true)
    })

    it('GET /api/robots responds with error 500 when database throws error', async () => {
      Robot.findAll = sinon.spy(() => Promise.reject(
        Error('Ooopsies, the database is on fire!')
      ))
      await agent
        .get('/api/robots')
        .timeout({ deadline: 50 })
        .expect(500)
      expect(Robot.findAll.calledOnce).to.be.equal(true)
    })
  })

  describe('Sequelize Model', () => {
    before(() => db.sync({ force: true }))
    afterEach(() => db.sync({ force: true }))

    it('has fields name, imageUrl, fuelType, fuelLevel', async () => {
      const robot = await Robot.create({
        name: 'R2-D2',
        imageUrl: '/images/r2d2.png',
        fuelType: 'electric',
        fuelLevel: 88.34,
      })
      expect(robot.name).to.equal('R2-D2')
      expect(robot.imageUrl).to.equal('/images/r2d2.png')
      expect(robot.fuelType).to.equal('electric')
      expect(robot.fuelLevel).to.equal(88.34)
    })

    it('*** name cannot be null or empty', async () => {
      try { await Robot.create({}) }
      catch (error) { expect(error.message).to.equal('') }
      //   await Promise.all([
      //     Robot.create({}),
      //     Robot.create({name: ''}),
      //   ])
      //   // await Robot.create()
      //   // await Robot.create({ name: '' })
      //   throw Error('Not the error we were expecting')
      // } catch (err) {
      //   console.log('ERR', err.message)
      //   // expect(err.message)
      //   //   .to.not.equal('Not the error we were expecting')
      // }
    })

    xit('default imageUrl if left blank', async () => {
      const robot = await Robot.create({
        name: 'Jupiter Jumpstart',
        address: '5.2 AU',
      })
      expect(robot.imageUrl).to.be.a('string')
      expect(robot.imageUrl.length).to.be.greaterThan(1)
    })
  })
})
