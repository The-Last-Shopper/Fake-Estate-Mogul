const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('products', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
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
  },
  type: {
    type: Sequelize.ENUM(
      'Bungalow',
      'Apartment',
      'Condo',
      'Penthouse',
      'Mansion'
    )
  }
})

module.exports = Product
