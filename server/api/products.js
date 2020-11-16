const router = require('express').Router()
const {isAdmin} = require('../auth-middleware')
const {Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
    res.json(allProducts)
  } catch (error) {
    console.error(error)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.productId)
    res.json(singleProduct)
  } catch (error) {
    console.error(error)
  }
})

// PUT request //
router.put('/:productId', isAdmin, async (req, res, next) => {
  try {
    const updateProduct = await Product.findByPk(req.params.productId)
    updateProduct.update(req.body)
    res.json(updateProduct)
  } catch (error) {
    console.error(error)
  }
})

// POST request //
router.post('/', isAdmin, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    console.error(error)
  }
})

// DELETE Request //
router.delete('/:productId', isAdmin, async (req, res, next) => {
  try {
    await Product.destroy({where: {id: req.params.productId}})
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
