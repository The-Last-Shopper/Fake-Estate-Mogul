const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('OrderProduct', {
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  imageUrl: {
    type: Sequelize.TEXT
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = OrderProduct
