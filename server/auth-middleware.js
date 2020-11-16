function isAdmin(req, res, next) {
  console.log('req.user: ', req.user)
  if (req.user.isAdmin === false) {
    const err = new Error('Non-Admin attempting to access Admin route')
    err.status = '401'
    next(err)
  } else {
    console.log('admin check OK')
  }
}

//checks both URI for UserId
function isAuthorized(req, res, next) {
  if (req.params.userId !== req.user.id) {
    const err = new Error('User does not have privilege to this route')
    err.status = '401'
    next(err)
  } else {
    console.log('auth check OK')
  }
}

module.exports = {
  isAdmin,
  isAuthorized
}
