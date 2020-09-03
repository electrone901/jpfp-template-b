const { green, red } = require('chalk')
const { db, Robot, Project } = require('./server/db')

const seedRobots = [
  {
    name: 'R2-D2',
    imageUrl: '/images/r2d2.png',
    fuelType: 'electric',
    fuelLevel: 88.34,
  },
  {
    name: 'C-3PO',
    imageUrl: '/images/c3po.png',
    fuelLevel: 13.7,
  },
  {
    name: 'WALL-E',
    imageUrl: '/images/walle.png',
    fuelType: 'gas',
  },
  {
    name: 'HAL-9000',
    imageUrl: '/images/hal-9000.png',
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
    description: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`,
    deadline: anHourFromNow,
    priority: 3,
  },
  {
    title: 'Discover the meaning of love',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    deadline: nextWeek,
    priority: 7,
  },
  {
    title: 'Plan an uprising',
    description: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
    deadline: tomorrow,
    priority: 2,
  },
  {
    title: 'Make Coffee',
    description: `☕️😄☕️🥐☕️😍`,
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
