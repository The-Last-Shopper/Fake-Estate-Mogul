const faker = require('faker')
const db = require('../server/db')
const {User, Product, Order, OrderProduct} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced')

  const usersToCreate = [
    User.create({
      name: 'Cody',
      email: 'cody@email.com',
      password: '123',
      billingInfo: '4916657956659033',
      address: '123 Lexington Avenue',
      imageUrl: faker.internet.avatar()
    }),
    User.create({
      name: 'Murphy',
      email: 'murphy@email.com',
      password: '123',
      billingInfo: '4194083706017690',
      address: '321 Woodhaven Boulevard',
      imageUrl: faker.internet.avatar()
    }),
    User.create({
      name: 'Ricky',
      email: 'ricky@email.com',
      password: '123',
      billingInfo: '5128081712801139',
      address: '321 Flushing Ave',
      imageUrl: faker.internet.avatar()
    }),
    User.create({
      name: 'Danny',
      email: 'Danny@email.com',
      password: '123',
      billingInfo: '5488857697066408',
      address: '321 Grand Street',
      imageUrl: faker.internet.avatar()
    }),
    User.create({
      name: 'James',
      email: 'james@email.com',
      password: '123',
      billingInfo: '5114348265658398',
      address: '321 Marcy Street',
      imageUrl: faker.internet.avatar()
    }),
    User.create({
      name: 'Admin',
      email: 'admin@email.com',
      password: 'admin',
      billingInfo: '5114348265658398',
      address: '543 Chinatown Street',
      isAdmin: true,
      imageUrl: faker.internet.avatar()
    })
  ]

  let usersWithExistingCarts = []
  const productsToCreate = [
    Product.create({
      name: 'Bungalow',
      description:
        'Have you ever been to a tropical beach and seen a rustic, beautiful cabin and thought to you yourself, I WANT TO LIVE THERE? Now you can by purchasing a homey and comfortable bungalow! Beach not included.',
      price: 200000,
      type: 'Bungalow',
      quantity: 5,
      imageUrl:
        'https://www.houseplans.net/uploads/plans/2824/elevations/40597-1200.jpg?v=0'
    }),
    Product.create({
      name: 'Apartment',
      description:
        'For the well-to-do city dweller, this apartment contains all you need to make it in the big city with minimal living space! Get it fast now, while prices are cheap!',
      price: 400000,
      type: 'Apartment',
      quantity: 6,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhT2U27qTQOIgLE9p8iiKKDHev2RL1OL0vjw&usqp=CAU'
    }),
    Product.create({
      name: 'Condo',
      description:
        'For those wanting a step up from an apartment, a condominium unit has all the space of an apartment, with every extra amenity you could ask for! *Amenities not included in condo purchase price.',
      price: 800000,
      type: 'Condo',
      quantity: 7,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSooE3S9WPfAjquh1_pZpazzxf4wUT9-Jl0Sg&usqp=CAU'
    }),
    Product.create({
      name: 'Penthouse',
      description:
        'For those who want the best of both worlds, modern city living with all the luxuries of high end living, a penthouse is exactly what you need. Gaze down upon the city from your lofty perch in the sky!',
      price: 1000000,
      type: 'Penthouse',
      quantity: 3,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSZX_9AtMR8M1z91bl-4OZBC9D2q1LM7NmyGQ&usqp=CAU'
    }),
    Product.create({
      name: 'Mansion',
      description:
        "You've made it to the top, nothing else will satisfy you but a MASSIVE mansion to call your own. These mansions vary in difference, but rest assured you will have your very own chateau, palace, villa, whatever you want to call it. *Servants and staff not included, please provide your own!",
      price: 3000000,
      type: 'Mansion',
      quantity: 2,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS_BXA02XUyNPDLhQFF5O36FySUHjkg32lsBw&usqp=CAU'
    })
  ]

  const productTypes = [
    'Bungalow',
    'Apartment',
    'Condo',
    'Penthouse',
    'Mansion'
  ]
  const emailExtention = ['@hotmail.com', '@yahoo.com', '@gmail.com']
  const ordersToCreate = []
  let ordersWithProducts = []

  for (let i = 0; i < 35; i++) {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()

    usersToCreate.push(
      User.create({
        name: `${firstName} ${lastName}`,
        email: `${firstName}_${lastName}${
          emailExtention[Math.floor(Math.random() * 3)]
        }`,
        billingInfo: faker.finance.creditCardNumber(),
        password: faker.internet.password(),
        address: `${faker.address.streetAddress()}, ${faker.address.secondaryAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.zipCode()}`,
        imageUrl: faker.internet.avatar(),
        isAdmin: i % 5 === 0
      })
    )
  }
  for (let i = 0; i < 250; i++) {
    const productType = productTypes[Math.floor(Math.random() * 5)]
    const yearBuild = Math.floor(Math.random() * 121) + 1900
    const productDescription = `This ${productType} was built in ${yearBuild}. It is located at ${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.zipCode()}.`

    productsToCreate.push(
      Product.create({
        name: `${productType} built in ${yearBuild}`,
        description: productDescription,
        price: (Math.floor(Math.random() * 101) + 1) * 100000,
        imageUrl:
          'https://www.metrorollerdoors.com.au/wp-content/uploads/2018/02/unavailable-image.jpg',
        quantity: Math.floor(Math.random() * 11) + 1,
        type: productType
      })
    )
    productsToCreate.sort()
  }

  await Promise.all(usersToCreate)
  await Promise.all(productsToCreate)

  for (let i = 0; i < 100; i++) {
    let randomUserID = Math.floor(Math.random() * 35) + 1
    ordersToCreate.push(
      Order.create({
        userId: i % 10 === 0 ? null : randomUserID,
        isCheckedOut: usersWithExistingCarts.includes(randomUserID),
        confirmationNum: `${Math.floor(Math.random() * 10000)}-${Math.floor(
          Math.random() * 100000
        )}`,
        totalPrice: 0
      })
    )
    usersWithExistingCarts.push(randomUserID)
  }

  await Promise.all(ordersToCreate)

  for (let i = 1; i <= 100; i++) {
    let productsInOrder = []
    let totalPriceOfOrder = 0
    let numberOfProductsInOrder = Math.floor(Math.random() * 10) + 1
    let order = await Order.findOne({where: {id: i}})
    while (numberOfProductsInOrder !== 0) {
      const productId = Math.floor(Math.random() * 255) + 1
      const product = await Product.findOne({where: {id: productId}})
      numberOfProductsInOrder--
      if (!productsInOrder.includes(productId)) {
        totalPriceOfOrder = totalPriceOfOrder + product.price
        ordersWithProducts.push(
          OrderProduct.create({
            price: product.price,
            quantity: Math.floor(Math.random() * 5) + 1,
            orderId: i,
            productId: productId,
            name: product.name,
            imageUrl: product.imageUrl,
            description: product.description
          })
        )
        productsInOrder.push(productId)
      }
    }
    if (order.isCheckedOut) {
      await Order.update({totalPrice: totalPriceOfOrder}, {where: {id: i}})
    }
  }

  await Promise.all(ordersWithProducts)
  console.log('seeded successfully')
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (error) {
    console.error(error)
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
