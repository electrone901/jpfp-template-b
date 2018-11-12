const { expect } = require('chai');
const { db } = require('../../server/db')
const { Robot, Project } = require('../../server/db')

describe('Tier One: Project > Robot Association', () => {
  before(() => db.sync({ force: true }))
  afterEach(() => db.sync({ force: true }))

  let project1, project2, robot
  beforeEach(async () => {
    robot = await Robot.create({
      name: 'Jupiter Jumpstart',
      address: '5.2 AU',
    })
    project1 = await Project.create({
      firstName: 'Sally',
      lastName: 'Ride',
      email: 'sallyride@nasa.gov',
      robotId: robot.id,
    })
    project2 = await Project.create({
      firstName: 'Mae',
      lastName: 'Jemison',
      email: 'maejemison@nasa.gov',
      robotId: robot.id,
    })
  })
  afterEach(() => db.sync({ force: true }))

  xit('a project may be assigned to at most one robot', async () => {
    const sallysRobot = await project1.getRobot()
    expect(sallysRobot.name).to.equal(robot.name)
  })

  xit('a robot may have many enrolled projects', async () => {
    const result = await robot.hasProjects([project1, project2])
    expect(result).to.be.equal(true)
  })
})
