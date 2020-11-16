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

router.put('/:orderId', async (req, res, next) => {
  try {
    const updateCheckOut = await Order.findByPk(req.params.orderId)
    await updateCheckOut.update({isCheckedOut: true})
    res.json(updateCheckOut)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
