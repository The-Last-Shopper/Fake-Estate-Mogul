import axios from 'axios'

const initialState = []

const ADD_NEW_ORDER = 'ADD_NEW_ORDER'

const addNewOrder = order => ({
  type: ADD_NEW_ORDER,
  order
})
// GetOrdersThunk - Fetch existing cart from user session store
// takes in a userId, uses its cookie to grab cart

export const thunkAddNewOrder = user => {
  return async dispatch => {
    try {
      let userId = user.id
      if (!user.id) {
        userId = null
      }
      const newOrder = await axios.post('/api/order', {userId: userId})
      dispatch(addNewOrder(newOrder.data))
    } catch (error) {
      console.error('unable to post new Order')
    }
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_ORDER:
      return action.order
    default:
      return state
  }
}
