'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      name: 'Cody',
      email: 'cody@email.com',
      password: '123',
      billingInfo: '4916657956659033',
      address: '123 Lexington Avenue'
    }),
    User.create({
      name: 'Murphy',
      email: 'murphy@email.com',
      password: '123',
      billingInfo: '4194083706017690',
      address: '321 Woodhaven Boulevard'
    }),
    User.create({
      name: 'Ricky',
      email: 'ricky@email.com',
      password: '123',
      billingInfo: '5128081712801139',
      address: '321 Flushing Ave'
    }),
    User.create({
      name: 'Danny',
      email: 'Danny@email.com',
      password: '123',
      billingInfo: '5488857697066408',
      address: '321 Grand Street'
    }),
    User.create({
      name: 'James',
      email: 'james@email.com',
      password: '123',
      billingInfo: '5114348265658398',
      address: '321 Marcy Street'
    }),
    User.create({
      name: 'Admin',
      email: 'admin@email.com',
      password: 'admin',
      billingInfo: '5114348265658398',
      address: '543 Chinatown Street',
      isAdmin: true
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Bungalow',
      description:
        'Have you ever been to a tropical beach and seen a rustic, beautiful cabin and thought to you yourself, I WANT TO LIVE THERE? Now you can by purchasing a homey and comfortable bungalow! Beach not included',
      price: 200000,
      imageUrl:
        'https://www.houseplans.net/uploads/plans/2824/elevations/40597-1200.jpg?v=0'
    }),
    Product.create({
      name: 'Apartment',
      description:
        'For the well-to-do city dweller, this apartment contains all you need to make it in the big city with minimal living space! Get it fast now, while prices are cheap!',
      price: 400000,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhT2U27qTQOIgLE9p8iiKKDHev2RL1OL0vjw&usqp=CAU'
    }),
    Product.create({
      name: 'Condo',
      description:
        'For those wanting a step up from an apartment, a condominium unit has all the space of an apartment, with every extra amenity you could ask for! *Amenities not included in condo purchase price.',
      price: 800000,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSooE3S9WPfAjquh1_pZpazzxf4wUT9-Jl0Sg&usqp=CAU'
    }),
    Product.create({
      name: 'Penthouse',
      description:
        'For those who want the best of both worlds, modern city living with all the luxuries of high end living, a penthouse is exactly what you need. Gaze down upon the city from your lofty perch in the sky!',
      price: 1000000,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSZX_9AtMR8M1z91bl-4OZBC9D2q1LM7NmyGQ&usqp=CAU'
    }),
    Product.create({
      name: 'Mansion',
      description:
        "You've made it to the top, nothing else will satisfy you but a MASSIVE mansion to call your own. These mansions vary in difference, but rest assured you will have your very own chateau, palace, villa, whatever you want to call it. *Servants and staff not included, please provide your own!",
      price: 3000000,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS_BXA02XUyNPDLhQFF5O36FySUHjkg32lsBw&usqp=CAU'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
