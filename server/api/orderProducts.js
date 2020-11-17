const router = require('express').Router()
const {OrderProduct, Order} = require('../db/models')
const {isAuthorized} = require('../auth-middleware')

router.get('/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    let cart = await OrderProduct.findAll({
      where: {
        orderId: orderId
      }
    })
    res.json(cart)
  } catch (error) {
    console.log(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const orderProduct = await OrderProduct.create(req.body)
    res.json(orderProduct)
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:orderId/:productId', async (req, res, next) => {
  try {
    await OrderProduct.destroy({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
  }
})

router.put('/:orderId/:productId', async (req, res, next) => {
  try {
    const updateOrder = await OrderProduct.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      }
    })
    await updateOrder.update(req.body)
    res.json(updateOrder)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
