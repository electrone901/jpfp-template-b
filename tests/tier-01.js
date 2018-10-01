const { expect } = require('chai');
import enzyme, { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import * as rrd from 'react-router-dom'
const { MemoryRouter, Link } = rrd

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {
  campuses: [],
  students: [],
}

import mockAxios from './mock-axios'
import { setCampuses, fetchCampuses } from '../app/redux/campuses'
import { setStudents, fetchStudents } from '../app/redux/students'

import rootReducer from '../app/redux'
import { createStore } from 'redux'
import store from '../app/store'

const app = require('../server')
const agent = require('supertest')(app)

const { db } = require('../server/db')
const { Campus, Student } = require('../server/db')
const seed = require('../seed')

const adapter = new Adapter()
enzyme.configure({ adapter })

import { AllCampuses } from '../app/components/AllCampuses'
import { AllStudents } from '../app/components/AllStudents'
import Root from '../app/components/root'

describe('Tier One: All Campuses and Students', () => {
  describe('Client-side', () => {
    describe('<AllCampuses /> component', () => {
      it('renders "No Campuses" if passed an empty array of campuses', () => {
        const wrapper = shallow(<AllCampuses campuses={[]} />)
        expect(wrapper.text().toLowerCase()).to.include('no campuses')
      })
      it('renders the campuses passed in as props', () => {
        const wrapper = shallow(
          <AllCampuses campuses={[
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
    })
    describe('<AllStudents /> component', () => {
      it('renders "No Students" if passed an empty array of students', () => {
        const wrapper = shallow(<AllStudents students={[]} />)
        expect(wrapper.text().toLowerCase()).to.include('no students')
      })
      it('renders the students passed in as props', () => {
        const wrapper = shallow(<AllStudents students={[
          { id: 1, firstName: 'Mae', lastName: 'Jemison' },
          { id: 2, firstName: 'Sally', lastName: 'Ride' },
        ]} />)
        expect(wrapper.text()).to.include('Mae Jemison')
        expect(wrapper.text()).to.include('Sally Ride')
      })
    })
    describe('Redux', () => {
      let fakeStore
      beforeEach(() => {
        fakeStore = mockStore(initialState)
      })
      describe('set campuses', () => {
        const campuses = [
          { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
          { id: 2, name: 'Jupiter Jumpstart', imageUrl: '/images/jupiter.jpeg' }
        ]
        it('setCampuses action creator', () => {
          expect(setCampuses(campuses)).to.deep.equal({
            type: 'SET_CAMPUSES',
            campuses,
          })
        })
        it('fetchCampuses thunk creator', async () => {
          mockAxios.onGet('/api/campuses').replyOnce(200, campuses)
          await fakeStore.dispatch(fetchCampuses())
          const actions = fakeStore.getActions()
          expect(actions[0].type).to.equal('SET_CAMPUSES')
          expect(actions[0].campuses).to.deep.equal(campuses)
        })
      })
      describe('set students', () => {
        const students = [
          { id: 1, firstName: 'Mae', lastName: 'Jemison' },
          { id: 2, firstName: 'Sally', lastName: 'Ride' },
        ]
        it('setStudents action creator', () => {
          expect(setStudents(students)).to.deep.equal({
            type: 'SET_STUDENTS',
            students,
          })
        })
        it('fetchStudents thunk creator', async () => {
          mockAxios.onGet('/api/students').replyOnce(200, students)
          await fakeStore.dispatch(fetchStudents())
          const actions = fakeStore.getActions()
          expect(actions[0].type).to.equal('SET_STUDENTS')
          expect(actions[0].students).to.deep.equal(students)
        })
      })
      describe('reducer', () => {
        let testStore
        beforeEach(() => {
          testStore = createStore(rootReducer)
        })
        it('returns the initial state by default', () => {
          expect(testStore.getState().campuses).to.be.an('array')
          expect(testStore.getState().students).to.be.an('array')
        })
        it('reduces on SET_CAMPUSES action', () => {
          const campuses = [
            { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
            { id: 2, name: 'Jupiter Jumpstart', imageUrl: '/images/jupiter.jpeg' }
          ]
          const action = { type: 'SET_CAMPUSES', campuses }

          const prevState = testStore.getState()
          testStore.dispatch(action)
          const newState = testStore.getState()

          expect(newState.campuses).to.be.deep.equal(campuses);
          expect(newState.campuses).to.not.be.equal(prevState.campuses);
        })
        it('reduces on SET_STUDENTS action', () => {
          const students = [
            { id: 1, firstName: 'Mae', lastName: 'Jemison' },
            { id: 2, firstName: 'Sally', lastName: 'Ride' },
          ]
          const action = { type: 'SET_STUDENTS', students }

          const prevState = testStore.getState()
          testStore.dispatch(action)
          const newState = testStore.getState()

          expect(newState.students).to.be.deep.equal(students);
          expect(newState.students).to.not.be.equal(prevState.students);
        })
      })
    })
  })
  describe('API', () => {
    const { findAll: campusFindAll } = Campus
    const { findAll: studentFindAll } = Student
    beforeEach(() => {
      Campus.findAll = sinon.spy(() => [
        { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
        { id: 2, name: 'Jupiter Jumpstart', imageUrl: '/images/jupiter.jpeg' },
      ])
      Student.findAll = sinon.spy(() => [
        { id: 1, firstName: 'Mae', lastName: 'Jemison' },
        { id: 2, firstName: 'Sally', lastName: 'Ride' },
      ])
    })
    afterEach(() => {
      Campus.findAll = campusFindAll
      Student.findAll = studentFindAll
    })
    it('GET /api/campuses responds with all campuses', async () => {
      const response = await agent
        .get('/api/campuses')
        .expect(200)
      expect(response.body).to.deep.equal([
        { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
        { id: 2, name: 'Jupiter Jumpstart', imageUrl: '/images/jupiter.jpeg' },
      ])
      expect(Campus.findAll.calledOnce).to.be.equal(true)
    })
    it('GET /api/students responds with all students', async () => {
      const response = await agent
        .get('/api/students')
        .expect(200)
      expect(response.body).to.deep.equal([
        { id: 1, firstName: 'Mae', lastName: 'Jemison' },
        { id: 2, firstName: 'Sally', lastName: 'Ride' },
      ])
      expect(Student.findAll.calledOnce).to.be.equal(true)
    })
  })
  describe('Models', () => {
    describe('Campus', () => {
      it('has fields name, address, imageUrl, description', () => {
        const campus = Campus.build({
          name: 'Jupiter Jumpstart',
          address: '5.2 AU',
          imageUrl: '/images/jupiter.png',
          description: 'The best JavaScript Academy for toddlers in the solar system!',
        })
        expect(campus.name).to.equal('Jupiter Jumpstart')
        expect(campus.address).to.equal('5.2 AU')
        expect(campus.imageUrl).to.equal('/images/jupiter.png')
        expect(campus.description).to.equal('The best JavaScript Academy for toddlers in the solar system!')
      })
      it('requires name and address', async () => {
        const campus = Campus.build()
        try {
          await campus.validate()
          throw Error('validation should have failed without name and address')
        }
        catch (err) {
          expect(err.message).to.contain('name cannot be null')
          expect(err.message).to.contain('address cannot be null')
        }
      })
      it('name and address cannot be empty', async () => {
        const campus = Campus.build({ name: '', address: '' })
        try {
          await campus.validate()
          throw Error('validation should have failed with empty name and address')
        }
        catch (err) {
          expect(err.message).to.contain('Validation notEmpty on name')
          expect(err.message).to.contain('Validation notEmpty on address')
        }
      })
      it('default imageUrl if left blank', async () => {
        const campus = Campus.build({
          name: 'Jupiter Jumpstart',
          address: '5.2 AU',
        })
        await campus.validate()
        expect(campus.imageUrl).to.be.a('string')
        expect(campus.imageUrl.length).to.be.greaterThan(1)
      })
    })
    describe('Student', () => {
      afterEach(() => db.sync({ force: true }))
      it('has fields firstName, lastName, email, imageUrl, gpa', async () => {
        const student = await Student.create({
          firstName: 'Sally',
          lastName: 'Ride',
          email: 'sallyride@nasa.gov',
          imageUrl: '/images/sallyride.png',
          gpa: 3.8,
        })
        expect(student.firstName).to.equal('Sally')
        expect(student.lastName).to.equal('Ride')
        expect(student.imageUrl).to.equal('/images/sallyride.png')
        expect(student.email).to.equal('sallyride@nasa.gov')
        expect(parseFloat(student.gpa)).to.equal(3.8)
      })
      it('requires firstName, lastName, email', async () => {
        const student = Student.build()
        try {
          await student.validate()
          throw Error('validation should have failed without firstName, lastName, email')
        }
        catch (err) {
          expect(err.message).to.contain('firstName cannot be null')
          expect(err.message).to.contain('lastName cannot be null')
          expect(err.message).to.contain('email cannot be null')
        }
      })
      it('firstName, lastName, email cannot be empty', async () => {
        const student = Student.build({ firstName: '', lastName: '', email: '' })
        try {
          await student.validate()
          throw Error('validation should have failed with empty name and address')
        }
        catch (err) {
          expect(err.message).to.contain('Validation notEmpty on firstName')
          expect(err.message).to.contain('Validation notEmpty on lastName')
          expect(err.message).to.contain('Validation notEmpty on email')
        }
      })
      it('email must be a valid email', async () => {
        const student = Student.build({
          firstName: 'Sally',
          lastName: 'Ride',
          email: '@sallyridenasagov...',
          imageUrl: '/images/sallyride.png',
        })
        try {
          await student.validate()
          throw Error('validation should have failed with invalid email')
        }
        catch (err) {
          expect(err.message).to.contain('Validation isEmail on email')
        }
      })
      it('gpa must be a float between 0.0 and 4.0', async () => {
        const student = {
          firstName: 'Sally',
          lastName: 'Ride',
          email: 'sallyride@nasa.gov',
          gpa: 4.1,
        }
        const overachiever = Student.build(student)
        try {
          await overachiever.save()
          throw Error('validation should have failed with too high gpa')
        }
        catch (err) {
          expect(err.message).to.contain('Validation max on gpa')
        }
        student.gpa = -1
        const underachiever = Student.build(student)
        try {
          await underachiever.validate()
          throw Error('validation should have failed with too low gpa')
        }
        catch (err) {
          expect(err.message).to.contain('Validation min on gpa')
        }
      })
      it('default imageUrl if left blank', () => {
        const student = Student.build({ firstName: '', lastName: '', email: '' })
        expect(student.imageUrl).to.be.a('string')
        expect(student.imageUrl.length).to.be.greaterThan(1)
      })
    })
    describe('Student > Campus Association', () => {
      let student1, student2, campus
      beforeEach(async () => {
        campus = await Campus.create({
          name: 'Jupiter Jumpstart',
          address: '5.2 AU',
        })
        student1 = await Student.create({
          firstName: 'Sally',
          lastName: 'Ride',
          email: 'sallyride@nasa.gov',
          campusId: campus.id,
        })
        student2 = await Student.create({
          firstName: 'Mae',
          lastName: 'Jemison',
          email: 'maejemison@nasa.gov',
          campusId: campus.id,
        })
      })
      afterEach(() => db.sync({ force: true }))
      it('a student may be assigned to at most one campus', async () => {
        const sallysCampus = await student1.getCampus()
        expect(sallysCampus.name).to.equal(campus.name)
      })
      it('a campus may have many enrolled students', async () => {
        const result = await campus.hasStudents([student1, student2])
        expect(result).to.be.equal(true)
      })
    })
  })
  describe('Integration', () => {
    describe('Navigation', () => {
      /** In order to test react-router, we need to hijack the BrowserRouter
       *  in the root of our app. Sinon allows us to "stub" the BrowserRouter.
       *  Whenever a component calls BrowserRouter, it'll instead render a
       *  component that merely renders the children. After the tests are done,
       *  let's clean up after ourselves by restoring BrowserRouter.
       */
      beforeEach(() => {
        sinon.stub(rrd, 'BrowserRouter').callsFake(({ children }) => {
          return (<div>{children}</div>)
        })
        const campuses = [
          { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
          { id: 2, name: 'Jupiter Jumpstart', imageUrl: '/images/jupiter.jpeg' },
        ];
        const students = [
          { id: 1, firstName: 'Mae', lastName: 'Jemison' },
          { id: 2, firstName: 'Sally', lastName: 'Ride' },
        ];
        mockAxios.onGet('/api/campuses').replyOnce(200, campuses);
        mockAxios.onGet('/api/students').replyOnce(200, students);
      })
      afterEach(() => {
        rrd.BrowserRouter.restore()
      })
      it('renders <AllCampuses /> at /campuses', async () => {
        const wrapper = mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={['/campuses']}>
              <Root />
            </MemoryRouter>
          </Provider>
        )
        await store.nextDispatch()
        expect(wrapper.find(AllCampuses)).to.have.length(1)
        expect(wrapper.find(AllStudents)).to.have.length(0)
      })
      it('renders <AllStudents /> at /students', () => {
        const wrapper = mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={['/students']}>
              <Root />
            </MemoryRouter>
          </Provider>
        )
        expect(wrapper.find(AllCampuses)).to.have.length(0)
        expect(wrapper.find(AllStudents)).to.have.length(1)
      })
      it('navbar to navigate to home, campuses, students', () => {
        const wrapper = mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={['/']}>
              <Root />
            </MemoryRouter>
          </Provider>
        )
        const nav = wrapper.find('nav')
        expect(nav).to.have.length(1)
        const links = nav.find(Link).map(node => node.get(0).props.to)
        expect(links).to.include.members(['/', '/campuses', '/students'])
      })
    })
    describe('Seed file', () => {
      before(seed)
      it('populates the database with at least three campuses', async () => {
        const campuses = await Campus.findAll()
        expect(campuses).to.have.lengthOf.at.least(3)
      })
      it('populates the database with at least four students', async () => {
        const students = await Student.findAll()
        expect(students).to.have.lengthOf.at.least(4)
      })
      it('creates exactly one campus has no students', async () => {
        const campuses = await Campus.findAll({
          include: [{ model: Student }]
        })
        const emptyCampuses = campuses.filter(campus => !campus.students.length)
        expect(emptyCampuses).to.have.lengthOf(1)
      })
      it('creates exactly one student is not enrolled in a campus', async () => {
        const students = await Student.findAll()
        const notEnrolled = students.filter(student => !student.campusId)
        expect(notEnrolled).to.have.lengthOf(1)
      })
    })
  })
})
