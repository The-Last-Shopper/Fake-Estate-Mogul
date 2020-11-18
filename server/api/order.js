const router = require('express').Router()
const {isAuthorized} = require('../auth-middleware')
const {Order, OrderProduct, Product} = require('../db/models')

// Find All of a user's orders
router.get('/:userId', async (req, res, next) => {
  try {
    let userOrders = await Order.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(userOrders)
  } catch (error) {
    console.log(error)
  }
})

// Find existing or Create new Order
router.post('/', isAuthorized, async (req, res, next) => {
  try {
    const [order, isCreated] = await Order.findOrCreate({
      where: {
        userId: req.body.userId,
        isCheckedOut: false
      },
      defaults: {confirmationNum: req.body.confirmationNum}
    })
    res.json(order)
  } catch (error) {
    console.log('error', error)
  }
})

// Checkout Cart
router.put('/:orderId', isAuthorized, async (req, res, next) => {
  try {
    const updateCheckOut = await Order.findByPk(req.params.orderId)
    await updateCheckOut.update({
      isCheckedOut: true,
      totalPrice: req.body.totalPrice
    })
    res.json(updateCheckOut)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
