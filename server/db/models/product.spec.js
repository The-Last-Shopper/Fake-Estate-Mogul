const {expect} = require('chai')
const db = require('../index')
const Product = require('./product')
// const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctProductFormat', () => {
      let product

      beforeEach(async () => {
        product = await Product.create({
          name: 'Bungalow',
          description: 'This is a Bungalow',
          price: 100000
        })
      })

      it('returns name of the house if the name is not empty', () => {
        expect(product.name).to.be.equal('Bungalow')
      })

      it('returns true if the price is not empty', () => {
        expect(product.price).to.be.equal(100000)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
