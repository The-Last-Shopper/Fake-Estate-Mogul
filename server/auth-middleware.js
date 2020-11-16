function isAdmin(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    const err = new Error('Non-Admin attempting to access Admin route')
    err.status = '401'
    next(err)
  } else {
    console.log('admin check OK')
    next()
  }
}

//checks both URI and request body for UserId
function isAuthorized(req, res, next) {
  if (req.params.userId !== req.user.id || req.body.userId !== req.user.id) {
    const err = new Error('User does not have privilege to this route')
    err.status = '401'
    next(err)
  } else {
    next()
    console.log('auth check OK')
  }
}

module.exports = {
  isAdmin,
  isAuthorized
}
