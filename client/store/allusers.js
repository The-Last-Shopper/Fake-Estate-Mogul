import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'

const getAllUsers = users => ({
  type: GET_ALL_USERS,
  users
})

export const thunkFetchAllUsers = () => async dispatch => {
  try {
    const {data: users} = await axios.get('/api/users')
    dispatch(getAllUsers(users))
  } catch (error) {
    console.error(error)
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    default:
      return state
  }
}
