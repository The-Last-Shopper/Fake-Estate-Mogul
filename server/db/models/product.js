const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('products', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    validate: {
      isEmpty: false,
      isNumeric: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Product
