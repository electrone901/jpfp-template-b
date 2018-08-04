const {expect} = require('chai');
import enzyme, {shallow} from 'enzyme'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'

const adapter = new Adapter()
enzyme.configure({ adapter })

import AllCampuses from '../app/components/AllCampuses'

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
          ]} />
        )
        expect(wrapper.text()).to.include('Mars Academy')
        expect(wrapper.text()).to.include('Jupiter Jumpstart')
        expect(wrapper.text()).to.include('Red Planet, Blue Ribbons')
        expect(wrapper.text()).to.include('Best Pre-K in the Galaxy')
      })
    })
    describe('<AllStudents /> component', () => {
      xit('renders an unordered list', () => {

      })
      xit('renders the students passed in as props', () => {

      })
    })
    describe('Navigation', () => {
      xit('renders <Home />', () => {

      })
      xit('renders the students passed in as props', () => {

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
