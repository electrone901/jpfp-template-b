const { green, red } = require('chalk')
const { db, Project } = require('./server/db')

export const anHourFromNow = new Date(Date.now() + 60 * (60 * 1000)).toString()
const seedProjects = [
  { id: 1, title: 'Build barn - seed file', description: 'Lorem Ipsum' },
  { id: 2, title: 'Discover love - seed file', completed: true, deadline: anHourFromNow },
  { id: 3, title: 'Open the pod bay doors - seed file', priority: 10 }
]

const seed = async () => {
  try {
    await db.sync({ force: true })

    // seed your database here!
      await Promise.all(seedProjects.map(project => Project.create(project)))

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
