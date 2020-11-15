const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const [order, isCreated] = await Order.findOrCreate({
      where: {
        userId: req.body.userId,
        isCheckedOut: false
      }
    })
    res.json(order)
  } catch (error) {
    console.log('error', error)
  }
})

module.exports = router
