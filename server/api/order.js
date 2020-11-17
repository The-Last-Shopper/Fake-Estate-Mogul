const router = require('express').Router()
const {isAuthorized} = require('../auth-middleware')
const {Order, OrderProduct, Product} = require('../db/models')

router.post('/', isAuthorized, async (req, res, next) => {
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
  //might have to send userId through body or find order by UserId association
  try {
    const updateCheckOut = await Order.findByPk(req.params.orderId)
    await updateCheckOut.update({isCheckedOut: true})
    res.json(updateCheckOut)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
