const {expect} = require('chai');
import enzyme, {shallow, mount} from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'

const app = require('../server')
const agent = require('supertest')(app)

const {Campus, Student} = require('../server/db')

import * as rrd from 'react-router-dom'
const {MemoryRouter, Link} = rrd

const adapter = new Adapter()
enzyme.configure({ adapter })

import AllCampuses from '../app/components/AllCampuses'
import AllStudents from '../app/components/AllStudents'
import Root from '../app/components/root'

describe('Tier One', () => {
  describe('Client-side', () => {
    describe('<AllCampuses /> component', () => {
      xit('renders an unordered list', () => {
        const wrapper = shallow(<AllCampuses campuses={[]} />)
        expect(wrapper.find('ul')).to.have.length(1)
      })
      xit('renders the campuses passed in as props', () => {
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
      xit('renders an unordered list', () => {
        const wrapper = shallow(<AllStudents students={[]} />)
        expect(wrapper.find('ul')).to.have.length(1)
      })
      xit('renders the students passed in as props', () => {
        const wrapper = shallow(<AllStudents students={[
          { id: 1, firstName: 'Mae', lastName: 'Jemison' },
          { id: 2, firstName: 'Sally', lastName: 'Ride' },
        ]} />)
        expect(wrapper.text()).to.include('Mae Jemison')
        expect(wrapper.text()).to.include('Sally Ride')
      })
    })
    describe('Navigation', () => {
      /** In order to test react-router, we need ot hijack the BrowserRouter
       *  in the root of our app. Sinon allows us to "stub" the BrowserRouter.
       *  Whenever a component calls BrowserRouter, it'll instead render a
       *  component that merely renders the children. After the tests are done,
       *  let's clean up after ourselves by restoring BrowserRouter.
       */
      beforeEach(() => {
        sinon.stub(rrd, 'BrowserRouter').callsFake(({ children }) => {
          return (<div>{children}</div>)
        })
      })
      afterEach(() => {
        rrd.BrowserRouter.restore()
      })
      xit('renders <AllCampuses /> at /campuses', () => {
        const wrapper = mount(
          <MemoryRouter initialEntries={['/campuses']}>
            <Root />
          </MemoryRouter>
        )
        expect(wrapper.find(AllCampuses)).to.have.length(1)
        expect(wrapper.find(AllStudents)).to.have.length(0)
      })
      xit('renders <AllStudents /> at /students', () => {
        const wrapper = mount(
          <MemoryRouter initialEntries={['/students']}>
            <Root />
          </MemoryRouter>
        )
        expect(wrapper.find(AllCampuses)).to.have.length(0)
        expect(wrapper.find(AllStudents)).to.have.length(1)
      })
      xit('navbar to navigate to home, campuses, students', () => {
        const wrapper = mount(
          <MemoryRouter initialEntries={['/']}>
            <Root />
          </MemoryRouter>
        )
        const nav = wrapper.find('nav')
        expect(nav).to.have.length(1)
        const links = nav.find(Link).map(node => node.get(0).props.to)
        expect(links).to.include.members(['/', '/campuses', '/students'])
      })
    })
  })
  describe('API', () => {
    const {findAll: campusFindAll} = Campus
    const {findAll: studentFindAll} = Student
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
    xit('GET /api/campuses responds with all campuses', async () => {
      const response = await agent
        .get('/api/campuses')
        .expect(200)
      expect(response.body).to.deep.equal([
        { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
        { id: 2, name: 'Jupiter Jumpstart', imageUrl: '/images/jupiter.jpeg' },
      ])
      expect(Campus.findAll.calledOnce).to.be.true /* eslint-disable-line no-unused-expressions */
    })
    xit('GET /api/students responds with all students', async () => {
      const response = await agent
        .get('/api/students')
        .expect(200)
      expect(response.body).to.deep.equal([
        { id: 1, firstName: 'Mae', lastName: 'Jemison' },
        { id: 2, firstName: 'Sally', lastName: 'Ride' },
      ])
      expect(Student.findAll.calledOnce).to.be.true /* eslint-disable-line no-unused-expressions */
    })
  })
  describe('Models', () => {
    describe('Campus', () => {
      it('has fields name, address, imageUrl, description', async () => {
        const campus = Campus.build({
          name: 'Jupiter Jumpstart',
          address: '5.2 AU',
          imageUrl: '/images/jupiter.png',
          description: 'The best JavaScript Academy for toddlers in the solar system!',
        })
        expect(campus.name).to.eq('Jupiter Jumpstart')
        expect(campus.address).to.eq('5.2 AU')
        expect(campus.imageUrl).to.eq('/images/jupiter.png')
        expect(campus.description).to.eq('The best JavaScript Academy for toddlers in the solar system!')
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
      it('has fields firstName, lastName, email, imageUrl, gpa', async () => {
        const student = Student.build({
          firstName: 'Sally',
          lastName: 'Ride',
          email: 'sallyride@nasa.gov',
          imageUrl: '/images/sallyride.png',
          gpa: 3.8,
        })
        expect(student.firstName).to.eq('Sally')
        expect(student.lastName).to.eq('Ride')
        expect(student.imageUrl).to.eq('/images/sallyride.png')
        expect(student.email).to.eq('sallyride@nasa.gov')
        expect(student.gpa).to.eq(3.8)
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
      it('gpa must be decimal between 0.0 and 4.0', async () => {
        const studentA = Student.build({
          firstName: 'Sally',
          lastName: 'Ride',
          email: 'sallyride@nasa.gov',
          gpa: 4.1,
        })
        try {
          await studentA.validate()
          throw Error('validation should have failed with too high gpa')
        }
        catch (err) {
          expect(err.message).to.contain('Validation max on gpa')
        }
        const studentB = Student.build({
          firstName: 'Sally',
          lastName: 'Ride',
          email: 'sallyride@nasa.gov',
          gpa: -1,
        })
        try {
          await studentB.validate()
          throw Error('validation should have failed with too low gpa')
        }
        catch (err) {
          expect(err.message).to.contain('Validation min on gpa')
        }
      })
      it('default imageUrl if left blank', async () => {
        const student = Student.build({ firstName: '', lastName: '', email: '' })
        expect(student.imageUrl).to.be.a('string')
        expect(student.imageUrl.length).to.be.greaterThan(1)
      })
    })
  })
})
