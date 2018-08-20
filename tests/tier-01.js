const {expect} = require('chai');
import enzyme, {shallow, mount} from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'


import * as rrd from 'react-router-dom'
const { MemoryRouter, Link } = rrd

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
        const wrapper = shallow(<AllCampuses campuses={[
          {
            id: 1,
            name: 'Mars Academy',
            description: 'Red Planet, Blue Ribbons',
          },
          {
            id: 2,
            name: 'Jupiter Jumpstart',
            description: 'Best Pre-K in the Galaxy',
          },
        ]} />)
        expect(wrapper.text()).to.include('Mars Academy')
        expect(wrapper.text()).to.include('Jupiter Jumpstart')
        expect(wrapper.text()).to.include('Red Planet, Blue Ribbons')
        expect(wrapper.text()).to.include('Best Pre-K in the Galaxy')
      })
    })
    describe('<AllStudents /> component', () => {
      xit('renders an unordered list', () => {
        const wrapper = shallow(<AllStudents students={[]} />)
        expect(wrapper.find('ul')).to.have.length(1)
      })
      xit('renders the students passed in as props', () => {
        const wrapper = shallow(<AllStudents students={[
          { id: 1, name: 'Mae Jemison' },
          { id: 2, name: 'Sally Ride' },
        ]} />)
        expect(wrapper.text()).to.include('Mae Jemison')
        expect(wrapper.text()).to.include('Sally Ride')
      })
    })
    describe('Navigation', () => {
      beforeEach(() => {
        sinon.stub(rrd, 'BrowserRouter').callsFake(({ children }) => {
          return (<div>{children}</div>)
        })
      })
      afterEach(() => {
        rrd.BrowserRouter.restore()
      })
      it('says Welcome at /', () => {
        const wrapper = shallow(
          <MemoryRouter initialEntries={['/']}>
            <Root />
          </MemoryRouter>
        )
        expect(wrapper.html()).to.include('Welcome')
        expect(wrapper.find(AllCampuses)).to.have.length(0)
        expect(wrapper.find(AllStudents)).to.have.length(0)
      })
      it('renders <AllCampuses /> at /campuses', () => {
        const wrapper = mount(
          <MemoryRouter initialEntries={['/campuses']}>
            <Root />
          </MemoryRouter>
        )
        expect(wrapper.find(AllCampuses)).to.have.length(1)
        expect(wrapper.find(AllStudents)).to.have.length(0)
      })
      it('renders <AllStudents /> at /students', () => {
        const wrapper = mount(
          <MemoryRouter initialEntries={['/students']}>
            <Root />
          </MemoryRouter>
        )
        expect(wrapper.find(AllCampuses)).to.have.length(0)
        expect(wrapper.find(AllStudents)).to.have.length(1)
      })
      it('navbar to navigate to home, campuses, students', () => {
        const wrapper = mount(
          <MemoryRouter initialEntries={['/']}>
            <Root />
          </MemoryRouter>
        )
        expect(wrapper.find('nav')).to.have.length(1)
        expect(wrapper.find(Link)).to.have.length.greaterThan(2)
        // TODO: Simulate clickon on each of the nav buttons
      })
    })
  })
  describe('API', () => {
    describe('/api/campuses endpoint', () => {
      xit('GET /api/campuses responds with all campuses', () => {

      })
    })
  })
  describe('Models', () => {
    xit('', () => {

    })
  })
})
