const router = require('express').Router()
const {User} = require('../db/models')
const {isAdmin, isAuthorized} = require('../auth-middleware')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'name', 'address', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', isAuthorized, async (req, res, next) => {
  try {
    const updateUser = await User.findByPk(req.params.userId)
    updateUser.update(req.body)
    res.json(updateUser)
  } catch (error) {
    console.error(error)
  }
})

router.delete('/:userId', isAdmin, async (req, res, next) => {
  try {
    await User.destroy({where: {id: req.params.userId}})
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
  }
})
