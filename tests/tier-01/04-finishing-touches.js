// const { expect } = require('chai');
// import enzyme, { mount } from 'enzyme'
// import sinon from 'sinon'
// import React from 'react'
// import Adapter from 'enzyme-adapter-react-16.3'
// import { Provider } from 'react-redux'

// import * as rrd from 'react-router-dom'
// const { MemoryRouter } = rrd

// import mockAxios from '../mock-axios'

// import store from '../../app/store'

// const { Robot, Project } = require('../../server/db')
// const seed = require('../../seed')

// const adapter = new Adapter()
// enzyme.configure({ adapter })

// import { AllRobots } from '../../app/components/AllRobots'
// import { AllProjects } from '../../app/components/AllProjects'
// import Root from '../../app/components/root'

// // Sometimes, we want to wait for a short time for async events to finish.
// const waitFor = (wait) =>
//   new Promise((resolve) => setTimeout(resolve, wait))

// describe('Tier One: Final Touches', () => {

//   describe('Navigation', () => {
//     /** In order to test react-router, we need to hijack the BrowserRouter
//      *  in the root of our app. Sinon allows us to "stub" the BrowserRouter.
//      *  Whenever a component calls BrowserRouter, it'll instead render a
//      *  component that merely renders the children. After the tests are done,
//      *  we'll clean up after ourselves by restoring BrowserRouter.
//      */
//     const robots = [
//       { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
//       { id: 2, name: 'Jupiter Jumpstart', imageUrl: '/images/jupiter.jpeg' },
//     ]
//     const projects = [
//       { id: 1, firstName: 'Mae', lastName: 'Jemison' },
//       { id: 2, firstName: 'Sally', lastName: 'Ride' },
//     ]
//     beforeEach(() => {
//       sinon.stub(rrd, 'BrowserRouter').callsFake(({ children }) => {
//         return (<div>{children}</div>)
//       })
//       mockAxios.onGet('/api/robots').replyOnce(200, robots);
//       mockAxios.onGet('/api/projects').replyOnce(200, projects);
//     })
//     afterEach(() => {
//       rrd.BrowserRouter.restore()
//     })

//     xit('renders <AllRobots /> at /robots', () => {
//       const wrapper = mount(
//         <Provider store={store}>
//           <MemoryRouter initialEntries={['/robots']}>
//             <Root />
//           </MemoryRouter>
//         </Provider>
//       )
//       expect(wrapper.find(AllRobots)).to.have.length(1)
//       expect(wrapper.find(AllProjects)).to.have.length(0)
//     })

//     xit('renders <AllProjects /> at /projects', () => {
//       const wrapper = mount(
//         <Provider store={store}>
//           <MemoryRouter initialEntries={['/projects']}>
//             <Root />
//           </MemoryRouter>
//         </Provider>
//       )
//       expect(wrapper.find(AllRobots)).to.have.length(0)
//       expect(wrapper.find(AllProjects)).to.have.length(1)
//     })

//     xit('*** navbar to navigate to home, robots, projects', () => {
//       throw new Error('replace this error with your own test')
//     })
//   })

//   describe('Seed file', () => {
//     beforeEach(seed)

//     xit('populates the database with at least three robots', async () => {
//       const robots = await Robot.findAll()
//       expect(robots).to.have.lengthOf.at.least(3)
//     })

//     xit('populates the database with at least four projects', async () => {
//       const projects = await Project.findAll()
//       expect(projects).to.have.lengthOf.at.least(4)
//     })

//     xit('*** creates exactly one campus that has no projects', async () => {
//       throw new Error('replace this error with your own test')
//     })

//     xit('*** creates exactly one student that is not enrolled in a campus', async () => {
//       throw new Error('replace this error with your own test')
//     })
//   })

//   describe('React-Redux', () => {
//     const robots = [
//       { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
//       { id: 2, name: 'Jupiter Jumpstart', imageUrl: '/images/jupiter.jpeg' },
//     ]
//     const projects = [
//       { id: 1, firstName: 'Mae', lastName: 'Jemison' },
//       { id: 2, firstName: 'Sally', lastName: 'Ride' },
//     ]
//     beforeEach(() => {
//       sinon.stub(rrd, 'BrowserRouter').callsFake(({ children }) => {
//         return (<div>{children}</div>)
//       })
//       mockAxios.onGet('/api/robots').replyOnce(200, robots);
//       mockAxios.onGet('/api/projects').replyOnce(200, projects);
//     })
//     afterEach(() => {
//       rrd.BrowserRouter.restore()
//     })

//     xit('initializes robots and projects from the server when the app first loads', async () => {
//       const reduxStateBeforeMount = store.getState()
//       expect(reduxStateBeforeMount.robots).to.deep.equal([])
//       expect(reduxStateBeforeMount.projects).to.deep.equal([])
//       mount(
//         <Provider store={store}>
//           <MemoryRouter initialEntries={['/']}>
//             <Root />
//           </MemoryRouter>
//         </Provider>
//       )
//       await waitFor(10) // wait for 10 milliseconds
//       const reduxStateAfterMount = store.getState()
//       expect(reduxStateAfterMount.robots).to.deep.equal(robots)
//       expect(reduxStateAfterMount.projects).to.deep.equal(projects)
//     })

//     xit('<AllRobots /> is passed robots from store as props', async () => {
//       const wrapper = mount(
//         <Provider store={store}>
//           <MemoryRouter initialEntries={['/robots']}>
//             <Root />
//           </MemoryRouter>
//         </Provider>
//       )
//       await waitFor(10) // wait for 10 milliseconds
//       wrapper.update()
//       const { robots: reduxRobotes } = store.getState()
//       const { robots: componentRobotes } = wrapper.find(AllRobots).props()
//       expect(componentRobotes).to.deep.equal(reduxRobotes)
//     })

//     xit('<AllProjects /> is passed projects from store as props', async () => {
//       const wrapper = mount(
//         <Provider store={store}>
//           <MemoryRouter initialEntries={['/projects']}>
//             <Root />
//           </MemoryRouter>
//         </Provider>
//       )
//       await waitFor(10) // wait for 10 milliseconds
//       wrapper.update()
//       const { projects: reduxProjects } = store.getState()
//       const { projects: componentProjects } = wrapper.find(AllProjects).props()
//       expect(componentProjects).to.deep.equal(reduxProjects)
//     })
//   })
// })
