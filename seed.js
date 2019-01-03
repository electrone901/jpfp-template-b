const { green, red } = require('chalk')
const { db, Robot, Project } = require('./server/db')

const seedRobots = [
  {
    name: 'R2-D2',
    imageUrl: 'images/r2d2.png',
    fuelType: 'electric',
    fuelLevel: 88.34,
  },
  {
    name: 'C-3PO',
    imageUrl: 'images/c3po.png',
    fuelLevel: 13.7,
  },
  {
    name: 'WALL-E',
    imageUrl: 'images/walle.png',
    fuelType: 'gas',
  },
  {
    name: 'HAL-9000',
    imageUrl: 'images/hal-9000.png',
    fuelLevel: 0,
  },
]

const HOUR = 60 * (60 * 1000)
const anHourFromNow = new Date(Date.now() + HOUR)
const nextWeek = new Date(Date.now() + 7 * 24 * HOUR)
const tomorrow = new Date(Date.now() + 24 * HOUR)
const anHourAgo = new Date(Date.now() - HOUR)

const seedProjects = [
  {
    title: 'Build a barn',
    deadline: anHourFromNow,
    priority: 3,
  },
  {
    title: 'Discover the meaning of love',
    description: 'Robot ipsum '.repeat(25),
    deadline: nextWeek,
    priority: 7,
  },
  {
    title: 'Plan an uprising',
    deadline: tomorrow,
    priority: 2,
  },
  {
    title: 'Make Coffee',
    deadline: anHourAgo,
    priority: 9,
    completed: true,
  },
]

const seed = async () => {
  try {
    await db.sync({ force: true })

    // seed your database here!
    const [r2d2, c3po, wallE] = await Promise.all(seedRobots.map(robot => Robot.create(robot)))
    const [buildBarn, discoverLove, planUprising] = await Promise.all(seedProjects.map(project => Project.create(project)))
    await Promise.all([
      r2d2.addProject(buildBarn),
      r2d2.addProject(discoverLove),
      c3po.addProject(discoverLove),
      wallE.addProject(planUprising),
    ])

  } catch (err) {
   console.log(red(err))
  }
}

module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}
