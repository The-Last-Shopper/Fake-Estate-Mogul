const router = require('express').Router()
const {OrderProduct} = require('../db/models')

router.post('/addingProduct', async (req, res, next) => {
  try {
    const orderProduct = await OrderProduct.create(req.body)
    res.json(orderProduct)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
