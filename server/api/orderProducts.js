const router = require('express').Router()
const {OrderProduct, Order} = require('../db/models')

router.get('/:userId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId
      }
    })
    console.log(order)
    const cart = await OrderProduct.findAll({
      where: {
        orderId: order.id
      }
    })
    console.log(cart)
    res.json(cart)
  } catch (error) {
    console.error(error)
  }
})

router.post('/addingProduct', async (req, res, next) => {
  try {
    const orderProduct = await OrderProduct.create(req.body)
    res.json(orderProduct)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
