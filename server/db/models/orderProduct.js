const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('OrderProduct', {
  price: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderProduct
