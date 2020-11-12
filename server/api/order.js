const router = require('express').Router();
const Order = require('../db/models');

// router.get('/')
// this route will be for signed in users who already have a cart
// in session store

router.post('/order', async (req, res, next) => {
  try {
    const order = await Order.create({
      userId: req.body.userId
    })
    res.json(order)
  } catch (error) {
    console.log('error', error)
  }
})

module.exports = router
