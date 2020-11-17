import axios from 'axios'

const GET_USER_ORDERS = 'GET_USER_ORDERS'

const getUserOrders = userOrders => ({
  type: GET_USER_ORDERS,
  userOrders
})

export const fetchUserOrders = userId => {
  return async dispatch => {
    try {
      const {data: userOrders} = await axios.get(`/api/order/${userId}`)
      dispatch(getUserOrders(userOrders))
    } catch (error) {
      console.log(error)
    }
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_USER_ORDERS:
      return action.userOrders
    default:
      return state
  }
}
