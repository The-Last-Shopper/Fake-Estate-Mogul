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
  //normalizing undefined/null references to NULL as passed in are not always garenteed NULL or undefined
  const loggedInId = !req.user ? null : req.user.id
  const paramsId = !req.params.userId ? null : req.params.userId
  const passedInId = !req.body.userId ? null : req.body.userId
  console.log('params: ', paramsId)
  console.log('passed in: ', passedInId)
  console.log('userId: ', loggedInId)
  if (paramsId !== loggedInId && passedInId !== loggedInId) {
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
