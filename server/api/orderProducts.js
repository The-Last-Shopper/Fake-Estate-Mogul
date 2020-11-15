const router = require('express').Router()
const {OrderProduct, Order} = require('../db/models')

router.get('/:orderId', async (req, res, next) => {
  try {
    const cart = await OrderProduct.findAll({
      where: {
        orderId: req.params.orderId
      }
      // include: [
      //   {
      //     model: OrderProduct,
      //   },
      // ],
    })
    // const cart = await OrderProduct.findAll({
    //   where: {
    //     orderId: order.id
    //   }
    // })
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
