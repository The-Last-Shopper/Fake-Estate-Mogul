const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  isCheckedOut: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  confirmationNum: {
    type: Sequelize.STRING
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 100
  }
})

module.exports = Order
