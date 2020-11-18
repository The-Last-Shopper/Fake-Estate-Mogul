import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'
const DELETE_USER = 'DELETE_USER'
const EDIT_USER = 'EDIT_USER'

const getAllUsers = users => ({
  type: GET_ALL_USERS,
  users
})

const deleteUser = userId => ({
  type: DELETE_USER,
  userId
})

const editUser = editedUser => ({
  type: EDIT_USER,
  editedUser
})

export const thunkFetchAllUsers = () => async dispatch => {
  try {
    const {data: users} = await axios.get('/api/users')
    dispatch(getAllUsers(users))
  } catch (error) {
    console.error(error)
  }
}

export const thunkDeleteUser = userId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/users/${userId}`)
      dispatch(deleteUser(userId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const thunkEditUser = (userId, changedState) => {
  return async dispatch => {
    try {
      console.log(changedState)
      const updatedUser = await axios.put(`/api/users/${userId}`, changedState)
      console.log(updatedUser)
      dispatch(editUser(updatedUser.data))
    } catch (err) {
      console.error('Something went wrong with updating user info', err)
    }
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    case DELETE_USER:
      return state.filter(user => user.id !== action.userId)
    default:
      return state
  }
}
