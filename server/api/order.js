const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../db/models')

// router.get ('/singleOrderWithDetails/:userId/:productId', async (req, res, next) => {
//   try {

//     const singleOrder = await Product.findAll({
//       // where: {
//       //   userId: req.params.userId,
//       //   isCheckedOut:false,
//       // //  productId: req.params.productId
//       // },

//     include: [ {model: OrderProduct}]
//     });
//     res.json(singleOrder);
//   } catch (error){
//       console.log (error)
//   }
// })

router.post('/', async (req, res, next) => {
  try {
    const order = await Order.findOrCreate({
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
