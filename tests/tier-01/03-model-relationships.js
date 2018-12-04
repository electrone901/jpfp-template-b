const { expect } = require('chai');
const { db } = require('../../server/db')
const seed = require('../../seed')
const { Robot, Project } = require('../../server/db')

describe('Tier One: Project >-< Robot Association', () => {
  before(() => db.sync({ force: true }))
  afterEach(() => db.sync({ force: true }))

  describe('Sequelize Models', () => {

    it('a project may belong to many robots', async () => {
      const r2d2 = await Robot.create({ name: 'R2-D2' })
      const wallE = await Robot.create({ name: 'WALL-E' })
      const projectLove = await Project.create({ title: 'Discover love' })
      await projectLove.addRobots([r2d2, wallE])
      const lovingRobots = await projectLove.getRobots().map(robot => robot.name)
      expect(lovingRobots).to.deep.equal(['R2-D2', 'WALL-E'])
    })

    it('a robot may belong to many projects', async () => {
      const openPodBayDoors = await Project.create({ title: 'Open the pod bay doors' })
      const makePizza = await Project.create({ title: 'Make pizza' })
      const hal9000 = await Robot.create({ name: 'HAL-9000' })
      await hal9000.addProjects([openPodBayDoors, makePizza])
      const hal9000sProjects = await hal9000.getProjects().map(title => title.title)
      expect(hal9000sProjects).to.deep.equal(['Open the pod bay doors', 'Make pizza'])
    })

  })

  describe('Seed File', () => {
    let robots, projects
    beforeEach(async () => {
      await seed()
      robots = await Robot.findAll({ include: [Project] })
      projects = await Project.findAll({ include: [Robot] })
    })

    it('creates at least one robot that has no projects', () => {
      // console.log(robots.map(robot => ({
      //   name: robot.name,
      //   projects: robot.projects.map(project => project.title),
      // })))
      const robotsWithNoProjects = robots
        .filter(robot => !robot.projects.length)
        .map(robot => robot.name)
      console.log('robotsWithNoProjects', robotsWithNoProjects)
      expect(robotsWithNoProjects).to.have.lengthOf.above(0)
    })

    it('creates at least one project that has no robots', () => {
      // console.log(projects.map(project => ({
      //   title: project.title,
      //   robots: project.robots.map(robot => robot.name),
      // })))
      const projectsWithNoRobots = projects
        .filter(project => !project.robots.length)
        .map(project => project.title)
      console.log('projectsWithNoRobots', projectsWithNoRobots)
      expect(projectsWithNoRobots).to.have.lengthOf.above(0)
    })

    it('creates at least one robot that has several projects', () => {
      // console.log(robots.map(robot => ({
      //   name: robot.name,
      //   projects: robot.projects.map(project => project.title),
      // })))
      const robotsWithSeveralProjects = robots
        .filter(robot => robot.projects.length > 1)
        .map(robot => robot.name)
      console.log('robotsWithSeveralProjects', robotsWithSeveralProjects)
      expect(robotsWithSeveralProjects).to.have.lengthOf.above(0)
    })

    it('creates at least one project that has several robots', () => {
      // console.log(projects.map(project => ({
      //   title: project.title,
      //   robots: project.robots.map(robot => robot.name),
      // })))
      const projectsWithSeveralProjects = projects
        .filter(project => project.robots.length > 1)
        .map(project => project.title)
      console.log('projectsWithSeveralProjects', projectsWithSeveralProjects)
      expect(projectsWithSeveralProjects).to.have.lengthOf.above(0)
    })

  })
})
