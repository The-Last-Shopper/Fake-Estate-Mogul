const router = require('express').Router()
const {OrderProduct, Order} = require('../db/models')
const {isAuthorized} = require('../auth-middleware')

//Not secure: We should use USerId to look for order and eager load. No way to access UserId with current set up.
router.get('/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    let cart = await OrderProduct.findAll({
      //DatabaseError [SequelizeDatabaseError]: invalid input syntax for type integer: "undefined" | after GET /auth/me 304 9.400 ms - -
      where: {
        orderId: orderId
      }
    })
    res.json(cart)
  } catch (error) {
    console.log('error getting cart: ', error)
  }
})

router.post('/', isAuthorized, async (req, res, next) => {
  try {
    const body = req.body
    const orderProduct = await OrderProduct.create({
      name: body.name,
      price: body.price,
      quantity: body.quantity,
      orderId: body.orderId,
      productId: body.productId,
      imageUrl: body.imageUrl,
      description: body.description
    })
    res.json(orderProduct)
  } catch (error) {
    console.log(error)
  }
})

//Not secure: We should use USerId to look for order and eager load. No way to access UserId with current set up.
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

router.put('/:orderId/:productId', isAuthorized, async (req, res, next) => {
  try {
    const updateOrder = await OrderProduct.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      }
    })
    await updateOrder.update({quantity: req.body.quantity})
    res.json(updateOrder)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
