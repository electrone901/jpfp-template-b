const { green, red } = require('chalk')
const { db, Robot } = require('./server/db')

const seedRobots = [
  {
    name: 'R2-D2',
    imageUrl: 'https://robohash.org/r2d2.png?size=100x100',
    fuelType: 'electric',
    fuelLevel: 88.34,
  },
  // {
  //   name: 'C-3PO',
  //   imageUrl: 'https://robohash.org/c3po.png?size=100x100',
  //   fuelLevel: 13.7,
  // },
  {
    name: 'WALL-E',
    imageUrl: 'https://robohash.org/walle.png?size=100x100',
    fuelType: 'gas',
  },
  {
    name: 'HAL-9000',
    imageUrl: 'https://robohash.org/hal-9000.png?size=100x100',
    fuelLevel: 0,
  },
]

const seed = async () => {
  try {
    await db.sync({ force: true })

    // seed your database here!
    await Promise.all(seedRobots.map(robot => Robot.create(robot)))

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
